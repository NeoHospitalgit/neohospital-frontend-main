import React from "react";
import BlogBanner from "./BlogBanner";
import "./OurBlog.css";
import Corevalue from "../About/Corevalue";
import BlogAll from "./BlogAll";
import { Blogseo } from "../SeoContent";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";

function OurBlog() {
  return (
    <>
      <Helmet>{parse(Blogseo.meetafamily)}</Helmet>
      <BlogBanner />
      <Corevalue />
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
        <BlogAll />
      </section>
    </>
  );
}

export default OurBlog;
