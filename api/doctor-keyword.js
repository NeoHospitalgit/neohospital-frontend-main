export default async function handler(req, res) {
  try {
    const slug = req.query.slug;

    if (!slug) {
      return sendReact404(req, res);
    }

    // =====================================
    // Fetch keyword page data
    // =====================================
    const apiResponse = await fetch(
      `https://api.neohospital.com/api/keywords/keyword/${encodeURIComponent(
        slug
      )}`
    );

    if (!apiResponse.ok) {
      return sendReact404(req, res);
    }

    const data = await apiResponse.json();

    // =====================================
    // Keyword page validation
    // =====================================
    if (!data?.success || !data?.data) {
      return sendReact404(req, res);
    }

    const keyword = data.data;

    // =====================================
    // Load React application
    // =====================================
    const host =
      req.headers.host || process.env.VERCEL_URL;

    const protocol =
      req.headers["x-forwarded-proto"] || "https";

    const pageResponse = await fetch(
      `${protocol}://${host}/index.html`
    );

    if (!pageResponse.ok) {
      return res
        .status(500)
        .send("Failed to load application");
    }

    let html = await pageResponse.text();

    // =====================================
    // Get Dynamic SEO from CMS
    // =====================================
    const seoTags =
      keyword?.seo_head ||
      keyword?.seo_tag ||
      keyword?.seotags ||
      keyword?.tagdata ||
      "";

    // =====================================
    // Remove existing static SEO
    // =====================================
    if (seoTags) {
      html = html
        // Remove existing title
        .replace(
          /<title\b[^>]*>[\s\S]*?<\/title>/gi,
          ""
        )

        // Remove description
        .replace(
          /<meta\b[^>]*(?:name\s*=\s*["']description["']|name\s*=\s*["']title["'])[^>]*>/gi,
          ""
        )

        // Remove keywords
        .replace(
          /<meta\b[^>]*name\s*=\s*["']keywords["'][^>]*>/gi,
          ""
        )

        // Remove robots
        .replace(
          /<meta\b[^>]*name\s*=\s*["']robots["'][^>]*>/gi,
          ""
        )

        // Remove author
        .replace(
          /<meta\b[^>]*name\s*=\s*["']author["'][^>]*>/gi,
          ""
        )

        // Remove language
        .replace(
          /<meta\b[^>]*name\s*=\s*["']language["'][^>]*>/gi,
          ""
        )

        // Remove Open Graph tags
        .replace(
          /<meta\b[^>]*property\s*=\s*["']og:[^"']+["'][^>]*>/gi,
          ""
        )

        // Remove Twitter tags
        .replace(
          /<meta\b[^>]*name\s*=\s*["']twitter:[^"']+["'][^>]*>/gi,
          ""
        )

        // Remove canonical
        .replace(
          /<link\b[^>]*rel\s*=\s*["']canonical["'][^>]*>/gi,
          ""
        );
    }

    // =====================================
    // Inject Dynamic SEO
    // =====================================
    if (seoTags) {
      let headTags = String(seoTags)
        .replace(/<\/?html[^>]*>/gi, "")
        .replace(/<\/?head[^>]*>/gi, "")
        .trim();

      // =====================================
      // Mark SEO as React Helmet managed
      // =====================================
      headTags = headTags.replace(
        /<(title|meta|link)(\s[^>]*)?>/gi,
        (match, tagName, attributes = "") => {
          if (/data-react-helmet\s*=/i.test(attributes)) {
            return match;
          }

          return `<${tagName}${attributes} data-react-helmet="true">`;
        }
      );

      html = html.replace(
        /<head>/i,
        `<head>\n${headTags}\n`
      );
    }

    // =====================================
    // Response
    // =====================================
    res.status(200);

    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=60, stale-while-revalidate=300"
    );

    return res.send(html);

  } catch (error) {
    console.error(
      "Keyword validation error:",
      error
    );

    return sendReact404(req, res);
  }
}


// =====================================
// React 404 Page
// =====================================

async function sendReact404(req, res) {
  try {
    const host =
      req.headers.host || process.env.VERCEL_URL;

    const protocol =
      req.headers["x-forwarded-proto"] || "https";

    const pageResponse = await fetch(
      `${protocol}://${host}/index.html`
    );

    if (!pageResponse.ok) {
      res.status(404);

      res.setHeader(
        "X-Robots-Tag",
        "noindex, nofollow"
      );

      return res.send("Not Found");
    }

    const html = await pageResponse.text();

    res.status(404);

    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8"
    );

    res.setHeader(
      "X-Robots-Tag",
      "noindex, nofollow"
    );

    return res.send(html);

  } catch (error) {
    console.error(
      "Keyword 404 rendering error:",
      error
    );

    res.status(404);

    res.setHeader(
      "X-Robots-Tag",
      "noindex, nofollow"
    );

    return res.send("Not Found");
  }
}
