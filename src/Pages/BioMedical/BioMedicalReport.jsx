import React from "react";
import "./BioMedicalReport.css";
import { Helmet } from "react-helmet";

function BioMedicalReport() {
  const reports = [
   
   // {
   //    id: 1,
   //    title: "CORPORATE SOCIAL RESPONSIBILITY POLICY",
   //    hospital: "Our commitment to maintaining the highest standards of healthcare",
   //    file: "/pdfs/corporate.pdf"
   //  },
   //   {
   //    id: 2,
   //    title: "VIGIL MECHANISM POLICY",
   //    hospital: "A mechanism to report unethical behavior.",
   //    file: "/pdfs/vigil.pdf"
   //  },
   //   {
   //    id: 3,
   //    title: "ETHICS AT THE CODE",
   //    hospital: "Our commitment to ethical practices in all aspects of our operations.",
   //    file: "/pdfs/Li.pdf"
   //  },
  ];

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
          {reports.map((item) => (
            <div className="table-row" key={item.id}>
              <div>{item.title}</div>
              <div>{item.hospital}</div>
              <div>
                <button
                  className="download-btn"
                  onClick={() => window.open(item.file, "_blank")}
                >
                  ⬇
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default BioMedicalReport;
