import React, { useState, useEffect } from "react";
import "./OurBlog.css";
import BlogCard from "./BlogCard";
import { useAuth } from "../../store/auth";

function BlogHome() {
  const { API } = useAuth();

  const [neoblog, setNeoblog] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!API) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API}/api/blogs/view-blogs`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Failed to fetch blogs"
          );
        }

        let blogs = [];

        if (Array.isArray(data.Blog)) {
          blogs = data.Blog;
        } else if (Array.isArray(data.blogs)) {
          blogs = data.blogs;
        } else if (Array.isArray(data.data)) {
          blogs = data.data;
        } else if (Array.isArray(data)) {
          blogs = data;
        }

        const activeBlogs = blogs.filter(
          (blog) =>
            blog.blog_status === true
        );

        const sortedBlogs = [...activeBlogs].sort(
          (a, b) =>
            new Date(b.blog_date) -
            new Date(a.blog_date)
        );

        setNeoblog(sortedBlogs);

      } catch (error) {
        console.error(
          "Blog Home API Error:",
          error
        );

        setError(error);

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API]);

  if (loading) {
    return (
      <div className="loader-container">
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loader-container">
        <p>
          Error loading blogs:{" "}
          {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="row">
      {neoblog.slice(0, 4).map(
        (value, index) => (
          <div
            className="col-md-3"
            key={
              value._id ||
              value.id ||
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
              description={
                value.blog_content
              }
              blogslug={
                value.blog_slug
              }
              author={
                value.blog_auther
              }
              blogdate={
                value.blog_date
              }
            />
          </div>
        )
      )}
    </div>
  );
}

export default BlogHome;