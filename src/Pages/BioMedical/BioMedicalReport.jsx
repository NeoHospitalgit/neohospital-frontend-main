import React, { useEffect, useState } from "react";
import "./BioMedicalReport.css";
import { Helmet } from "react-helmet";
import { useAuth } from "../../store/auth";

function BioMedicalReport() {
  const [reports, setReports] = useState([]);
  const { API } = useAuth();

  // ================= FETCH DATA =================
  const fetchReports = async () => {
    try {
      const res = await fetch(
        `${API}/api/adminv10/manage-medical-report`
      );

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      setReports(data.biomedical || []);
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <>
      <Helmet>
        <title>Bio Medical Reports</title>
      </Helmet>

      <section className="policies-section">
        <div className="policies-header">
          <h1 className="policies-title">Bio Medical Report</h1>
          <p className="policies-description">
            Our Bio Medical Reports reflect our commitment to excellence,
            transparency, and patient care.
          </p>
        </div>

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
              <div className="table-row" key={item._id}>
                <div>{item.reporttitle}</div>

                <div>{item.hospital}</div>

                <div>
                  {item.image && (
                    <button
                      className="download-btn"
                      onClick={() =>
                        window.open(
                          `${API}/uploads/report/${item.image}`,
                          "_blank"
                        )
                      }
                    >
                      ⬇
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="table-row">
              <div colSpan="3">No Reports Available</div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default BioMedicalReport;
