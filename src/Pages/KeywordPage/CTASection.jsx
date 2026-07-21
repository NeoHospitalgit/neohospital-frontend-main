import React from "react";
import "./Keyword.css";
import parse from "html-react-parser";

function CTASection({ title, content }) {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box">

          <span className="cta-tag">
            Book Your Appointment
          </span>

          <h2>{title}</h2>

          <div className="cta-content">
            {content && parse(content)}
          </div>

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
