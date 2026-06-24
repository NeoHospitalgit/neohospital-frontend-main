import React from "react";
import "./Corevalue.css";

function Corevalue() {
  return (
    <section id="company-info" className="company-info-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="company-info-card">
              <h2 className="company-info-title">
                Company Information
              </h2>

              <p className="company-info-text">
                Neo Hospital is the brand name under which Muskan Medical Center
                Private Limited operates. Muskan Medical Center Private Limited
                is a company incorporated under the Companies Act, 2013
                (CIN: ______, GSTIN: ______), with its registered office at
                D-170, 170A, 170B, Sector-50, Noida, Gautam Buddh Nagar,
                Uttar Pradesh - 201301.
              </p>

              <p className="company-info-text mb-0">
                All medical and hospital services offered under the
                <strong> "Neo Hospital" </strong>
                brand are owned, managed, and operated by Muskan Medical Center
                Private Limited.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Corevalue;
