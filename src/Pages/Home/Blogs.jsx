import React from "react";
import "./Blog.css";
import BlogAll from "../OurBlog/BlogAll";
import BlogHome from "../OurBlog/BlogHome";
import { Link } from "react-router-dom";
function Blogs() {
  return (
    <>
      <section className="container NeoBlog">
        <div>
          <h3 className="dt-title">
            <span>Informative Blogs</span>
            <p className="dt-description">
              Our mission is to provide a better reach to our patients by
              providing quality health care at a reasonable price.
            </p>
          </h3>
        </div>
        <BlogHome />
        <div className="viewbutton">
          <Link to="/blog">
            <input type="button" className="btn" value="View all" />
          </Link>
          <i className="fa fa-toggle-right"></i>
        </div>
      </section>
    </>
  );
}

export default Blogs;
