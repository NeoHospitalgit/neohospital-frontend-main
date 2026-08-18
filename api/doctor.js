export default async function handler(req, res) {
  try {
    const slug = req.query.slug;

    if (!slug) {
      return serveNotFoundPage(req, res);
    }

    // Check doctors from CMS/API
    const apiResponse = await fetch(
      "https://api.neohospital.com/api/doctors/view-doctors"
    );

    if (!apiResponse.ok) {
      return serveNotFoundPage(req, res);
    }

    const data = await apiResponse.json();

    const doctors = data?.doctors || [];

    const doctor = doctors.find(
      (item) => item.drSlug === slug
    );

    // Doctor does not exist
    if (!doctor) {
      return serveNotFoundPage(req, res);
    }

    // Doctor exists
    return serveAppPage(req, res);

  } catch (error) {
    console.error("Doctor validation error:", error);

    return serveNotFoundPage(req, res);
  }
}


// ==========================================
// 404 PAGE
// ==========================================

async function serveNotFoundPage(req, res) {
  try {
    const host =
      req.headers.host || process.env.VERCEL_URL;

    const protocol =
      req.headers["x-forwarded-proto"] || "https";

    const response = await fetch(
      `${protocol}://${host}/index.html`
    );

    if (!response.ok) {
      res.setHeader(
        "X-Robots-Tag",
        "noindex, nofollow"
      );

      return res.status(404).send("Not Found");
    }

    const html = await response.text();

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

    return res.send(html);

  } catch (error) {
    console.error(
      "404 page rendering error:",
      error
    );

    res.setHeader(
      "X-Robots-Tag",
      "noindex, nofollow"
    );

    return res.status(404).send("Not Found");
  }
}


// ==========================================
// VALID DOCTOR PAGE
// ==========================================

async function serveAppPage(req, res) {
  try {
    const host =
      req.headers.host || process.env.VERCEL_URL;

    const protocol =
      req.headers["x-forwarded-proto"] || "https";

    const response = await fetch(
      `${protocol}://${host}/index.html`
    );

    if (!response.ok) {
      return res.status(500).send(
        "Failed to load application"
      );
    }

    const html = await response.text();

    res.status(200);

    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "public, max-age=0, must-revalidate"
    );

    return res.send(html);

  } catch (error) {
    console.error(
      "Application rendering error:",
      error
    );

    return res.status(500).send(
      "Failed to load application"
    );
  }
}