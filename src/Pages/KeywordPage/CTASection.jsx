import React from "react";
import "./Keyword.css";

function CTASection() {
  return (
    <section className="cta-section">

      <div className="container">

        <div className="cta-box">

          <span className="cta-tag">
            Book Your Appointment
          </span>

          <h2>
            Need Expert Medical Consultation?
          </h2>

          <p>
            Our experienced specialists are available to provide
            advanced diagnosis and personalized treatment for every patient.
          </p>

          <div className="cta-buttons">

            <a
              href="/appointment"
              className="cta-book-btn"
            >
              📅 Book Appointment
            </a>

            <a
              href="tel:01204880088"
              className="cta-call-btn"
            >
              📞 Call Now
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTASection;