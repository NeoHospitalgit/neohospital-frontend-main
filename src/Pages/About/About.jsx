import React, { useEffect, useState } from "react";
import Aboutus from "./Aboutus";
import Corevalue from "./Corevalue";
import Chooseus from "./Chooseus";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
import "./About.css";
import { useAuth } from "../../store/auth";

function About() {
  const { API } = useAuth();

  const [seo, setSeo] = useState(null);

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

        // Find About SEO Record
        const aboutSeo = Array.isArray(data?.header)
          ? data.header.find(
              (item) =>
                item?.page?.trim()?.toLowerCase() === "about"
            )
          : null;

        if (!cancelled) {
          setSeo(aboutSeo || null);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("About SEO Error:", error);
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
    <div className="about-container">

      {/* =====================================
          ABOUT SEO
      ===================================== */}
      {seo?.tagdata && (
        <Helmet>
          {parse(seo.tagdata)}
        </Helmet>
      )}

      {/* =====================================
          ABOUT BANNER
      ===================================== */}
      <section className="about-banner">
        <img
          src="/abouts.webp"
          alt="About NEO Hospital"
          className="about-banner-image"
         width="1920" height="600" />
      </section>

      {/* =====================================
          ABOUT PAGE CONTENT
      ===================================== */}
      <Aboutus />

      <Chooseus />

      <Corevalue />

    </div>
  );
}

export default About;