import React, { useEffect, useState } from "react";
import "./BioMedicalReport.css";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
import { useAuth } from "../../store/auth";

function BioMedicalReport() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seo, setSeo] = useState(null);

  const { API } = useAuth();

  const fetchReports = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API}/api/adminv10/public-medical-reports`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message || "Failed to fetch Bio Medical Reports"
        );
      }

      setReports(data?.data || data?.biomedical || []);
    } catch (err) {
      console.error("Bio Medical Report Error:", err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (API) {
      fetchReports();
    }
  }, [API]);

  // =====================================
  // Fetch Bio Medical Report SEO
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

        const biomedicalSeo = Array.isArray(data?.header)
          ? data.header.find(
              (item) =>
                item?.page?.trim()?.toLowerCase() ===
                "bio-medical-report"
            )
          : null;

        if (!cancelled) {
          setSeo(biomedicalSeo || null);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Bio Medical Report SEO Error:",
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

  // Backend URL
  const BACKEND_URL = API?.replace("/api", "");

  return (
    <>
      {/* =====================================
          DYNAMIC BIO MEDICAL REPORT SEO
      ===================================== */}

      {seo?.tagdata && (
        <Helmet>
          {parse(seo.tagdata)}
        </Helmet>
      )}

      <section className="policies-section">

        <div className="policies-header">
          <h1 className="policies-title">
            Bio Medical Report
          </h1>

          <p className="policies-description">
            Our Bio Medical Reports reflect our commitment
            to excellence, transparency, and patient care.
          </p>
        </div>

        {loading ? (
          <div className="table-row">
            <div>Loading Reports...</div>
          </div>
        ) : (
          <div className="table">

            {/* Header */}
            <div className="table-header">
              <div>Reports</div>
              <div>Hospital</div>
              <div>Download</div>
            </div>

            {/* Rows */}
            {reports.length > 0 ? (
              reports.map((item) => (
                <div
                  className="table-row"
                  key={item._id}
                >

                  <div>
                    {item.reporttitle || "-"}
                  </div>

                  <div>
                    {item.hospital || "-"}
                  </div>

                  <div>
                    {item.image ? (
                      <button
                        type="button"
                        className="download-btn"
                        onClick={() =>
                          window.open(
                            `${BACKEND_URL}/uploads/report/${item.image}`,
                            "_blank"
                          )
                        }
                      >
                        ⬇
                      </button>
                    ) : (
                      "-"
                    )}
                  </div>

                </div>
              ))
            ) : (
              <div className="table-row">
                <div>No Reports Available</div>
              </div>
            )}

          </div>
        )}
      </section>
    </>
  );
}

export default BioMedicalReport;