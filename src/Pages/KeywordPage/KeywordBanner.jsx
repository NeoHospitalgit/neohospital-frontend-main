import React from "react";
import { Link } from "react-router-dom";
import "./Keyword.css";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
function KeywordBanner({ title, direction, image , doctorname }) {
  return (
    <section
      className="keyword-banner"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="keyword-overlay">
        <div className="container">

          <div className="row align-items-center">

            {/* Left Content */}
            <div className="col-lg-7">

              <div className="keyword-breadcrumb">
                <Link to="/">Home</Link>
                <span> / </span>
                <span>Doctors</span>
                <span> / </span>
                <span>{title}</span>
              </div>

              <h1 className="keyword-title">
                {title}
              </h1>

              <p className="keyword-subtitle">
               {direction}
              </p>

              <div className="keyword-rating">
                <span className="stars">⭐⭐⭐⭐⭐</span>
                <span>Trusted by Thousands of Patients</span>
              </div>

         <div className="keyword-btns">

              <AppointmentModal
                buttonText="Book Appointment"
                doctorname={doctorname || title}
              />

            <a
              href="tel:01204880088"
              className="btn btn-outline-light"
            >
              📞 Call Now
            </a>

          </div>

            </div>

            {/* Right Contact Card */}

            <div className="col-lg-5 d-none d-lg-flex justify-content-end">

              <div className="keyword-contact-card">

                <h3>Emergency Contact</h3>

                <div className="contact-item">
                  <div className="icon-box">
                    📞
                  </div>

                  <div>
                    <strong>Reception</strong>
                    <p>0120-4880088</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="icon-box">
                    🚑
                  </div>

                  <div>
                    <strong>Emergency</strong>
                    <p>0120-3120000</p>
                  </div>
                </div>

                <hr />

                <h3>Hospital Hours</h3>

                <div className="contact-item">

                  <div className="icon-box">
                    🕒
                  </div>

                  <div>
                    <strong>Open</strong>
                    <p>24×7 Services Available</p>
                  </div>

                </div>

                <div className="contact-buttons">

                  <Link
                    to="/doctors"
                    className="btn btn-primary"
                  >
                    Find a Doctor
                  </Link>

                  <Link
                    to="/specialities"
                    className="btn btn-primary"
                  >
                    Our Services
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default KeywordBanner;