import React, { useEffect, useState } from "react";
import "./BioMedicalReport.css";
import { Helmet } from "react-helmet";
import { useAuth } from "../../store/auth";

function BioMedicalReport() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Backend URL
  const BACKEND_URL = API?.replace("/api", "");

  return (
    <>
      <Helmet>
        <title>Bio Medical Reports | NEO Hospital</title>
      </Helmet>

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
