import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaPhoneAlt } from "react-icons/fa";
import "./ProcedureBanner.css";

// Replace with your banner image
import BannerImage from "../../Assets/prof.png";

function ProcedureBanner() {
  return (
    <section className="procedure-banner">

      <div className="container">

        {/* Breadcrumb */}
        <div className="procedure-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/procedures">Procedures</Link>
          <span>/</span>
          <strong>Knee Replacement Surgery</strong>
        </div>

        <div className="procedure-banner-wrapper">

          {/* Left Content */}
          <div className="procedure-banner-content">

            <span className="procedure-badge">
              NEO Hospital
            </span>

            <h1>
              Best Knee Replacement Surgery in Noida
            </h1>

          

            <div className="procedure-btns">

              <button className="book-btn">
                <FaCalendarCheck />
                Book Appointment
              </button>

              <a
                href="tel:+919268880303"
                className="call-btn"
              >
                <FaPhoneAlt />
                Call Now
              </a>

            </div>

          </div>

          {/* Right Image */}

          <div className="procedure-banner-image">

            <div className="circle-bg"></div>

            <img
              src={BannerImage}
              alt="Procedure Banner"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProcedureBanner;