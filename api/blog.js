export default async function handler(req, res) {
  try {
    const slug = req.query.slug;

    if (!slug) {
      return sendReact404(req, res);
    }

    // =====================================
    // FETCH BLOGS
    // =====================================

    const apiResponse = await fetch(
      "https://api.neohospital.com/api/blogs/view-blogs",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!apiResponse.ok) {
      return sendReact404(req, res);
    }

    const data = await apiResponse.json();

    let blogs = [];

    if (Array.isArray(data)) {
      blogs = data;
    } else if (Array.isArray(data.Blog)) {
      blogs = data.Blog;
    } else if (Array.isArray(data.blogs)) {
      blogs = data.blogs;
    } else if (Array.isArray(data.data)) {
      blogs = data.data;
    }

    // =====================================
    // FIND CURRENT BLOG
    // =====================================

    const blog = blogs.find(
      (item) => item.blog_slug === slug
    );

    if (!blog || blog.blog_status === false) {
      return sendReact404(req, res);
    }

    // =====================================
    // SEO DATA
    // =====================================

    const pageTitle =
      `${blog.blog_title || "NEO Hospital"} | NEO Hospital`;

    const metaDescription =
      blog.blog_meta_description ||
      `Read about ${
        blog.blog_title || "health"
      } at NEO Hospital.`;

    const canonicalUrl =
      `https://www.neohospital.com/blog/${
        blog.blog_slug
      }`;

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

    // =====================================
    // INSERT SEO INTO HEAD
    // =====================================

    if (
      /<\/head>/i.test(html)
    ) {
      html =
        html.replace(
          /<\/head>/i,
          `${seoTags}\n</head>`
        );
    } else {
      html =
        `${seoTags}\n${html}`;
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
