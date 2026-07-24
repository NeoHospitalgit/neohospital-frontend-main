import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import "./Keyword.css";
import AppointmentModal from "../AppointmentModal/AppointmentModal";

function ExpertCTASection({ title, content , doctorname}) {
  return (
    <section className="expert-cta-section">
      <div className="container">

        <div className="expert-cta-box">

          <span className="expert-tag">
            Experts in Heart Care
          </span>

          <h2>{title}</h2>

          <div className="expert-content">
            {content && parse(content)}
          </div>
            <div className="cta-book-modal">
              <AppointmentModal
                buttonText="Book Appointment"
                doctorname={doctorname || title}
              />
            </div>
          

        </div>

      </div>
    </section>
  );
}

export default ExpertCTASection;
