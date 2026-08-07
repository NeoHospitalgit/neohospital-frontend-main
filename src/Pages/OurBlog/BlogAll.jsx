import React, { useState, useEffect } from "react";
import "./OurBlog.css";
import BlogCard from "./BlogCard";

function BlogAll() {
  const [neoblog, setNeoblog] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://api.neohospital.com/api/adminv3/view-blogs",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data (status ${response.status})`);
        }

        const data = await response.json();
      console.log("Blog API response:", data);

console.table(
  data.Blog.map(blog => ({
    title: blog.blog_title,
    status: blog.blog_status,
  }))
);
        // Support multiple possible response shapes defensively
        let blogs = [];
        if (Array.isArray(data)) {
          blogs = data;
        } else if (Array.isArray(data.Blog)) {
          blogs = data.Blog;
        } else if (Array.isArray(data.blogs)) {
          blogs = data.blogs;
        } else if (Array.isArray(data.data)) {
          blogs = data.data;
        } else {
          // fallback: find first array value inside the response object
          const firstArray = Object.values(data).find((v) => Array.isArray(v));
          blogs = firstArray || [];
        }

        const sortedBlogs = blogs.slice().sort(
          (a, b) =>
            new Date(b.blog_date || b.date || b.created_at) -
            new Date(a.blog_date || a.date || a.created_at)
        );

        if (mounted) {
          setNeoblog(sortedBlogs);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching blogs:", err);
          if (mounted) setError(err.message || "Unknown error");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  // Loader UI
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading blogs...</p>
      </div>
    );
  }

  // Error UI with retry
  if (error) {
    return (
      <div className="loader-container">
        <p style={{ color: "red" }}>Error loading blogs: {error}</p>
        <button
          onClick={() => {
            setLoading(true);
            setError(null);
            // simple retry by re-running effect: change state to force fetch
            // (a more robust approach would be to extract fetchData and call it directly)
            window.location.reload();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (!neoblog || neoblog.length === 0) {
    return (
      <div className="loader-container">
        <p>No blogs found.</p>
      </div>
    );
  }

  return (
    <div className="row">
      {neoblog.map((value, index) => {
        const key = value.id || value._id || value.blog_id || value.blog_slug || index;
        return (
          <div className="col-md-3" key={key}>
            <BlogCard
              blogimage={`https://api.neohospital.com/uploads/blogs/${value.blog_image}`}
              title={value.blog_title}
              description={value.blog_content}
              blogslug={value.blog_slug}
              author={value.blog_auther}
              blogdate={value.blog_date}
            />
          </div>
        );
      })}
    </div>
  );
}

export default BlogAll;
