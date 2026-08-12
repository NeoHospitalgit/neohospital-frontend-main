import React, { useEffect, useState } from "react";
import Aboutus from "./Aboutus";
import Corevalue from "./Corevalue";
import Chooseus from "./Chooseus";
import { Aboutseo } from "../SeoContent";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
import './About.css';
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

        console.log(
          "Header API Response:",
          data
        );

        // =====================================
        // Find About SEO Record
        // =====================================

        const aboutSeo = Array.isArray(
          data?.header
        )
          ? data.header.find(
              (item) =>
                item?.page
                  ?.trim()
                  ?.toLowerCase() ===
                "about"
            )
          : null;

        console.log(
          "About SEO:",
          aboutSeo
        );

        if (!cancelled) {
          setSeo(aboutSeo || null);
        }

      } catch (error) {
        if (!cancelled) {
          console.error(
            "About SEO Error:",
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
          ABOUT PAGE CONTENT
      ===================================== */}
      
      {/* Video Hero Section */}
      <section className="video-hero">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay">
          {/* <p className="hero-subtitle">Compassionate Care, Advanced Technology</p> */}
        </div>
      </section>
      
      <Aboutus />
      <Chooseus />
    <Corevalue />
    </div>
  );
}

export default About;

