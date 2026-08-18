export default async function handler(req, res) {
  try {
    const slug = req.query.slug;

    if (!slug) {
      return sendReact404(req, res);
    }

    const apiResponse = await fetch(
      "https://api.neohospital.com/api/blogs/view-blogs"
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

    const blog = blogs.find(
      (item) => item.blog_slug === slug
    );

    // Blog does not exist
    if (!blog) {
      return sendReact404(req, res);
    }

    // =====================================
    // Valid Blog
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

    const html = await pageResponse.text();

    res.status(200);

    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8"
    );

    return res.send(html);

  } catch (error) {
    console.error(
      "Blog validation error:",
      error
    );

    return sendReact404(req, res);
  }
};


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
      "React 404 rendering error:",
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