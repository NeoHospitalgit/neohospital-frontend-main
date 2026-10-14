const NOINDEX_DOCTOR_SLUGS = new Set([
  "dt-anjali-porwal",
  "dt-deepti-choudhary",
  "dt-shweta-dubey",
  "dr-ankit-jain",
  "dr-sanjay-dalal",
  "dr-shams-gulrej",
  "dr-yogesh-arora",
]);

function shouldNoindexDoctor(slug) {
  return typeof slug === "string" && NOINDEX_DOCTOR_SLUGS.has(slug.trim());
}

function applyNoindexMetaTagsForDoctor(slug, seoTags) {
  if (!seoTags || !seoTags.trim() || !shouldNoindexDoctor(slug)) {
    return seoTags;
  }

  const metaTags = [
    '<meta data-react-helmet="true" name="robots" content="noindex, nofollow">',
    '<meta data-react-helmet="true" name="googlebot" content="noindex, nofollow">',
    '<meta data-react-helmet="true" name="bingbot" content="noindex, nofollow">',
  ].join("\n");

  let result = seoTags.replace(
    /<meta\b[^>]*\bname=["']robots["'][^>]*>/gi,
    ""
  );
  result = result.replace(
    /<meta\b[^>]*\bname=["']googlebot["'][^>]*>/gi,
    ""
  );
  result = result.replace(
    /<meta\b[^>]*\bname=["']bingbot["'][^>]*>/gi,
    ""
  );

  return `${result}\n${metaTags}`;
}

const MEDICAL_SPECIALTIES = {
  "ANAESTHESIOLOGY": "Anesthesia",
  "CARDIOLOGY": "Cardiovascular",
  "CARDIOTHORACIC & VASCULAR SURGERY": "Cardiovascular",
  "CLINICAL LABORATORY": "LaboratoryScience",
  "CLINICAL PSYCHOLOGY": "Psychiatric",
  "COSMETIC & PLASTIC SURGERY": "PlasticSurgery",
  "DENTAL": "Dentist",
  "DERMATOLOGY": "Dermatologic",
  "DIETETICS": "DietNutrition",
  "ENT": "Otolaryngologic",
  "GASTROSCIENCES": "Gastroenterologic",
  "GENERAL & LAPAROSCOPIC SURGERY": "Surgical",
  "GYNAECOLOGY & OBSTETRICS": "Gynecologic",
  "INTERNAL MEDICINE": "PrimaryCare",
  "MEDICAL ONCOLOGY": "Oncologic",
  "NEONATOLOGY & PEADIATRICS": "Pediatric",
  "NEPHROLOGY": "Renal",
  "NEUROLOGY": "Neurologic",
  "NEUROSURGERY": "Surgical",
  "NEUROSURGERY (CHIEF)": "Surgical",
  "ONCOLOGY SURGERY": "Oncologic",
  "OPTHALMOLOGY": "Optometric",
  "ORTHOPEDICS": "Musculoskeletal",
  "PEDIATRIC GASTROENTEROLOGY": "Gastroenterologic",
  "PHYSIOTHERAPY": "Musculoskeletal",
  "PSYCHIATRY": "Psychiatric",
  "PULMONOLOGY": "Pulmonary",
  "RADIOLOGY": "Radiography",
  "UROLOGY": "Urologic",
};

function createPhysicianSchema(doctor, slug) {
  const name =
    doctor.drTitle ||
    doctor.drName ||
    doctor.doctor_name ||
    doctor.doctorName ||
    doctor.name;
  const department =
    doctor.drDepartment ||
    doctor.specialization ||
    doctor.speciality ||
    doctor.specialty ||
    doctor.department;
  const profileUrl =
    `https://www.neohospital.com/doctor-details/${encodeURIComponent(slug)}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${profileUrl}#physician`,
    url: profileUrl,
    worksFor: {
      "@type": "Hospital",
      "@id": "https://www.neohospital.com/#hospital",
      name: "NEO Hospital",
      url: "https://www.neohospital.com/",
    },
  };

  if (name) {
    schema.name = String(name).trim();
  }

  if (department) {
    const normalizedDepartment = String(department)
      .trim()
      .replace(/\s+/g, " ")
      .toUpperCase();
    const specialty = MEDICAL_SPECIALTIES[normalizedDepartment];

    if (specialty) {
      schema.medicalSpecialty = {
        "@id": `https://schema.org/${specialty}`,
      };
    } else {
      schema.knowsAbout = String(department).trim();
    }
  }

  const image = getDoctorImage(doctor);
  if (image) {
    schema.image = image;
  }

  const qualifications =
    doctor.drQualification ||
    doctor.qualification ||
    doctor.qualifications ||
    doctor.credentials;
  const credentials = Array.isArray(qualifications)
    ? qualifications
    : typeof qualifications === "string"
      ? qualifications.split(/[,;\n]/)
      : [];
  const validCredentials = credentials
    .map((credential) => String(credential).trim())
    .filter(Boolean);

  if (validCredentials.length) {
    schema.hasCredential = validCredentials.map((credential) => ({
      "@type": "EducationalOccupationalCredential",
      name: credential,
    }));
  }

  return schema;
}

function containsPhysicianSchema(value) {
  if (!value || typeof value !== "object") {
    return false;
  }

  const types = Array.isArray(value["@type"])
    ? value["@type"]
    : [value["@type"]];

  return types.includes("Physician");
}

function removePhysicianSchemasFromJsonLd(value) {
  if (Array.isArray(value)) {
    const filtered = value.filter(
      (item) => !containsPhysicianSchema(item)
    );
    return filtered.length ? filtered : null;
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  if (containsPhysicianSchema(value)) {
    return null;
  }

  if (Array.isArray(value["@graph"])) {
    const graph = value["@graph"].filter(
      (item) => !containsPhysicianSchema(item)
    );

    if (!graph.length) {
      return null;
    }

    return { ...value, "@graph": graph };
  }

  return value;
}

function appendPhysicianSchema(markup, doctor, slug) {
  const withoutDuplicatePhysicianSchemas = markup.replace(
    /(<script\b(?=[^>]*\btype\s*=\s*["']application\/ld\+json["'])[^>]*>)([\s\S]*?)(<\/script>)/gi,
    (script, openingTag, schemaMarkup, closingTag) => {
      try {
        const schema = JSON.parse(schemaMarkup);
        const updatedSchema = removePhysicianSchemasFromJsonLd(schema);

        if (updatedSchema === schema) {
          return script;
        }

        return updatedSchema
          ? `${openingTag}${JSON.stringify(updatedSchema).replace(
              /</g,
              "\\u003c"
            )}${closingTag}`
          : "";
      } catch (error) {
        console.error("Invalid existing doctor JSON-LD:", error);
        return script;
      }
    }
  );
  const physicianSchema = createPhysicianSchema(doctor, slug);
  const schemaScript =
    `<script type="application/ld+json" data-doctor-physician-schema="true">${JSON.stringify(
      physicianSchema
    ).replace(/</g, "\\u003c")}</script>`;

  return `${withoutDuplicatePhysicianSchemas}\n${schemaScript}`;
}

export default async function handler(req, res) {
  if (req.query?.appointment !== undefined) {
    const slug = String(req.query.slug || "");

    if (slug) {
      res.setHeader(
        "Location",
        `https://www.neohospital.com/doctor-details/${encodeURIComponent(slug)}`
      );

      return res.status(301).end();
    }
  }

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
    // FIND DOCTOR
    // ==========================================

    const doctor = doctors.find(
      (item) =>
        item?.drSlug === slug ||
        item?.doctor_slug === slug ||
        item?.doctorSlug === slug ||
        item?.slug === slug
    );

    if (!doctor) {
      console.error(
        "Doctor not found:",
        slug
      );

      return serveNotFoundPage(req, res);
    }

    if (shouldNoindexDoctor(slug)) {
      res.setHeader("X-Robots-Tag", "noindex, nofollow");
    }

    // ==========================================
    // EXISTING CMS SEO TAGS
    // ==========================================

    const doctorMetaTags =
      typeof doctor.drMetaTags === "string"
        ? doctor.drMetaTags.trim()
        : "";

    // ==========================================
    // LOAD REACT INDEX.HTML
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
    // REMOVE INDEX.HTML SEO
    // ==========================================

    html =
      removeExistingSeo(html);

    // ==========================================
    // USE CMS SEO
    // ==========================================

    if (doctorMetaTags) {

      let serverSeoTags =
        prepareServerSeoTags(
          doctorMetaTags
        );

      serverSeoTags = applyNoindexMetaTagsForDoctor(slug, serverSeoTags);
      serverSeoTags = appendPhysicianSchema(serverSeoTags, doctor, slug);

      html =
        injectIntoHead(
          html,
          serverSeoTags
        );

    } else {

      // ========================================
      // FALLBACK SEO
      // Only when drMetaTags is empty
      // ========================================

      const doctorName =
        doctor.drTitle ||
        doctor.drName ||
        doctor.doctor_name ||
        doctor.doctorName ||
        doctor.name ||
        "Doctor";

      const department =
        doctor.drDepartment ||
        doctor.specialization ||
        doctor.speciality ||
        doctor.specialty ||
        doctor.department ||
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
        `https://www.neohospital.com/doctor-details/${encodeURIComponent(
          slug
        )}`;

      const doctorImage =
        getDoctorImage(doctor);

      const fallbackTags = `
<title data-react-helmet="true">${escapeHtml(
        fallbackTitle
      )}</title>

<meta
  data-react-helmet="true"
  name="title"
  content="${escapeAttr(
    fallbackTitle
  )}"
>

<meta
  data-react-helmet="true"
  name="description"
  content="${escapeAttr(
    fallbackDescription
  )}"
>

<meta
  data-react-helmet="true"
  name="robots"
  content="${shouldNoindexDoctor(slug) ? "noindex, nofollow" : "index, follow"}"
>

<meta
  data-react-helmet="true"
  name="googlebot"
  content="${shouldNoindexDoctor(slug) ? "noindex, nofollow" : "index, follow"}"
>

<meta
  data-react-helmet="true"
  name="bingbot"
  content="${shouldNoindexDoctor(slug) ? "noindex, nofollow" : "index, follow"}"
>

<meta
  data-react-helmet="true"
  name="author"
  content="NEO Hospital"
>

<link
  data-react-helmet="true"
  rel="canonical"
  href="${escapeAttr(
    canonicalUrl
  )}"
>

<meta
  data-react-helmet="true"
  property="og:type"
  content="profile"
>

<meta
  data-react-helmet="true"
  property="og:title"
  content="${escapeAttr(
    fallbackTitle
  )}"
>

<meta
  data-react-helmet="true"
  property="og:description"
  content="${escapeAttr(
    fallbackDescription
  )}"
>

<meta
  data-react-helmet="true"
  property="og:url"
  content="${escapeAttr(
    canonicalUrl
  )}"
>

<meta
  data-react-helmet="true"
  property="og:site_name"
  content="NEO Hospital"
>

${
  doctorImage
    ? `
<meta
  data-react-helmet="true"
  property="og:image"
  content="${escapeAttr(
    doctorImage
  )}"
>

<meta
  data-react-helmet="true"
  property="og:image:secure_url"
  content="${escapeAttr(
    doctorImage
  )}"
>

<meta
  data-react-helmet="true"
  property="og:image:alt"
  content="${escapeAttr(
    doctorName
  )}"
>
`
    : ""
}

<meta
  data-react-helmet="true"
  name="twitter:card"
  content="summary_large_image"
>

<meta
  data-react-helmet="true"
  name="twitter:title"
  content="${escapeAttr(
    fallbackTitle
  )}"
>

<meta
  data-react-helmet="true"
  name="twitter:description"
  content="${escapeAttr(
    fallbackDescription
  )}"
>

${
  doctorImage
    ? `
<meta
  data-react-helmet="true"
  name="twitter:image"
  content="${escapeAttr(
    doctorImage
  )}"
>

<meta
  data-react-helmet="true"
  name="twitter:image:alt"
  content="${escapeAttr(
    doctorName
  )}"
>
`
    : ""
}

${appendPhysicianSchema("", doctor, slug)}
`;

      html =
        injectIntoHead(
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


// ==================================================
// PREPARE CMS SEO TAGS FOR REACT HELMET
// ==================================================

function prepareServerSeoTags(tags) {

  if (
    !tags ||
    !tags.trim()
  ) {
    return "";
  }

  let result =
    tags.trim();

  // ------------------------------------------
  // Add data-react-helmet only if missing
  // ------------------------------------------

  result =
    result.replace(
      /<title(?![^>]*data-react-helmet)([^>]*)>/gi,
      '<title data-react-helmet="true"$1>'
    );

  result =
    result.replace(
      /<meta(?![^>]*data-react-helmet)([^>]*)>/gi,
      '<meta data-react-helmet="true"$1>'
    );

  result =
    result.replace(
      /<link(?![^>]*data-react-helmet)([^>]*)>/gi,
      '<link data-react-helmet="true"$1>'
    );

  return result;
}


// ==================================================
// INJECT INTO HEAD
// ==================================================

function injectIntoHead(
  html,
  seoTags
) {

  if (
    !seoTags ||
    !seoTags.trim()
  ) {
    return html;
  }

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


// ==================================================
// REMOVE EXISTING SEO
// ==================================================

function removeExistingSeo(html) {

  // ------------------------------------------
  // TITLE
  // ------------------------------------------

  html =
    html.replace(
      /<title\b[^>]*>[\s\S]*?<\/title>/gi,
      ""
    );

  // ------------------------------------------
  // META / LINK SEO
  // ------------------------------------------

  const patterns = [

    // Title
    /<meta\b[^>]*\bname=["']title["'][^>]*>/gi,

    // Description
    /<meta\b[^>]*\bname=["']description["'][^>]*>/gi,

    // Keywords
    /<meta\b[^>]*\bname=["']keywords["'][^>]*>/gi,

    // Robots
    /<meta\b[^>]*\bname=["']robots["'][^>]*>/gi,

    // Author
    /<meta\b[^>]*\bname=["']author["'][^>]*>/gi,

    // Twitter
    /<meta\b[^>]*\bname=["']twitter:[^"']+["'][^>]*>/gi,

    // Open Graph
    /<meta\b[^>]*\bproperty=["']og:[^"']+["'][^>]*>/gi,

    // Article
    /<meta\b[^>]*\bproperty=["']article:[^"']+["'][^>]*>/gi,

    // Profile
    /<meta\b[^>]*\bproperty=["']profile:[^"']+["'][^>]*>/gi,

    // Canonical
    /<link\b[^>]*\brel=["']canonical["'][^>]*>/gi
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


// ==================================================
// DOCTOR IMAGE
// ==================================================

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

  const imageValue =
    String(image).trim();

  // Already absolute URL
  if (
    /^https?:\/\//i.test(
      imageValue
    )
  ) {
    return imageValue.replace(
      /^http:\/\//i,
      "https://"
    );
  }

  // Relative doctor image
  return (
    "https://api.neohospital.com/uploads/doctors/" +
    imageValue.replace(
      /^\/+/,
      ""
    )
  );
}


// ==================================================
// HTML ESCAPE
// ==================================================

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


// ==================================================
// ATTRIBUTE ESCAPE
// ==================================================

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


// ==================================================
// 404 PAGE
// ==================================================

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
