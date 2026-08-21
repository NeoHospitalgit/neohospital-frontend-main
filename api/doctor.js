export default async function handler(req, res) {
  try {
    const slug = req.query.slug;

    if (!slug) {
      return serveNotFoundPage(req, res);
    }

    // ==========================================
    // FETCH DOCTORS FROM CMS / API
    // ==========================================

    const apiResponse = await fetch(
      "https://api.neohospital.com/api/doctors/view-doctors",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!apiResponse.ok) {
      console.error(
        "Doctors API failed:",
        apiResponse.status
      );

      return serveNotFoundPage(req, res);
    }

    const data = await apiResponse.json();

    // ==========================================
    // SUPPORT DIFFERENT API RESPONSE STRUCTURES
    // ==========================================

    let doctors = [];

    if (Array.isArray(data?.doctors)) {
      doctors = data.doctors;
    } else if (Array.isArray(data)) {
      doctors = data;
    } else if (Array.isArray(data?.data)) {
      doctors = data.data;
    } else if (Array.isArray(data?.Doctors)) {
      doctors = data.Doctors;
    }

    // ==========================================
    // FIND DOCTOR BY SLUG
    // ==========================================

    const doctor = doctors.find(
      (item) =>
        item?.drSlug === slug ||
        item?.doctor_slug === slug ||
        item?.doctorSlug === slug ||
        item?.slug === slug
    );

    // ==========================================
    // DOCTOR NOT FOUND
    // ==========================================

    if (!doctor) {
      console.error(
        "Doctor not found for slug:",
        slug
      );

      return serveNotFoundPage(req, res);
    }

    // ==========================================
    // IMPORTANT:
    // drMetaTags is the existing CMS SEO source.
    // We will use the exact SEO HTML stored
    // against the doctor.
    // ==========================================

    const doctorMetaTags =
      typeof doctor.drMetaTags === "string"
        ? doctor.drMetaTags.trim()
        : "";

    // ==========================================
    // LOAD REACT APPLICATION
    // ==========================================

    const host =
      req.headers.host ||
      process.env.VERCEL_URL;

    const protocol =
      req.headers["x-forwarded-proto"] ||
      "https";

    const response = await fetch(
      `${protocol}://${host}/index.html`
    );

    if (!response.ok) {
      console.error(
        "Failed to load index.html:",
        response.status
      );

      return res
        .status(500)
        .send(
          "Failed to load application"
        );
    }

    let html =
      await response.text();

    // ==========================================
    // REMOVE STATIC SEO FROM INDEX.HTML
    // ==========================================

    html =
      removeExistingSeo(html);

    // ==========================================
    // SERVER-SIDE DOCTOR SEO
    // ==========================================

    if (doctorMetaTags) {
      html = injectIntoHead(
        html,
        doctorMetaTags
      );
    } else {
      // ========================================
      // FALLBACK SEO
      // Only used if drMetaTags is empty.
      // ========================================

      const doctorName =
        doctor.drTitle ||
        doctor.drName ||
        doctor.doctor_name ||
        doctor.name ||
        "Doctor";

      const department =
        doctor.drDepartment ||
        doctor.specialization ||
        doctor.speciality ||
        doctor.specialty ||
        "";

      const fallbackTitle =
        `${doctorName}${
          department
            ? ` - ${department}`
            : ""
        } | NEO Hospital`;

      const fallbackDescription =
        `Consult ${doctorName}${
          department
            ? `, ${department}`
            : ""
        } at NEO Hospital. View doctor profile, expertise, qualifications and appointment details.`;

      const canonicalUrl =
        `https://www.neohospital.com/doctor-details/${slug}`;

      const fallbackImage =
        getDoctorImage(doctor);

      const fallbackTags = `
<title>${escapeHtml(
        fallbackTitle
      )}</title>

<meta
  name="title"
  content="${escapeAttr(
    fallbackTitle
  )}"
>

<meta
  name="description"
  content="${escapeAttr(
    fallbackDescription
  )}"
>

<meta
  name="robots"
  content="index, follow"
>

<meta
  name="author"
  content="NEO Hospital"
>

<link
  rel="canonical"
  href="${escapeAttr(
    canonicalUrl
  )}"
>

<!-- Open Graph -->

<meta
  property="og:type"
  content="profile"
>

<meta
  property="og:title"
  content="${escapeAttr(
    fallbackTitle
  )}"
>

<meta
  property="og:description"
  content="${escapeAttr(
    fallbackDescription
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
  fallbackImage
    ? `
<meta
  property="og:image"
  content="${escapeAttr(
    fallbackImage
  )}"
>

<meta
  property="og:image:secure_url"
  content="${escapeAttr(
    fallbackImage
  )}"
>

<meta
  property="og:image:alt"
  content="${escapeAttr(
    doctorName
  )}"
>
`
    : ""
}

<!-- Twitter -->

<meta
  name="twitter:card"
  content="summary_large_image"
>

<meta
  name="twitter:title"
  content="${escapeAttr(
    fallbackTitle
  )}"
>

<meta
  name="twitter:description"
  content="${escapeAttr(
    fallbackDescription
  )}"
>

${
  fallbackImage
    ? `
<meta
  name="twitter:image"
  content="${escapeAttr(
    fallbackImage
  )}"
>

<meta
  name="twitter:image:alt"
  content="${escapeAttr(
    doctorName
  )}"
>
`
    : ""
}
`;

      html = injectIntoHead(
        html,
        fallbackTags
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
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return res.send(html);

  } catch (error) {
    console.error(
      "Doctor SSR SEO error:",
      error
    );

    return serveNotFoundPage(
      req,
      res
    );
  }
}


// ==========================================
// INJECT SEO INTO <HEAD>
// ==========================================

function injectIntoHead(
  html,
  seoTags
) {
  if (
    /<\/head>/i.test(html)
  ) {
    return html.replace(
      /<\/head>/i,
      `${seoTags}\n</head>`
    );
  }

  return `${seoTags}\n${html}`;
}


// ==========================================
// REMOVE EXISTING STATIC SEO
// ==========================================

function removeExistingSeo(html) {

  // Remove title
  html =
    html.replace(
      /<title\b[^>]*>[\s\S]*?<\/title>/gi,
      ""
    );

  const patterns = [

    // Standard meta
    /<meta\b[^>]*\bname=["']title["'][^>]*>/gi,

    /<meta\b[^>]*\bname=["']description["'][^>]*>/gi,

    /<meta\b[^>]*\bname=["']keywords["'][^>]*>/gi,

    /<meta\b[^>]*\bname=["']robots["'][^>]*>/gi,

    /<meta\b[^>]*\bname=["']author["'][^>]*>/gi,

    // Open Graph
    /<meta\b[^>]*\bproperty=["']og:[^"']+["'][^>]*>/gi,

    // Twitter
    /<meta\b[^>]*\bname=["']twitter:[^"']+["'][^>]*>/gi,

    // Article
    /<meta\b[^>]*\bproperty=["']article:[^"']+["'][^>]*>/gi,

    // Profile
    /<meta\b[^>]*\bproperty=["']profile:[^"']+["'][^>]*>/gi,

    // Canonical
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


// ==========================================
// DOCTOR IMAGE FALLBACK
// ==========================================

function getDoctorImage(
  doctor
) {

  const image =
    doctor?.drImage ||
    doctor?.doctor_image ||
    doctor?.doctorImage ||
    doctor?.image ||
    doctor?.profile_image ||
    doctor?.profileImage ||
    "";

  if (!image) {
    return "";
  }

  const value =
    String(image);

  if (
    /^https?:\/\//i.test(
      value
    )
  ) {
    return value.replace(
      /^http:\/\//i,
      "https://"
    );
  }

  return `https://api.neohospital.com/uploads/doctors/${value.replace(
    /^\/+/,
    ""
  )}`;
}


// ==========================================
// HTML ESCAPE
// ==========================================

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


// ==========================================
// ATTRIBUTE ESCAPE
// ==========================================

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


// ==========================================
// 404 PAGE
// ==========================================

async function serveNotFoundPage(
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

    const response =
      await fetch(
        `${protocol}://${host}/index.html`
      );

    if (!response.ok) {

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
      await response.text();

    res.status(404);

    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8"
    );

    res.setHeader(
      "X-Robots-Tag",
      "noindex, nofollow"
    );

    res.setHeader(
      "Cache-Control",
      "public, max-age=0, must-revalidate"
    );

    return res.send(
      html
    );

  } catch (error) {

    console.error(
      "404 page rendering error:",
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
