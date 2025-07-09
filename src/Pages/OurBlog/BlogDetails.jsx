import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import parse from "html-react-parser";
import BlogBanner from "./BlogBanner";
import Corevalue from "../About/Corevalue";
import "./OurBlog.css";

const BlogDetails = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: ""
  });

  const { name, number, email, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !number || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate phone number format
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(number)) {
      alert("Please enter a valid Indian phone number.");
      return;
    }

    const YOUR_SERVICE_ID = "service_mst5kgs";
    const YOUR_TEMPLATE_ID = "template_qafkoxl";
    const YOUR_USER_ID = "L921BkCJFmULbhjBW";

    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, e.target, YOUR_USER_ID)
      .then(
        () => {
          alert("Your enquiry has been sent successfully!");
          setFormData({ name: "", number: "", email: "", message: "" });
        },
        () => {
          alert("Failed to send enquiry. Please try again later.");
        }
      );
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://api.neohospital.com/api/adminv3/view-blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        const sortedBlo = data.Blog.sort(
          (a, b) => new Date(b.blog_date) - new Date(a.blog_date)
        );

        setBlogs(sortedBlo);
      } catch (error) {
        setError(error);
      }
    };

    fetchBlogs();
  }, []);

  const { blogs: blogSlug } = useParams();
  const blog = blogs.find(({ blog_slug }) => blog_slug === blogSlug);

  // Generate meta description from blog content
  const getMetaDescription = (content) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.substring(0, 160).trim() + '...';
  };

  if (!blog) return <div>Blog not found</div>;

  const metaDescription = getMetaDescription(blog.blog_content);
  const blogImageUrl = `https://api.neohospital.com/uploads/blogs/${blog.blog_image}`;

  return (
    <>
      <Helmet>
        <title>{blog.blog_title} | Neo Hospital</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${blog.blog_title}, Neo Hospital, Healthcare, Medical Blog`} />
        <meta name="author" content="Neo Hospital" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={blog.blog_title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={blogImageUrl} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Neo Hospital" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.blog_title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={blogImageUrl} />
        
        {/* Article specific meta tags */}
        {blog.blog_date && <meta property="article:published_time" content={blog.blog_date} />}
        <meta property="article:author" content="Neo Hospital" />
        <meta property="article:section" content="Healthcare" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <section className="container NeoBlog">
        <h3 className="dt-title">
          <span>Informative Blogs</span>
          <p className="dt-description">
            Our mission is to provide better reach to our patients by providing quality health care at a reasonable price.
          </p>
        </h3>
      </section>

      <section className="container NeoBlogDetails  blog_side_form">
        <div className="row">
          <div className="col-md-8">
            <main>
              <img
                src={blogImageUrl}
                alt={blog.blog_title}
                className="img-fluid"
              />
              <h1 className="blogtitle">{blog.blog_title}</h1>
              <div className="description">{parse(blog.blog_content)}</div>
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
                <br></br>
                <button type="submit" className="contact_form_submit">
                  Send
                </button>
              </form>
            </div>
            <br></br>
            <hr />
            <br></br>

            <aside>
              <h3 className="dt-title d-flex flex-row justify-content-between align-items-center">
                <span>Blogs </span>
                <Link to="/blog">
                  View All<i className="fa-solid fa-arrow-right-from-bracket mx-2"></i>
                </Link>
              </h3>
              <div className="sidebar my-5">
                {blogs.slice(0, 15).map((value) => (
                  <div key={value.blog_slug} className="card-body">
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
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
