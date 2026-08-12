import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ProcedureBanner from "./ProcedureBanner";
import ProcedureOverview from "./ProcedureOverview";
import CTA from "./CTA";
import ProcedureFAQ from "./ProcedureFAQ";
import { useAuth } from "../../store/auth";
function ProcedurePage() {
  const { slug } = useParams();
const { API } = useAuth();
 

  const [procedure, setProcedure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // Remove Dynamic SEO Tags
  // =====================================
  const removeDynamicSeo = useCallback(() => {
    document
      .querySelectorAll("[data-dynamic-seo]")
      .forEach((el) => el.remove());
  }, []);

  // =====================================
  // Apply Dynamic SEO Head
  // =====================================
  const applySeoHead = useCallback(
    (seoHead) => {
      if (!seoHead) return;

      // Remove previous dynamic SEO tags
      removeDynamicSeo();

      const parser = new DOMParser();

      const doc = parser.parseFromString(
        `<head>${seoHead}</head>`,
        "text/html"
      );

      Array.from(doc.head.children).forEach((node) => {
        const tagName = node.tagName.toLowerCase();

        // Title
        if (tagName === "title") {
          const titleText = node.textContent?.trim();

          if (titleText) {
            document.title = titleText;
          }

          return;
        }

        // Other SEO tags
        const clone = node.cloneNode(true);

        clone.setAttribute("data-dynamic-seo", "true");

        document.head.appendChild(clone);
      });
    },
    [removeDynamicSeo]
  );

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
      setProcedure(null);

      const { data } = await axios.get(
        `${API}/api/procedures/slug/${slug}`
      );

      if (data?.success && data?.data) {
        // Only set data here
        // SEO will be applied after procedure state updates
        setProcedure(data.data);
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
  }, [fetchProcedure]);

  // =====================================
  // APPLY SEO WHEN PROCEDURE DATA ARRIVES
  // =====================================
  useEffect(() => {
    if (!procedure?.seo_head) {
      return;
    }

    // SEO is applied AFTER API data is available
    applySeoHead(procedure.seo_head);

    // Cleanup when procedure changes/unmounts
    return () => {
      removeDynamicSeo();
    };
  }, [
    procedure,
    applySeoHead,
    removeDynamicSeo,
  ]);

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
      <ProcedureBanner procedure={procedure} />

      <ProcedureOverview procedure={procedure} />

      <CTA pageData={procedure} />

      {procedure?.faq?.length > 0 && (
        <ProcedureFAQ faq={procedure.faq} />
      )}
    </>
  );
}

export default ProcedurePage;