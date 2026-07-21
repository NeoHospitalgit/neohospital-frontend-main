import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import "./Keyword.css";

function ExpertCTASection({ title, content }) {
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

          <Link to="/appointment" className="expert-btn">
            Book Appointment
          </Link>

        </div>

      </div>
    </section>
  );
}

export default ExpertCTASection;