function normalizeSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function handler(req, res) {
  const rawPath = String(req.query?.path || "/").replace(/^\/+|\/+$/g, "");
  const path = rawPath ? `/${rawPath}` : "/";
  const procedureMatch = rawPath.match(/^procedures\/([^/]+)$/i);
  const procedureSlug = procedureMatch?.[1];

  const apiBase = "https://api.neohospital.com";

  try {
    const indexUrl = `${
      req.headers["x-forwarded-proto"] || "https"
    }://${req.headers.host || process.env.VERCEL_URL}/index.html`;

    const [htmlResponse, headerResponse, categoryResponse, procedureResponse] =
      await Promise.all([
        fetch(indexUrl),
        procedureSlug
          ? Promise.resolve(null)
          : fetch(`${apiBase}/api/header/view-header`),
        procedureSlug
          ? Promise.resolve(null)
          : fetch(`${apiBase}/api/categories/view-category`),
        procedureSlug
          ? fetch(
              `${apiBase}/api/procedures/slug/${encodeURIComponent(
                procedureSlug
              )}`
            )
          : Promise.resolve(null),
      ]);

    if (!htmlResponse.ok) {
      throw new Error("Failed to load application HTML");
    }

    let html = await htmlResponse.text();

    if (rawPath.toLowerCase() === "login") {
      const loginRobotsTag =
        '<meta data-react-helmet="true" name="robots" content="noindex, follow">';

      html = html.replace(
        /<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>\s*/gi,
        ""
      );
      html = html.replace(/<head>/i, `<head>\n${loginRobotsTag}\n`);

      res.status(200);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader(
        "Cache-Control",
        "public, max-age=0, s-maxage=60, stale-while-revalidate=300"
      );

      return res.send(html);
    }

    let procedure = null;

    if (procedureSlug) {
      if (!procedureResponse?.ok) {
        return sendProcedureNotFound(res, html);
      }

      const procedureResult = await procedureResponse.json();
      procedure = procedureResult?.data;

      if (
        !procedureResult?.success ||
        !procedure ||
        String(procedure.procedures_slug || "").toLowerCase() !==
          procedureSlug.toLowerCase()
      ) {
        return sendProcedureNotFound(res, html);
      }
    }

    const headerData = headerResponse?.ok
      ? await headerResponse.json()
      : {};

    const categoryData = categoryResponse?.ok
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
  "faq",
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
    // PROCEDURE DETAIL SEO
    // ==========================================
    if (procedureSlug) {
      tagdata = prepareProcedureSeo(
        procedure.seo_head,
        procedure,
        procedureSlug
      );
    }

    // ==========================================
    // HOMEPAGE SEO
    // ==========================================
    else if (path === "/") {
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

      const normalizedPath = normalizeSlug(rawPath);
      const category = categories.find(
        (item) => normalizeSlug(item?.slug) === normalizedPath
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
    if (tagdata && path !== "/services") {
      let headTags = String(tagdata)
        .replace(/<\/?html[^>]*>/gi, "")
        .replace(/<\/?head[^>]*>/gi, "")
        .trim();

      if (path === "/") {
        headTags = setHospitalEmergencyTelephone(headTags);
      }

      if (procedureSlug) {
        html = html.replace(
          /<link\b(?=[^>]*\brel\s*=\s*(?:"canonical"|'canonical'|canonical\b))[^>]*>/gi,
          ""
        );
      }

      /*
       * Mark server injected SEO as React Helmet tags.
       * This prevents Home.jsx Helmet from creating
       * duplicate title/meta/canonical/OG/Twitter tags.
       */
      headTags = headTags.replace(
        procedureSlug
          ? /<(title|meta|link|script)(\s[^>]*)?>/gi
          : /<(title|meta|link)(\s[^>]*)?>/gi,
        (match, tagName, attributes = "") => {
          if (/data-react-helmet\s*=/i.test(attributes)) {
            if (
              procedureSlug &&
              !/data-procedure-ssr-seo\s*=/i.test(attributes)
            ) {
              return `<${tagName}${attributes} data-procedure-ssr-seo="true">`;
            }

            return match;
          }

          return `<${tagName}${attributes} data-react-helmet="true"${
            procedureSlug ? ' data-procedure-ssr-seo="true"' : ""
          }>`;
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

    if (procedureSlug) {
      return sendProcedureNotFound(res, "Not Found");
    }

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

function prepareProcedureSeo(seoHead, procedure, requestedSlug) {
  let headTags = String(seoHead || "")
    .replace(/<\/?html[^>]*>/gi, "")
    .replace(/<\/?head[^>]*>/gi, "")
    .trim();

  headTags = headTags.replace(
    /<link\b(?=[^>]*\brel\s*=\s*(?:"canonical"|'canonical'|canonical\b))[^>]*>/gi,
    ""
  );

  if (!/<title\b[^>]*>[\s\S]*?<\/title>/i.test(headTags)) {
    const title =
      procedure.seo_title || procedure.procedures_title || "NEO Hospital";

    headTags = `<title>${escapeHtml(title)}</title>\n${headTags}`;
  }

  if (
    !/<meta\b(?=[^>]*\bname\s*=\s*(?:"description"|'description'|description\b))[^>]*>/i.test(
      headTags
    )
  ) {
    const description =
      procedure.meta_description || procedure.procedures_description || "";

    if (description) {
      headTags += `\n<meta name="description" content="${escapeAttribute(
        description
      )}">`;
    }
  }

  const slug = String(procedure.procedures_slug || requestedSlug).trim();
  const canonical = `https://www.neohospital.com/procedures/${encodeURIComponent(
    slug
  )}`;

  return `${headTags}\n<link rel="canonical" href="${escapeAttribute(
    canonical
  )}">`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value)
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function setHospitalEmergencyTelephone(markup) {
  return markup.replace(
    /(<script\b(?=[^>]*\btype\s*=\s*["']application\/ld\+json["'])[^>]*>)([\s\S]*?)(<\/script>)/gi,
    (script, openingTag, schema, closingTag) => {
      if (!/"@type"\s*:\s*"Hospital"/i.test(schema)) {
        return script;
      }

      const updatedSchema = schema.replace(
        /("telephone"\s*:\s*)"[^"]*"/i,
        '$1"+91-120-4880088"'
      );

      if (updatedSchema === schema) {
        console.error("Hospital schema has no telephone field to update");
        return script;
      }

      return `${openingTag}${updatedSchema}${closingTag}`;
    }
  );
}

function sendProcedureNotFound(res, html) {
  res.status(404);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  return res.send(html);
}