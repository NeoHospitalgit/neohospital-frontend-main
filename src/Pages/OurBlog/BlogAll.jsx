import React, { useState, useEffect } from "react";
import "./OurBlog.css";
import BlogCard from "./BlogCard";
import { useAuth } from "../../store/auth";

function BlogAll() {
  const { API } = useAuth();

  const [neoblog, setNeoblog] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!API) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API}/api/blogs/view-blogs`,
          {
            method: "GET",
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              `Failed to fetch blogs (${response.status})`
          );
        }

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

        // Only active blogs on public website
        const activeBlogs = blogs.filter(
          (blog) => blog.blog_status === true
        );

        // Latest blogs first
        const sortedBlogs = [...activeBlogs].sort(
          (a, b) =>
            new Date(
              b.blog_date ||
                b.date ||
                b.created_at
            ) -
            new Date(
              a.blog_date ||
                a.date ||
                a.created_at
            )
        );

        if (!controller.signal.aborted) {
          setNeoblog(sortedBlogs);
        }

      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }

        console.error(
          "Error fetching blogs:",
          err
        );

        setError(
          err.message || "Unable to load blogs."
        );

      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [API]);

  // =====================================
  // Loading
  // =====================================

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading blogs...</p>
      </div>
    );
  }

  // =====================================
  // Error
  // =====================================

  if (error) {
    return (
      <div className="loader-container">
        <p style={{ color: "red" }}>
          Error loading blogs: {error}
        </p>

        <button
          onClick={() =>
            window.location.reload()
          }
        >
          Retry
        </button>
      </div>
    );
  }

  // =====================================
  // Empty
  // =====================================

  if (neoblog.length === 0) {
    return (
      <div className="loader-container">
        <p>No blogs found.</p>
      </div>
    );
  }

  // =====================================
  // Render
  // =====================================

  return (
    <div className="row">
      {neoblog.map((value, index) => (
        <div
          className="col-md-3"
          key={
            value._id ||
            value.id ||
            value.blog_id ||
            value.blog_slug ||
            index
          }
        >
          <BlogCard
            blogimage={
              value.blog_image
                ? `${API}/uploads/blogs/${value.blog_image}`
                : ""
            }
            title={value.blog_title}
            description={value.blog_content}
            blogslug={value.blog_slug}
            author={value.blog_auther}
            blogdate={value.blog_date}
          />
        </div>
      ))}
    </div>
  );
}

export default BlogAll;