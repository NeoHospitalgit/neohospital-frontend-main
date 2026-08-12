import React from "react";
import "./Keyword.css";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import parse from "html-react-parser";

function CTASection({ title, content, doctorname }) {
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

           <div className="cta-book-modal">
              <AppointmentModal
                buttonText="Book Appointment"
                doctorname={doctorname || title}
              />
            </div>

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