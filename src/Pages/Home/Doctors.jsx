import React from "react";
import "./Doctors.css";
import DoctorAll from "../MeetOurDoctor/DoctorAll";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMd, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Doctors() {
  return (
    <section className="doctors-section" id="doctors">
      <div className="container">
        <div className="doctors-header">
          <div className="doctors-title-wrapper">
            <FontAwesomeIcon icon={faUserMd} className="doctors-icon" />
            <h2 className="doctors-title">Meet Our Specialists</h2>
          </div>
          <p className="doctors-subtitle">
            Experience exceptional care from our team of dedicated healthcare professionals
          </p>
        </div>

        <div className="doctors-content">
          <DoctorAll />
        </div>

        <div className="doctors-cta">
          <Link to="/doctors" className="view-all-doctors">
            View All Doctors
            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Doctors;
