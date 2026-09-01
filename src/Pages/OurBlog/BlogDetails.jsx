import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";

import BlogBanner from "./BlogBanner";
import Corevalue from "../About/Corevalue";
import BlogCard from "./BlogCard";
import { useAuth } from "../../store/auth";
import NotFound from "../NotFound";
import "./OurBlog.css";

const BlogDetails = () => {
  const { API } = useAuth();
  const { blogs: blogSlug } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const { name, number, email, message } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!name || !number || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(number)) {
      alert("Please enter a valid Indian phone number.");
      return;
    }

    emailjs
      .sendForm(
        "service_mst5kgs",
        "template_qafkoxl",
        e.target,
        "L921BkCJFmULbhjBW"
      )
      .then(
        () => {
          alert("Your enquiry has been sent successfully!");
          setFormData({
            name: "",
            number: "",
            email: "",
            message: "",
          });
        },
        (err) => {
          console.error("EmailJS Error:", err);
          alert("Failed to send enquiry. Please try again later.");
        }
      );
  };

  useEffect(() => {
    if (!API || !blogSlug) return;

    const controller = new AbortController();

    const getBlogCategory = (item) => {
      const raw =
        item?.blog_category ||
        item?.blog_speciality ||
        item?.speciality ||
        item?.speciality_name ||
        item?.specialityName ||
        item?.category ||
        item?.category_name ||
        item?.categoryName ||
        item?.department ||
        item?.department_name ||
        item?.departmentName;

      if (raw && typeof raw === "object") {
        return (
          raw.title ||
          raw.name ||
          raw.category_name ||
          raw.speciality_name ||
          raw.slug ||
          ""
        );
      }

      return typeof raw === "string" ? raw.trim() : "";
    };

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        setRelatedBlogs([]);

        const response = await fetch(
          `${API}/api/blogs/view-blog/${encodeURIComponent(blogSlug)}`,
          {
            method: "GET",
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || `Failed to fetch blog (${response.status})`
          );
        }

        const currentBlog = data?.Blog;

        if (!currentBlog || currentBlog.blog_status !== true) {
          throw new Error("Blog not found");
        }

        const listResponse = await fetch(`${API}/api/blogs/view-blogs`, {
          method: "GET",
          signal: controller.signal,
        });

        const listData = await listResponse.json();

        if (!listResponse.ok) {
          throw new Error(
            listData?.message ||
              `Failed to fetch blogs (${listResponse.status})`
          );
        }

        let blogList = [];

        if (Array.isArray(listData)) {
          blogList = listData;
        } else if (Array.isArray(listData?.Blog)) {
          blogList = listData.Blog;
        } else if (Array.isArray(listData?.blogs)) {
          blogList = listData.blogs;
        } else if (Array.isArray(listData?.data)) {
          blogList = listData.data;
        }

        const currentCategory = getBlogCategory(currentBlog);

        // Related Articles:
        // same speciality/category, active only, current blog excluded,
        // latest first, maximum 4.
        const sameCategoryBlogs = blogList
          .filter((item) => {
            if (
              !item ||
              item.blog_status !== true ||
              item.blog_slug === currentBlog.blog_slug
            ) {
              return false;
            }

            if (!currentCategory) return false;

            const itemCategory = getBlogCategory(item);

            return (
              itemCategory &&
              itemCategory.toLowerCase() === currentCategory.toLowerCase()
            );
          })
          .sort(
            (a, b) =>
              new Date(
                b.blog_date || b.createdAt || b.created_at || 0
              ) -
              new Date(
                a.blog_date || a.createdAt || a.created_at || 0
              )
          )
          .slice(0, 4);

        if (!controller.signal.aborted) {
          setBlogs([currentBlog, ...blogList]);
          setRelatedBlogs(sameCategoryBlogs);
        }
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Blog Details API Error:", err);

        if (!controller.signal.aborted) {
          setError(err.message || "Unable to load blog.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();

    return () => controller.abort();
  }, [API, blogSlug]);

  const blog = blogs.find((item) => item?.blog_slug === blogSlug);

  // Latest Blogs:
  // Use every active blog returned by the API, exclude the current article,
  // and sort newest first. There is intentionally NO slice(0, 5).
  const latestBlogs = [...blogs]
    .filter(
      (item) =>
        item?.blog_status === true &&
        item?.blog_slug !== blogSlug
    )
    .sort(
      (a, b) =>
        new Date(
          b?.blog_date || b?.createdAt || b?.created_at || 0
        ) -
        new Date(
          a?.blog_date || a?.createdAt || a?.created_at || 0
        )
    );

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return <NotFound />;
  }

  const pageTitle = `${blog.blog_title} | NEO Hospital`;

  const metaDescription =
    blog.blog_meta_description ||
    `Read about ${blog.blog_title} at NEO Hospital, one of the Best Hospitals in Noida.`;

  const metaKeywords = blog.blog_meta_keywords || "NEO Hospital";

  const canonicalUrl =
    `https://www.neohospital.com/blog/${blog.blog_slug}`;

  const blogImage = blog.blog_image
    ? `${API}/uploads/blogs/${blog.blog_image}`
    : "";

  return (
    <>
      <Helmet>
        {blog.blog_seo && blog.blog_seo.trim() !== "" ? (
          parse(blog.blog_seo)
        ) : (
          <>
            <title>{pageTitle}</title>
            <meta name="title" content={pageTitle} />
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:type" content="article" />

            {blogImage && <meta property="og:image" content={blogImage} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={metaDescription} />

            {blogImage && (
              <meta name="twitter:image" content={blogImage} />
            )}

            <meta name="robots" content="index,follow" />
            <meta name="googlebot" content="index,follow" />
            <meta
              name="author"
              content={blog.blog_auther || "NEO Hospital"}
            />
          </>
        )}
      </Helmet>

      <BlogBanner />

      <section className="container NeoBlog">
        <h3 className="dt-title">
          <span>Informative Blogs</span>
          <p className="dt-description">
            Our mission is to provide better reach to our patients by
            providing quality health care at a reasonable price.
          </p>
        </h3>
      </section>

      <section className="container NeoBlogDetails blog_side_form">
        <div className="row">
          <div className="col-md-8">
            <main>
              {blogImage && (
                <img
                  src={blogImage}
                  alt={blog.blog_title}
                  className="img-fluid"
                  loading="eager"
                />
              )}

              <div className="author-info">
                <h6 className="author-name">
                  Author: {blog.blog_auther || "NEO Hospital"}
                </h6>
              </div>

              <h1 className="blogtitle">{blog.blog_title}</h1>

              <div className="description">
                {parse(blog.blog_content || "")}
              </div>
            </main>
          </div>

          <div className="col-md-4">
            <h3 className="dt-title">
              <span>Contact Us</span>
            </h3>

            <div className="blogform my-3">
              <form onSubmit={sendEmail}>
                <input
                  type="text"
                  className="form-control form-group input"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="tel"
                  className="form-control form-group input"
                  placeholder="Phone Number"
                  name="number"
                  value={number}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  className="form-control form-group input"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />

                <textarea
                  className="form-control form-group input"
                  placeholder="Message"
                  name="message"
                  value={message}
                  onChange={handleChange}
                  required
                ></textarea>

                <button type="submit" className="contact_form_submit">
                  Send
                </button>
              </form>
            </div>

            <br />
            <hr />
            <br />

            <aside>
              <h3 className="dt-title d-flex flex-row justify-content-between align-items-center">
                <span>Latest Blogs</span>

                <Link to="/blog">
                  View All
                  <i className="fa-solid fa-arrow-right-from-bracket mx-2"></i>
                </Link>
              </h3>

              <div
                className="sidebar my-5 latest-blogs-list"
                aria-label="Latest Blogs"
              >
                {latestBlogs.map((value) => (
                  <div
                    key={value._id || value.blog_slug}
                    className="card-body"
                  >
                    <h2>
                      <Link to={`/blog/${value.blog_slug}`}>
                        {value.blog_title}
                      </Link>
                    </h2>
                    <hr />
                  </div>
                ))}
              </div>
            </aside>
          </div>

          {/* Related Articles are intentionally full-width and placed
              after the article/sidebar row so they appear below the blog. */}
          <div className="col-md-12">
            {relatedBlogs.length > 0 && (
              <section
                className="related-articles"
                aria-labelledby="related-articles-title"
              >
                <div className="related-articles-heading">
                  <span className="related-articles-kicker">
                    You may also like
                  </span>

                  <h2 id="related-articles-title">
                    Related Articles
                  </h2>

                  <p>
                    More helpful articles from the same speciality.
                  </p>
                </div>

                <div className="row related-articles-grid">
                  {relatedBlogs.map((value, index) => (
                    <div
                      className="col-lg-4 col-md-6 col-12 related-article-col"
                      key={
                        value._id ||
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
              </section>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
