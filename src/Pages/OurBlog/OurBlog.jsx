import React, { useEffect, useState } from "react";
import BlogBanner from "./BlogBanner";
import "./OurBlog.css";
import Corevalue from "../About/Corevalue";
import BlogAll from "./BlogAll";
import { Blogseo } from "../SeoContent";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
import { useAuth } from "../../store/auth";

function OurBlog() {
  const { API } = useAuth();

  const [seo, setSeo] = useState(null);

  // =====================================
  // Fetch Blog SEO
  // =====================================

  useEffect(() => {
    if (!API) return;

    let cancelled = false;

    const fetchSeo = async () => {
      try {
        const response = await fetch(
          `${API}/api/header/view-header`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch header data: ${response.status}`
          );
        }

        const data = await response.json();

        console.log(
          "Header API Response:",
          data
        );

        // =====================================
        // Find About SEO Record
        // =====================================

        const blogSeo = Array.isArray(
          data?.header
        )
          ? data.header.find(
              (item) =>
                item?.page
                  ?.trim()
                  ?.toLowerCase() ===
                "blog"
            )
          : null;

        console.log(
          "Blog SEO:",
          blogSeo
        );

        if (!cancelled) {
          setSeo(blogSeo || null);
        }

      } catch (error) {
        if (!cancelled) {
          console.error(
            "Blog SEO Error:",
            error
          );

          setSeo(null);
        }
      }
    };

    fetchSeo();

    return () => {
      cancelled = true;
    };

  }, [API]);

  return (
    <>
      {seo?.tagdata && (
        <Helmet>
          {parse(seo.tagdata)}
        </Helmet>
      )}
      <BlogBanner />
      <Corevalue />
      <section className="container NeoBlog">
        <div>
          <h1 className="dt-title">
            <span>Informative Blogs</span>
            <p className="dt-description">
              Our mission is to provide a better reach to our patients by
              providing quality health care at a reasonable price.
            </p>
          </h1>
        </div>
        <BlogAll />
      </section>
    </>
  );
}

export default OurBlog;
