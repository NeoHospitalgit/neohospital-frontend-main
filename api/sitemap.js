/**
 * Dynamic XML sitemap for NEO Hospital
 *
 * Served at:
 * https://www.neohospital.com/sitemap.xml
 *
 * Dynamic sources:
 * - Blogs
 * - Doctors
 * - Specialities
 * - Procedures
 * - Specialist / Keyword landing pages
 * - SEO / Treatment pages
 *
 * Specialist pages are NOT hard-coded.
 */

const API_BASE = "https://api.neohospital.com";

const STATIC_URLS = [
  { path: "/", priority: "1.00", changefreq: "daily" },
  { path: "/about", priority: "0.80", changefreq: "monthly" },
  { path: "/specialities", priority: "0.90", changefreq: "weekly" },
  { path: "/doctors", priority: "0.90", changefreq: "weekly" },
  { path: "/contact", priority: "0.80", changefreq: "monthly" },
  { path: "/blog", priority: "0.80", changefreq: "daily" },
  { path: "/services", priority: "0.80", changefreq: "weekly" },
  { path: "/procedures", priority: "0.80", changefreq: "weekly" },
  { path: "/corporate-policies", priority: "0.60", changefreq: "monthly" },
  { path: "/bio-medical-report", priority: "0.60", changefreq: "monthly" },
  { path: "/international-patient", priority: "0.70", changefreq: "monthly" },
  { path: "/gallery", priority: "0.60", changefreq: "monthly" },
  { path: "/career", priority: "0.60", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.40", changefreq: "yearly" },
  { path: "/terms-and-conditions", priority: "0.40", changefreq: "yearly" },

  // Public speciality pages
  { path: "/pulmonology", priority: "0.80", changefreq: "weekly" },
  { path: "/dental", priority: "0.80", changefreq: "weekly" },
  { path: "/gynaecology", priority: "0.80", changefreq: "weekly" },
  { path: "/dietetics", priority: "0.80", changefreq: "weekly" },
  { path: "/neurology", priority: "0.80", changefreq: "weekly" },
  { path: "/dermatology", priority: "0.80", changefreq: "weekly" },
  { path: "/anaesthesiology", priority: "0.80", changefreq: "weekly" },
  { path: "/emergency-medicine", priority: "0.80", changefreq: "weekly" },
  { path: "/gastrosciences", priority: "0.80", changefreq: "weekly" },
  { path: "/ent", priority: "0.80", changefreq: "weekly" },
  { path: "/clinical-psychology", priority: "0.80", changefreq: "weekly" },
  { path: "/orthopedics", priority: "0.80", changefreq: "weekly" },
  { path: "/nephrology", priority: "0.80", changefreq: "weekly" },
  { path: "/neurosurgery", priority: "0.80", changefreq: "weekly" },
  { path: "/clinical-laboratory", priority: "0.80", changefreq: "weekly" },
  { path: "/opthalmology", priority: "0.80", changefreq: "weekly" },
  { path: "/internal-medicine", priority: "0.80", changefreq: "weekly" },
  { path: "/cardiology", priority: "0.80", changefreq: "weekly" },
  { path: "/psychiatry", priority: "0.80", changefreq: "weekly" },
  { path: "/cosmetic-plastic-surgery", priority: "0.80", changefreq: "weekly" },
  { path: "/radiology", priority: "0.80", changefreq: "weekly" },
  { path: "/oncology-surgery", priority: "0.80", changefreq: "weekly" },
  { path: "/occupational-therapy", priority: "0.80", changefreq: "weekly" },
  { path: "/medical-oncology", priority: "0.80", changefreq: "weekly" },
  { path: "/urology", priority: "0.80", changefreq: "weekly" },
  { path: "/neonatology-peadiatrics", priority: "0.80", changefreq: "weekly" },
  { path: "/general-laparoscopic-surgery", priority: "0.80", changefreq: "weekly" },
  { path: "/audiologist-and-speech-therapist", priority: "0.80", changefreq: "weekly" },
  { path: "/physiotherapy", priority: "0.80", changefreq: "weekly" },
  { path: "/cath-lab", priority: "0.80", changefreq: "weekly" },
  { path: "/cardiothoracic-vascular-surgery", priority: "0.80", changefreq: "weekly" },
  { path: "/pediatric-gastroenterology", priority: "0.80", changefreq: "weekly" }
];

const API_ENDPOINTS = {
  blogs: `${API_BASE}/api/blogs/view-blogs`,
  doctors: `${API_BASE}/api/doctors/view-doctors`,
  categories: `${API_BASE}/api/categories/view-category`,
  procedures: `${API_BASE}/api/adminv12/view-procedures`,
  keywords: `${API_BASE}/api/adminv11/keywords`,
  seoPages: `${API_BASE}/api/adminv8/view-seopages`
};


// =====================================
// HELPERS
// =====================================

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}


function firstArray(payload, keys = []) {

  if (Array.isArray(payload)) {
    return payload;
  }

  for (const key of keys) {
    if (Array.isArray(payload?.[key])) {
      return payload[key];
    }
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.result)) {
    return payload.result;
  }

  return [];
}


function isActive(item, fields) {

  const field = fields.find(
    (name) =>
      item?.[name] !== undefined &&
      item?.[name] !== null
  );

  // No status field = keep record
  if (!field) {
    return true;
  }

  const value = item[field];

  if (value === true || value === 1) {
    return true;
  }

  if (typeof value === "string") {

    return [
      "true",
      "1",
      "active",
      "published",
      "publish",
      "enabled"
    ].includes(
      value.toLowerCase().trim()
    );
  }

  return false;
}


function getLastModified(item) {

  const value =
    item?.updatedAt ||
    item?.updated_at ||
    item?.modifiedAt ||
    item?.modified_at ||
    item?.createdAt ||
    item?.created_at;

  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date
    .toISOString()
    .slice(0, 10);
}


function addUrl(map, path, options = {}) {

  if (
    !path ||
    typeof path !== "string"
  ) {
    return;
  }

  let cleanPath =
    path.trim();

  if (!cleanPath) {
    return;
  }

  if (
    /^https?:\/\//i.test(
      cleanPath
    )
  ) {

    try {

      const parsed =
        new URL(cleanPath);

      if (
        parsed.hostname !==
          "www.neohospital.com" &&
        parsed.hostname !==
          "neohospital.com"
      ) {
        return;
      }

      cleanPath =
        parsed.pathname || "/";

    } catch {
      return;
    }
  }

  if (
    !cleanPath.startsWith("/")
  ) {
    cleanPath =
      `/${cleanPath}`;
  }

  if (
    cleanPath.length > 1
  ) {
    cleanPath =
      cleanPath.replace(
        /\/+$/,
        ""
      );
  }

  const existing =
    map.get(cleanPath);

  if (
    !existing ||
    (!existing.lastmod &&
      options.lastmod)
  ) {

    map.set(
      cleanPath,
      {
        path: cleanPath,

        priority:
          options.priority ||
          existing?.priority ||
          "0.50",

        changefreq:
          options.changefreq ||
          existing?.changefreq ||
          "monthly",

        lastmod:
          options.lastmod ||
          existing?.lastmod
      }
    );
  }
}


async function fetchJson(url) {

  try {

    const response =
      await fetch(
        url,
        {
          headers: {
            Accept:
              "application/json"
          }
        }
      );

    if (!response.ok) {

      console.warn(
        `Sitemap source failed: ${response.status} ${url}`
      );

      return null;
    }

    return await response.json();

  } catch (error) {

    console.warn(
      `Sitemap source error: ${url}`,
      error?.message ||
        error
    );

    return null;
  }
}


// =====================================
// SLUG EXTRACTORS
// =====================================

function extractBlogSlug(item) {

  return (
    item?.blog_slug ||
    item?.blogSlug ||
    item?.slug
  );
}


function extractDoctorSlug(item) {

  return (
    item?.drSlug ||
    item?.doctor_slug ||
    item?.doctorSlug ||
    item?.dr_slug ||
    item?.slug
  );
}


function extractCategorySlug(item) {

  return (
    item?.slug ||
    item?.category_slug ||
    item?.categorySlug
  );
}


function extractProcedureSlug(item) {

  return (
    item?.procedures_slug ||
    item?.procedure_slug ||
    item?.procedureSlug ||
    item?.slug
  );
}


/*
 * Specialist / keyword landing page slug.
 *
 * Example:
 * best-cardiologists-in-noida
 * best-orthopedist-in-noida
 * best-gastroenterologist-in-noida
 * best-dentists-in-noida
 * best-pulmonologists-in-noida
 *
 * No individual specialist URL is hard-coded.
 */

function extractKeywordSlug(item) {

  const value =
    item?.keyword_slug ||
    item?.keywordSlug ||
    item?.keyword_slug_url ||
    item?.url_slug ||
    item?.page_slug ||
    item?.slug;

  if (!value) {
    return "";
  }

  return String(value)
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .replace(
      /^doctor\//i,
      ""
    );
}


function extractSeoPageSlug(item) {

  return (
    item?.pageurl ||
    item?.page_url ||
    item?.seo_slug ||
    item?.seoSlug ||
    item?.slug
  );
}


// =====================================
// HANDLER
// =====================================

export default async function handler(
  req,
  res
) {

  try {

    const results =
      await Promise.all(
        Object.entries(
          API_ENDPOINTS
        ).map(
          async ([name, url]) => [
            name,
            await fetchJson(url)
          ]
        )
      );

    const payloads =
      Object.fromEntries(
        results
      );

    const urls =
      new Map();


    // =====================================
    // STATIC CORE PAGES
    // =====================================

    for (
      const item of STATIC_URLS
    ) {

      addUrl(
        urls,
        item.path,
        item
      );
    }


    // =====================================
    // BLOGS
    // =====================================

    const blogs =
      firstArray(
        payloads.blogs,
        [
          "Blog",
          "blogs",
          "blog"
        ]
      );

    for (
      const blog of blogs
    ) {

      if (
        !isActive(
          blog,
          [
            "blog_status",
            "status",
            "isPublished",
            "published"
          ]
        )
      ) {
        continue;
      }

      const slug =
        extractBlogSlug(
          blog
        );

      if (!slug) {
        continue;
      }

      addUrl(
        urls,
        `/blog/${encodeURIComponent(
          slug
        )}`,
        {
          lastmod:
            getLastModified(
              blog
            ),
          changefreq:
            "monthly",
          priority:
            "0.70"
        }
      );
    }


    // =====================================
    // DOCTORS
    // =====================================

    const doctors =
      firstArray(
        payloads.doctors,
        [
          "doctors",
          "Doctors",
          "doctor"
        ]
      );

    for (
      const doctor of doctors
    ) {

      if (
        !isActive(
          doctor,
          [
            "drStatus",
            "doctor_status",
            "status",
            "isActive",
            "active"
          ]
        )
      ) {
        continue;
      }

      const slug =
        extractDoctorSlug(
          doctor
        );

      if (!slug) {
        continue;
      }

      addUrl(
        urls,
        `/doctor-details/${encodeURIComponent(
          slug
        )}`,
        {
          lastmod:
            getLastModified(
              doctor
            ),
          changefreq:
            "monthly",
          priority:
            "0.80"
        }
      );
    }


    // =====================================
    // SPECIALITIES
    // =====================================

    const categories =
      firstArray(
        payloads.categories,
        [
          "category",
          "categories",
          "Category",
          "Categories"
        ]
      );

    for (
      const category of categories
    ) {

      if (
        !isActive(
          category,
          [
            "status",
            "category_status",
            "isActive",
            "active"
          ]
        )
      ) {
        continue;
      }

      const slug =
        extractCategorySlug(
          category
        );

      if (!slug) {
        continue;
      }

      addUrl(
        urls,
        `/${encodeURIComponent(
          slug
        )}`,
        {
          lastmod:
            getLastModified(
              category
            ),
          changefreq:
            "weekly",
          priority:
            "0.80"
        }
      );
    }


    // =====================================
    // PROCEDURES
    // =====================================

    const procedures =
      firstArray(
        payloads.procedures,
        [
          "procedures",
          "procedure",
          "Procedures",
          "Procedure",
          "data"
        ]
      );

    for (
      const procedure of procedures
    ) {

      if (
        !isActive(
          procedure,
          [
            "procedures_status",
            "procedure_status",
            "status",
            "isActive",
            "active"
          ]
        )
      ) {
        continue;
      }

      const slug =
        extractProcedureSlug(
          procedure
        );

      if (!slug) {
        continue;
      }

      addUrl(
        urls,
        `/procedures/${encodeURIComponent(
          slug
        )}`,
        {
          lastmod:
            getLastModified(
              procedure
            ),
          changefreq:
            "monthly",
          priority:
            "0.75"
        }
      );
    }


    // =====================================
    // SPECIALIST / KEYWORD PAGES
    // DYNAMIC
    // =====================================

    const keywords =
      firstArray(
        payloads.keywords,
        [
          "data",
          "keywords",
          "Keyword",
          "Keywords",
          "keyword"
        ]
      );

    for (
      const keyword of keywords
    ) {

      const slug =
        extractKeywordSlug(
          keyword
        );

      if (!slug) {
        continue;
      }

      if (
        !isActive(
          keyword,
          [
            "keyword_status",
            "status",
            "isActive",
            "active",
            "published",
            "isPublished"
          ]
        )
      ) {
        continue;
      }

      addUrl(
        urls,
        `/doctor/${encodeURIComponent(
          slug
        )}`,
        {
          lastmod:
            getLastModified(
              keyword
            ),
          changefreq:
            "weekly",
          priority:
            "0.80"
        }
      );
    }


    // =====================================
    // SEO / TREATMENT PAGES
    // =====================================

    const seoPages =
      firstArray(
        payloads.seoPages,
        [
          "seopages",
          "seoPages",
          "SEO",
          "data"
        ]
      );

    for (
      const page of seoPages
    ) {

      if (
        !isActive(
          page,
          [
            "status",
            "page_status",
            "isActive",
            "active",
            "published",
            "isPublished"
          ]
        )
      ) {
        continue;
      }

      const slug =
        extractSeoPageSlug(
          page
        );

      if (!slug) {
        continue;
      }

      addUrl(
        urls,
        `/treatment/${encodeURIComponent(
          slug
        )}`,
        {
          lastmod:
            getLastModified(
              page
            ),
          changefreq:
            "monthly",
          priority:
            "0.65"
        }
      );
    }


    // =====================================
    // BUILD XML
    // =====================================

    const xmlUrls =
      Array.from(
        urls.values()
      )
        .sort(
          (a, b) =>
            a.path.localeCompare(
              b.path
            )
        )
        .map(
          (item) => {

            const lastmod =
              item.lastmod
                ? `\n    <lastmod>${escapeXml(
                    item.lastmod
                  )}</lastmod>`
                : "";

            return `  <url>
    <loc>https://www.neohospital.com${escapeXml(
      item.path
    )}</loc>${lastmod}
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`;
          }
        )
        .join("\n");


    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;


    // =====================================
    // RESPONSE
    // =====================================

    res.status(200);

    res.setHeader(
      "Content-Type",
      "application/xml; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );

    res.setHeader(
      "X-Sitemap-URL-Count",
      String(urls.size)
    );

    return res.send(
      xml
    );

  } catch (error) {

    console.error(
      "Sitemap generation error:",
      error
    );

    res.status(500);

    res.setHeader(
      "Content-Type",
      "application/xml; charset=utf-8"
    );

    return res.send(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`
    );
  }
}
