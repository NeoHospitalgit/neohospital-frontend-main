export default async function handler(req, res) {
  try {
    const slug = req.query.slug;

    if (!slug) {
      return serveNotFoundPage(req, res);
    }

    // ==========================================
    // FETCH DOCTORS
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
      return serveNotFoundPage(req, res);
    }

    const data = await apiResponse.json();

    const doctors = Array.isArray(data?.doctors)
      ? data.doctors
      : Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : [];

    const doctor = doctors.find(
      (item) =>
        item.drSlug === slug ||
        item.doctor_slug === slug ||
        item.doctorSlug === slug ||
        item.slug === slug
    );

    // Doctor does not exist
    if (!doctor) {
      return serveNotFoundPage(req, res);
    }

    // ==========================================
    // DOCTOR SEO
    // ==========================================

    const doctorName =
      doctor.drName ||
      doctor.doctor_name ||
      doctor.doctorName ||
      doctor.name ||
      "Doctor";

    const specialization =
      doctor.specialization ||
      doctor.speciality ||
      doctor.specialty ||
      doctor.department ||
      "";

    const seoTitle =
      doctor.seo_title ||
      doctor.meta_title ||
      doctor.seoTitle ||
      `${doctorName}${
        specialization
          ? ` - ${specialization}`
          : ""
      } | NEO Hospital`;

    const seoDescription =
      doctor.meta_description ||
      doctor.metaDescription ||
      doctor.seo_description ||
      doctor.seoDescription ||
      `Consult ${doctorName}${
        specialization
          ? `, ${specialization}`
          : ""
      } at NEO Hospital. View profile, expertise, treatments and appointment details.`;

    const canonicalUrl =
      `https://www.neohospital.com/doctor-details/${slug}`;

    // ==========================================
    // DOCTOR IMAGE
    // ==========================================

    const rawImage =
      doctor.drImage ||
      doctor.doctor_image ||
      doctor.doctorImage ||
      doctor.image ||
      doctor.profile_image ||
      doctor.profileImage ||
      "";

    let doctorImage = "";

    if (rawImage) {
      const imageValue =
        String(rawImage);

      if (
        /^https?:\/\//i.test(
          imageValue
        )
      ) {
        doctorImage =
          imageValue.replace(
            /^http:\/\//i,
            "https://"
          );
      } else {
        doctorImage =
          `https://api.neohospital.com/uploads/doctors/${imageValue.replace(
            /^\/+/,
            ""
          )}`;
      }
    }

    // ==========================================
    // LOAD REACT INDEX
    // ==========================================

    const host =
      req.headers.host ||
      process.env.VERCEL_URL;

    const protocol =
      req.headers["x-forwarded-proto"] ||
      "https";

    const response =
      await fetch(
        `${protocol}://${host}/index.html`
      );

    if (!response.ok) {
      return res
        .status(500)
        .send(
          "Failed to load application"
        );
    }

    let html =
      await response.text();

    // ==========================================
    // REMOVE STATIC SEO
    // ==========================================

    html =
      removeExistingSeo(html);

    // ==========================================
    // SERVER SIDE DOCTOR SEO
    // ==========================================

    const seoTags = `
<title>${escapeHtml(
      seoTitle
    )}</title>

<meta
  name="title"
  content="${escapeAttr(
    seoTitle
  )}"
>

<meta
  name="description"
  content="${escapeAttr(
    seoDescription
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


<!-- ================================= -->
<!-- OPEN GRAPH -->
<!-- ================================= -->

<meta
  property="og:type"
  content="profile"
>

<meta
  property="og:title"
  content="${escapeAttr(
    seoTitle
  )}"
>

<meta
  property="og:description"
  content="${escapeAttr(
    seoDescription
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
  doctorImage
    ? `
<meta
  property="og:image"
  content="${escapeAttr(
    doctorImage
  )}"
>

<meta
  property="og:image:secure_url"
  content="${escapeAttr(
    doctorImage
  )}"
>

<meta
  property="og:image:type"
  content="image/jpeg"
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


<!-- ================================= -->
<!-- TWITTER / X -->
<!-- ================================= -->

<meta
  name="twitter:card"
  content="summary_large_image"
>

<meta
  name="twitter:title"
  content="${escapeAttr(
    seoTitle
  )}"
>

<meta
  name="twitter:description"
  content="${escapeAttr(
    seoDescription
  )}"
>

${
  doctorImage
    ? `
<meta
  name="twitter:image"
  content="${escapeAttr(
    doctorImage
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


<!-- ================================= -->
<!-- PROFILE -->
<!-- ================================= -->

<meta
  property="profile:first_name"
  content="${escapeAttr(
    doctorName
  )}"
>

${
  specialization
    ? `
<meta
  property="article:section"
  content="${escapeAttr(
    specialization
  )}"
>
`
    : ""
}
`;

    // ==========================================
    // INJECT SEO INTO HEAD
    // ==========================================

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
// REMOVE EXISTING SEO TAGS
// ==========================================

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

    /<meta\b[^>]*\bproperty=["']profile:[^"']+["'][^>]*>/gi,

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


// ==========================================
// ESCAPE HTML
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
// ESCAPE ATTRIBUTE
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

      res.setHeader(
        "X-Robots-Tag",
        "noindex, nofollow"
      );

      return res
        .status(404)
        .send(
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

    res.setHeader(
      "X-Robots-Tag",
      "noindex, nofollow"
    );

    return res
      .status(404)
      .send(
        "Not Found"
      );
  }
}
