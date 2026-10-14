import React, { useEffect, useState } from "react";
import "./Career.css";
import CareerForm from "./CareerForm";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
import { useAuth } from "../../store/auth";

function Contact() {
  const { API } = useAuth();
  const [seo, setSeo] = useState(null);

  // =====================================
  // Fetch Career SEO
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

        const careerSeo = Array.isArray(data?.header)
          ? data.header.find(
              (item) =>
                item?.page?.trim()?.toLowerCase() ===
                "career"
            )
          : null;

        if (!cancelled) {
          setSeo(careerSeo || null);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Career SEO Error:", error);
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
      {/* =====================================
          DYNAMIC CAREER SEO
      ===================================== */}

      {seo?.tagdata && (
        <Helmet>
          {parse(seo.tagdata)}
        </Helmet>
      )}

      <CareerForm />
    </>
  );
}

export default Contact;