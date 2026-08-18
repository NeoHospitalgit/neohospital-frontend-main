import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";

import BlogBanner from "./BlogBanner";
import Corevalue from "../About/Corevalue";
import { useAuth } from "../../store/auth";
import NotFound from "../NotFound";
import "./OurBlog.css";

const BlogDetails = () => {
  const { API } = useAuth();
  const { blogs: blogSlug } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const {
    name,
    number,
    email,
    message,
  } = formData;

  // =====================================
  // Form Change
  // =====================================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =====================================
  // Send Enquiry
  // =====================================

  const sendEmail = (e) => {
    e.preventDefault();

    // Validate fields
    if (
      !name ||
      !number ||
      !email ||
      !message
    ) {
      alert("Please fill out all fields.");
      return;
    }

    // Validate email
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert(
        "Please enter a valid email address."
      );
      return;
    }

    // Validate phone
    const phoneRegex =
      /^[6-9]\d{9}$/;

    if (!phoneRegex.test(number)) {
      alert(
        "Please enter a valid Indian phone number."
      );
      return;
    }

    const YOUR_SERVICE_ID =
      "service_mst5kgs";

    const YOUR_TEMPLATE_ID =
      "template_qafkoxl";

    const YOUR_USER_ID =
      "L921BkCJFmULbhjBW";

    emailjs
      .sendForm(
        YOUR_SERVICE_ID,
        YOUR_TEMPLATE_ID,
        e.target,
        YOUR_USER_ID
      )
      .then(
        () => {
          alert(
            "Your enquiry has been sent successfully!"
          );

          setFormData({
            name: "",
            number: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          console.error(
            "EmailJS Error:",
            error
          );

          alert(
            "Failed to send enquiry. Please try again later."
          );
        }
      );
  };

  // =====================================
  // Fetch Public Blogs
  // =====================================

  useEffect(() => {
    if (!API) {
      return;
    }

    const controller =
      new AbortController();

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        // IMPORTANT:
        // Public API - No admin API here
        const response = await fetch(
          `${API}/api/blogs/view-blogs`,
          {
            method: "GET",
            signal: controller.signal,
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              `Failed to fetch blogs (${response.status})`
          );
        }

        // =====================================
        // Handle API Response
        // =====================================

        let blogList = [];

        if (Array.isArray(data)) {
          blogList = data;
        } else if (
          Array.isArray(data.Blog)
        ) {
          blogList = data.Blog;
        } else if (
          Array.isArray(data.blogs)
        ) {
          blogList = data.blogs;
        } else if (
          Array.isArray(data.data)
        ) {
          blogList = data.data;
        }

        // =====================================
        // Only Active Blogs
        // =====================================

        const activeBlogs =
          blogList.filter(
            (blog) =>
              blog.blog_status === true
          );

        // =====================================
        // Sort Latest First
        // =====================================

        const sortedBlogs =
          [...activeBlogs].sort(
            (a, b) =>
              new Date(
                b.blog_date ||
                  b.created_at
              ) -
              new Date(
                a.blog_date ||
                  a.created_at
              )
          );

        if (!controller.signal.aborted) {
          setBlogs(sortedBlogs);
        }

      } catch (error) {
        if (
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Blog Details API Error:",
          error
        );

        setError(
          error.message ||
            "Unable to load blogs."
        );

      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();

    return () => {
      controller.abort();
    };
  }, [API]);

  // =====================================
  // Find Current Blog
  // =====================================

  const blog = blogs.find(
    (item) =>
      item.blog_slug === blogSlug
  );

  // =====================================
  // Loading
  // =====================================
if (loading) {
  return (
    <div className="loading-spinner-container">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">
          Loading...
        </span>
      </div>
    </div>
  );
}

if (error || !blog) {
  return <NotFound />;
}

  // =====================================
  // API Error
  // =====================================

  if (error) {
    return (
      <div className="loader-container">
        <p style={{ color: "red" }}>
          Error loading blog: {error}
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
  // Blog Not Found
  // =====================================

  if (!blog) {
    return (
      <div className="loader-container">
        <p>
          Blog not found.
        </p>
      </div>
    );
  }

  // =====================================
  // SEO Data
  // =====================================

  const pageTitle =
    `${blog.blog_title} | NEO Hospital`;

  const metaDescription =
    blog.blog_meta_description ||
    `Read about ${blog.blog_title} at NEO Hospital, one of the Best Hospitals in Noida.`;

  const metaKeywords =
    blog.blog_meta_keywords ||
    "NEO Hospital";

  const canonicalUrl =
    `https://www.neohospital.com/blog/${blog.blog_slug}`;

  // =====================================
  // Blog Image
  // =====================================

  const blogImage = blog.blog_image
    ? `${API}/uploads/blogs/${blog.blog_image}`
    : "";

  return (
    <>
      {/* =====================================
          DYNAMIC SEO
      ===================================== */}

      <Helmet>
        {blog.blog_seo &&
        blog.blog_seo.trim() !== "" ? (
          parse(blog.blog_seo)
        ) : (
          <>
            <title>
              {pageTitle}
            </title>

            <meta
              name="title"
              content={pageTitle}
            />

            <meta
              name="description"
              content={metaDescription}
            />

            <meta
              name="keywords"
              content={metaKeywords}
            />

            <link
              rel="canonical"
              href={canonicalUrl}
            />

            {/* Open Graph */}

            <meta
              property="og:title"
              content={pageTitle}
            />

            <meta
              property="og:description"
              content={metaDescription}
            />

            <meta
              property="og:url"
              content={canonicalUrl}
            />

            <meta
              property="og:type"
              content="article"
            />

            {blogImage && (
              <meta
                property="og:image"
                content={blogImage}
              />
            )}

            {/* Twitter */}

            <meta
              name="twitter:card"
              content="summary_large_image"
            />

            <meta
              name="twitter:title"
              content={pageTitle}
            />

            <meta
              name="twitter:description"
              content={metaDescription}
            />

            {blogImage && (
              <meta
                name="twitter:image"
                content={blogImage}
              />
            )}

            {/* Robots */}

            <meta
              name="robots"
              content="index,follow"
            />

            <meta
              name="googlebot"
              content="index,follow"
            />

            <meta
              name="author"
              content={
                blog.blog_auther ||
                "NEO Hospital"
              }
            />
          </>
        )}
      </Helmet>

      {/* =====================================
          BLOG BANNER
      ===================================== */}

      <BlogBanner />

      {/* =====================================
          BLOG INTRO
      ===================================== */}

      <section className="container NeoBlog">
        <h3 className="dt-title">
          <span>
            Informative Blogs
          </span>

          <p className="dt-description">
            Our mission is to provide
            better reach to our patients
            by providing quality health
            care at a reasonable price.
          </p>
        </h3>
      </section>

      {/* =====================================
          BLOG DETAILS
      ===================================== */}

      <section className="container NeoBlogDetails blog_side_form">

        <div className="row">

          {/* =====================================
              MAIN BLOG
          ===================================== */}

          <div className="col-md-8">

            <main>

              {/* Blog Image */}

              {blogImage && (
                <img
                  src={blogImage}
                  alt={
                    blog.blog_title
                  }
                  className="img-fluid"
                  loading="eager"
                />
              )}

              {/* Author */}

              <div className="author-info">
                <h6 className="author-name">
                  Author:{" "}
                  {blog.blog_auther ||
                    "NEO Hospital"}
                </h6>
              </div>

              {/* Blog Title */}

              <h1 className="blogtitle">
                {blog.blog_title}
              </h1>

              {/* Blog Content */}

              <div className="description">
                {parse(
                  blog.blog_content ||
                    ""
                )}
              </div>

            </main>

          </div>

          {/* =====================================
              SIDEBAR
          ===================================== */}

          <div className="col-md-4">

            {/* Contact */}

            <h3 className="dt-title">
              <span>
                Contact Us
              </span>
            </h3>

            <div className="blogform my-3">

              <form
                onSubmit={sendEmail}
              >

                {/* Name */}

                <input
                  type="text"
                  className="form-control form-group input"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={
                    handleChange
                  }
                  required
                />

                {/* Phone */}

                <input
                  type="tel"
                  className="form-control form-group input"
                  placeholder="Phone Number"
                  name="number"
                  value={number}
                  onChange={
                    handleChange
                  }
                  required
                />

                {/* Email */}

                <input
                  type="email"
                  className="form-control form-group input"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={
                    handleChange
                  }
                  required
                />

                {/* Message */}

                <textarea
                  className="form-control form-group input"
                  placeholder="Message"
                  name="message"
                  value={message}
                  onChange={
                    handleChange
                  }
                  required
                ></textarea>

                <br />

                <button
                  type="submit"
                  className="contact_form_submit"
                >
                  Send
                </button>

              </form>

            </div>

            <br />

            <hr />

            <br />

            {/* =====================================
                RELATED BLOGS
            ===================================== */}

            <aside>

              <h3 className="dt-title d-flex flex-row justify-content-between align-items-center">

                <span>
                  Blogs
                </span>

                <Link to="/blog">
                  View All
                  <i className="fa-solid fa-arrow-right-from-bracket mx-2"></i>
                </Link>

              </h3>

              <div className="sidebar my-5">

                {blogs
                  .filter(
                    (item) =>
                      item.blog_slug !==
                      blog.blog_slug
                  )
                  .slice(0, 15)
                  .map(
                    (value) => (

                      <div
                        key={
                          value._id ||
                          value.blog_slug
                        }
                        className="card-body"
                      >

                        <h2>

                          <Link
                            to={`/blog/${value.blog_slug}`}
                          >
                            {
                              value.blog_title
                            }
                          </Link>

                        </h2>

                        <hr />

                      </div>

                    )
                  )}

              </div>

            </aside>

          </div>

        </div>

      </section>
    </>
  );
};

export default BlogDetails;