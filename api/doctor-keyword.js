export default async function handler(req, res) {
  try {
    const slug = req.query.slug;

    if (!slug) {
      return sendReact404(req, res);
    }

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
    // Get SEO data from keyword CMS
    // =====================================
    const seoTags =
      keyword?.seo_head ||
      keyword?.seo_tag ||
      keyword?.seotags ||
      keyword?.tagdata ||
      "";

    // =====================================
    // Inject SEO into <head>
    // =====================================
    if (seoTags) {
      const headTags = String(seoTags)
        .replace(/<\/?html[^>]*>/gi, "")
        .replace(/<\/?head[^>]*>/gi, "");

      html = html.replace(
        /<head>/i,
        `<head>\n${headTags}`
      );
    }

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
