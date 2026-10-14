const BLOGS_MISSING_PUBLISHER = new Set([
  "recurrent-headaches-common-pain-or-serious-neurological-conditions",
  "silent-warning-signs-your-body-should-never-ignore",
  "breathlessness-during-daily-activities",
  "high-blood-pressure-despite-medication",
  "early-signs-of-kidney-disease-you-should-never-ignore",
  "frequent-stomach-bloating-when-is-it-more-than-just-indigestion",
  "dengue-fever-symptoms-causes-cure-and-prevention",
  "world-senior-citizen-day",
  "world-breastfeeding-week",
  "world-mosquito-day",
  "viral-fever-signs-symptoms-and-prevention-tips",
  "understanding-cataracts-symptoms-treatment-and-prevention",
]);

export default async function handler(req, res) {
  try {
    const slug = req.query.slug;

    if (!slug) {
      return sendReact404(req, res);
    }

    // =====================================
    // FETCH THE FULL SEO RECORD FOR ONE BLOG
    // =====================================

    const apiResponse = await fetch(
      `https://api.neohospital.com/api/blogs/view-blog/${encodeURIComponent(
        slug
      )}`,
      {
        headers: { Accept: "application/json" },
      }
    );

    if (!apiResponse.ok) {
      return sendReact404(req, res);
    }

    const data = await apiResponse.json();
    const blog = data?.Blog;

    if (
      !blog ||
      blog.blog_status !== true ||
      blog.blog_slug !== slug
    ) {
      return sendReact404(req, res);
    }

    // =====================================
    // SEO DATA
    // =====================================

    const blogSeo = String(blog.blog_seo || "");
    const pageTitle =
      getSeoTitle(blogSeo) ||
      blog.blog_metaTitle ||
      `${blog.blog_title || "NEO Hospital"} | NEO Hospital`;

    const metaDescription =
      getSeoMetaContent(blogSeo, "description") ||
      blog.blog_metaDescription ||
      `Read about ${
        blog.blog_title || "health"
      } at NEO Hospital.`;

    const metaKeywords =
      getSeoMetaContent(blogSeo, "keywords") ||
      blog.blog_metaKeyword;
    const publisher =
      getSeoMetaContent(blogSeo, "publisher") ||
      (BLOGS_MISSING_PUBLISHER.has(blog.blog_slug)
        ? "NEO Hospital"
        : "");

    const canonicalUrl = `https://www.neohospital.com/blog/${encodeURIComponent(
      blog.blog_slug
    )}`;

    // =====================================
    // BLOG IMAGE
    // =====================================

    let blogImage = "";

    if (blog.blog_image) {
      const imageValue =
        String(blog.blog_image);

      if (
        /^https?:\/\//i.test(
          imageValue
        )
      ) {
        blogImage =
          imageValue.replace(
            /^http:\/\//i,
            "https://"
          );
      } else {
        blogImage =
          `https://api.neohospital.com/uploads/blogs/${imageValue.replace(
            /^\/+/,
            ""
          )}`;
      }
    }

    const author =
      blog.blog_auther ||
      blog.blog_author ||
      "NEO Hospital";

    const publishedDate = new Date(blog.blog_date);
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.blog_title || pageTitle,
      description: metaDescription,
      mainEntityOfPage: canonicalUrl,
      ...(Number.isNaN(publishedDate.getTime())
        ? {}
        : { datePublished: publishedDate.toISOString() }),
      author: {
        "@type": "Organization",
        name: author,
      },
      publisher: {
        "@type": "Hospital",
        name: "NEO Hospital",
        url: "https://www.neohospital.com",
      },
      ...(blogImage ? { image: blogImage } : {}),
    };

    // =====================================
    // LOAD REACT INDEX.HTML
    // =====================================

    const host =
      req.headers.host ||
      process.env.VERCEL_URL;

    const protocol =
      req.headers["x-forwarded-proto"] ||
      "https";

    const pageResponse =
      await fetch(
        `${protocol}://${host}/index.html`
      );

    if (!pageResponse.ok) {
      return res
        .status(500)
        .send(
          "Failed to load application"
        );
    }

    let html =
      await pageResponse.text();

    // =====================================
    // REMOVE OLD SEO TAGS
    // =====================================

    html =
      removeExistingSeo(html);

    // =====================================
    // SERVER SIDE SEO TAGS
    // =====================================

    const seoTags = `
<title>${escapeHtml(
      pageTitle
    )}</title>

<meta
  name="title"
  content="${escapeAttr(
    pageTitle
  )}"
>

<meta
  name="description"
  content="${escapeAttr(
    metaDescription
  )}"
>

${metaKeywords ? `<meta name="keywords" content="${escapeAttr(metaKeywords)}">` : ""}

<meta
  name="robots"
  content="index, follow"
>

<meta
  name="author"
  content="${escapeAttr(
    author
  )}"
>

${publisher ? `<meta name="publisher" content="${escapeAttr(publisher)}">` : ""}

<link
  rel="canonical"
  href="${escapeAttr(
    canonicalUrl
  )}"
>

<!-- ========================= -->
<!-- OPEN GRAPH -->
<!-- ========================= -->

<meta
  property="og:type"
  content="article"
>

<meta
  property="og:title"
  content="${escapeAttr(
    pageTitle
  )}"
>

<meta
  property="og:description"
  content="${escapeAttr(
    metaDescription
  )}"
>

<meta
  property="og:url"
  content="${escapeAttr(
    canonicalUrl
  )}"
>

<meta
  property="og:site_name"
  content="NEO Hospital"
>

${
  blogImage
    ? `
<meta
  property="og:image"
  content="${escapeAttr(
    blogImage
  )}"
>

<meta
  property="og:image:secure_url"
  content="${escapeAttr(
    blogImage
  )}"
>

<meta
  property="og:image:type"
  content="image/jpeg"
>

<meta
  property="og:image:alt"
  content="${escapeAttr(
    blog.blog_title ||
      "NEO Hospital"
  )}"
>
`
    : ""
}

<!-- ========================= -->
<!-- TWITTER / X -->
<!-- ========================= -->

<meta
  name="twitter:card"
  content="summary_large_image"
>

<meta
  name="twitter:title"
  content="${escapeAttr(
    pageTitle
  )}"
>

<meta
  name="twitter:description"
  content="${escapeAttr(
    metaDescription
  )}"
>

${
  blogImage
    ? `
<meta
  name="twitter:image"
  content="${escapeAttr(
    blogImage
  )}"
>

<meta
  name="twitter:image:alt"
  content="${escapeAttr(
    blog.blog_title ||
      "NEO Hospital"
  )}"
>
`
    : ""
}

<!-- ========================= -->
<!-- ARTICLE -->
<!-- ========================= -->

<meta
  property="article:section"
  content="Health & Wellness"
>

<script type="application/ld+json">${JSON.stringify(structuredData).replace(
      /</g,
      "\\u003c"
    )}</script>

${
  blog.blog_date
    ? `
<meta
  property="article:published_time"
  content="${escapeAttr(
    blog.blog_date
  )}"
>
`
    : ""
}
`;

    // Mark server-rendered tags so React Helmet can reconcile them after hydration.
    const managedSeoTags = seoTags.replace(
      /<(title|meta|link|script)(\s[^>]*)?>/gi,
      (match, tagName, attributes = "") =>
        /data-react-helmet\s*=/i.test(attributes)
          ? match
          : `<${tagName}${attributes} data-react-helmet="true">`
    );

    // =====================================
    // INSERT SEO INTO HEAD
    // =====================================

    if (
      /<\/head>/i.test(html)
    ) {
      html =
        html.replace(
          /<\/head>/i,
          `${managedSeoTags}\n</head>`
        );
    } else {
      html =
        `${managedSeoTags}\n${html}`;
    }

    // =====================================
    // RESPONSE
    // =====================================

    res.status(200);

    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return res.send(html);

  } catch (error) {

    console.error(
      "Blog SSR / OG Error:",
      error
    );

    return sendReact404(
      req,
      res
    );
  }
}


// =====================================
// REMOVE EXISTING SEO
// =====================================

function removeExistingSeo(html) {

  html =
    html.replace(
      /<title\b[^>]*>[\s\S]*?<\/title>/gi,
      ""
    );

  const patterns = [

    /<meta\b[^>]*\bname=["']title["'][^>]*>/gi,

    /<meta\b[^>]*\bname=["']description["'][^>]*>/gi,

    /<meta\b[^>]*\bname=["']keywords["'][^>]*>/gi,

    /<meta\b[^>]*\bname=["']robots["'][^>]*>/gi,

    /<meta\b[^>]*\bname=["']author["'][^>]*>/gi,

    /<meta\b[^>]*\bname=["']twitter:[^"']+["'][^>]*>/gi,

    /<meta\b[^>]*\bproperty=["']og:[^"']+["'][^>]*>/gi,

    /<meta\b[^>]*\bproperty=["']article:[^"']+["'][^>]*>/gi,

    /<link\b[^>]*\brel=["']canonical["'][^>]*>/gi,
  ];

  patterns.forEach(
    (pattern) => {
      html =
        html.replace(
          pattern,
          ""
        );
    }
  );

  return html;
}


// =====================================
// HTML ESCAPE
// =====================================

function escapeHtml(
  value = ""
) {

  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    );
}


function escapeAttr(
  value = ""
) {

  return escapeHtml(value)
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#39;"
    );
}

function getSeoTitle(seoHead = "") {
  const title = String(seoHead).match(
    /<title\b[^>]*>([\s\S]*?)<\/title>/i
  )?.[1];

  return title
    ? decodeHtmlEntities(title.replace(/<[^>]*>/g, "").trim())
    : "";
}

function getSeoMetaContent(seoHead = "", name) {
  const normalizedName = String(name).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tag = String(seoHead).match(
    new RegExp(
      `<meta\\b(?=[^>]*\\bname\\s*=\\s*(?:[\\"']${normalizedName}[\\"']|${normalizedName}\\b))[^>]*>`,
      "i"
    )
  )?.[0];
  const content = tag?.match(
    /\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i
  );
  const value = content?.[1] ?? content?.[2] ?? content?.[3] ?? "";

  return decodeHtmlEntities(value.trim());
}

function decodeHtmlEntities(value) {
  return String(value)
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}


// =====================================
// REACT 404
// =====================================

async function sendReact404(
  req,
  res
) {

  try {

    const host =
      req.headers.host ||
      process.env.VERCEL_URL;

    const protocol =
      req.headers[
        "x-forwarded-proto"
      ] || "https";

    const pageResponse =
      await fetch(
        `${protocol}://${host}/index.html`
      );

    if (!pageResponse.ok) {

      res.status(404);

      res.setHeader(
        "X-Robots-Tag",
        "noindex, nofollow"
      );

      return res.send(
        "Not Found"
      );
    }

    const html =
      await pageResponse.text();

    res.status(404);

    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8"
    );

    res.setHeader(
      "X-Robots-Tag",
      "noindex, nofollow"
    );

    return res.send(
      html
    );

  } catch (error) {

    console.error(
      "React 404 rendering error:",
      error
    );

    res.status(404);

    res.setHeader(
      "X-Robots-Tag",
      "noindex, nofollow"
    );

    return res.send(
      "Not Found"
    );
  }
}
