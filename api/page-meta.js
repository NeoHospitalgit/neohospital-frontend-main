export default async function handler(req, res) {
  const rawPath = String(req.query?.path || "/").replace(/^\/+|\/+$/g, "");
  const path = rawPath ? `/${rawPath}` : "/";

  const apiBase = "https://api.neohospital.com";

  try {
    const indexUrl = `${
      req.headers["x-forwarded-proto"] || "https"
    }://${req.headers.host || process.env.VERCEL_URL}/index.html`;

    const [htmlResponse, headerResponse, categoryResponse] =
      await Promise.all([
        fetch(indexUrl),
        fetch(`${apiBase}/api/header/view-header`),
        fetch(`${apiBase}/api/categories/view-category`),
      ]);

    if (!htmlResponse.ok) {
      throw new Error("Failed to load application HTML");
    }

    let html = await htmlResponse.text();

    const headerData = headerResponse.ok
      ? await headerResponse.json()
      : {};

    const categoryData = categoryResponse.ok
      ? await categoryResponse.json()
      : {};

    let tagdata = "";

    const staticPages = new Set([
      "about",
      "specialities",
      "doctors",
      "contact",
      "blog",
      "services",
      "corporate-policies",
      "bio-medical-report",
      "international-patient",
      "gallery",
      "career",
      "privacy-policy",
      "terms-and-conditions",
      "procedures",
    ]);

    // ==========================================
    // HOMEPAGE SEO
    // ==========================================
    if (path === "/") {
      const record = Array.isArray(headerData?.header)
        ? headerData.header.find(
            (item) =>
              String(item?.page || "").trim().toLowerCase() === "home"
          )
        : null;

      tagdata =
        record?.seo_head ||
        record?.seo_tag ||
        record?.seotags ||
        record?.tagdata ||
        "";
    }

    // ==========================================
    // STATIC PAGE SEO
    // ==========================================
    else if (staticPages.has(rawPath.toLowerCase())) {
      const record = Array.isArray(headerData?.header)
        ? headerData.header.find(
            (item) =>
              String(item?.page || "").trim().toLowerCase() ===
              rawPath.toLowerCase()
          )
        : null;

      tagdata =
        record?.seo_head ||
        record?.seo_tag ||
        record?.seotags ||
        record?.tagdata ||
        "";
    }

    // ==========================================
    // CATEGORY / SPECIALITY SEO
    // ==========================================
    else {
      const categories = Array.isArray(categoryData?.category)
        ? categoryData.category
        : [];

      const category = categories.find(
        (item) =>
          String(item?.slug || "").trim().toLowerCase() ===
          rawPath.toLowerCase()
      );

      tagdata =
        category?.seo_tag ||
        category?.seo_head ||
        category?.seotags ||
        category?.tagdata ||
        "";
    }

    // ==========================================
    // INJECT DYNAMIC SEO
    // ==========================================
    if (tagdata) {
      let headTags = String(tagdata)
        .replace(/<\/?html[^>]*>/gi, "")
        .replace(/<\/?head[^>]*>/gi, "")
        .trim();

      /*
       * Mark server injected SEO as React Helmet tags.
       * This prevents Home.jsx Helmet from creating
       * duplicate title/meta/canonical/OG/Twitter tags.
       */
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

    // ==========================================
    // RESPONSE
    // ==========================================
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
    console.error("Page Meta Error:", error);

    res.status(200);

    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8"
    );

    return res.send(`
      <!doctype html>
      <html>
        <head>
          <title>NEO Hospital</title>
        </head>
        <body></body>
      </html>
    `);
  }
}