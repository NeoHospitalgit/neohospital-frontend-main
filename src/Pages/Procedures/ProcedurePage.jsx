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

        document.title =
          data.data.seo_title ||
          data.data.procedures_title ||
          "NEO Hospital";

        let meta = document.querySelector(
          'meta[name="description"]'
        );

        if (!meta) {
          meta = document.createElement("meta");
          meta.name = "description";
          document.head.appendChild(meta);
        }

        meta.setAttribute(
          "content",
          data.data.meta_description || ""
        );
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

  useEffect(() => {
    fetchProcedure();
  }, [fetchProcedure]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!procedure) {
    return (
      <div className="container py-5 text-center">
        <h2>No Procedure Found</h2>
      </div>
    );
  }

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
