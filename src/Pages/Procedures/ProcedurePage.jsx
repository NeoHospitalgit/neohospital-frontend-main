import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ProcedureBanner from "./ProcedureBanner";
import ProcedureOverview from "./ProcedureOverview";
import CTA from "./CTA";
import ProcedureFAQ from "./ProcedureFAQ";

function ProcedurePage() {

  const { slug } = useParams();

   const API =
    process.env.REACT_APP_API_URL || "https://api.neohospital.com/api";

  const [procedure, setProcedure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // Apply Dynamic SEO Head
  // =====================================
  const applySeoHead = (seoHead) => {
  if (!seoHead) return;

  // Remove previously injected SEO tags
  document
    .querySelectorAll("[data-dynamic-seo]")
    .forEach((el) => el.remove());

  // Remove existing SEO tags to avoid duplicates
  document
    .querySelectorAll(`
      meta[name="description"],
      meta[name="keywords"],
      meta[property^="og:"],
      meta[name^="twitter:"],
      link[rel="canonical"],
      script[type="application/ld+json"]
    `)
    .forEach((el) => el.remove());

  const parser = new DOMParser();
  const doc = parser.parseFromString(
    `<head>${seoHead}</head>`,
    "text/html"
  );

  Array.from(doc.head.children).forEach((node) => {
    const clone = node.cloneNode(true);

    if (clone.tagName.toLowerCase() !== "title") {
      clone.setAttribute("data-dynamic-seo", "true");
      document.head.appendChild(clone);
    } else {
      document.title = clone.textContent;
    }
  });
};

  // =====================================
  // Fetch Procedure
  // =====================================
  const fetchProcedure = useCallback(async () => {

    if (!slug) {

      setLoading(false);
      setError("Invalid procedure URL.");

      return;

    }

    try {

      setLoading(true);
      setError("");

      const { data } = await axios.get(
        `${API}/adminv12/slug/${slug}`
      );

      if (data?.success && data?.data) {

        setProcedure(data.data);

        // Apply Complete SEO Head
        if (data.data.seo_head) {
          applySeoHead(data.data.seo_head);
        }

      } else {

        setProcedure(null);
        setError("Procedure not found.");

      }

    } catch (err) {

      console.error("Procedure Error:", err);

      setProcedure(null);

      setError(
        err?.response?.data?.message ||
        "Unable to load procedure."
      );

    } finally {

      setLoading(false);

    }

  }, [API, slug]);
    // =====================================
  // Load Procedure
  // =====================================
  useEffect(() => {

    fetchProcedure();

    return () => {
      // Remove injected SEO tags on page change
      document
        .querySelectorAll("[data-dynamic-seo]")
        .forEach((el) => el.remove());
    };

  }, [fetchProcedure]);

  // =====================================
  // Loading
  // =====================================
  if (loading) {

    return (
      <div className="container py-5 text-center">
        <h2>Loading...</h2>
      </div>
    );

  }

  // =====================================
  // Error
  // =====================================
  if (error) {

    return (
      <div className="container py-5 text-center">
        <h2>{error}</h2>
      </div>
    );

  }

  // =====================================
  // No Procedure Found
  // =====================================
  if (!procedure) {

    return (
      <div className="container py-5 text-center">
        <h2>No Procedure Found</h2>
      </div>
    );

  }

   // =====================================
  // Render Page
  // =====================================
  return (
    <>

      <ProcedureBanner
        procedure={procedure}
      />

      <ProcedureOverview
        procedure={procedure}
      />

      <CTA
        pageData={procedure}
      />

      {procedure?.faq?.length > 0 && (

        <ProcedureFAQ
          faq={procedure.faq}
        />

      )}

    </>
  );
}

export default ProcedurePage;
