import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";

function BookAppointment() {
  const navigate = useNavigate();

  return (
    <section className="ba-section">
      <div className="container">
        <div className="ba-wrapper">
          <div className="ba-video-container">
            <img 
              src="/images/neo.jpg" 
              alt="Neo Hospital" 
              className="background-image"
            />
            <div className="video-overlay"></div>
          </div>

          <div className="ba-content">
            <div className="ba-text-content">
              <h3 className="ba-title">
                <span>Why Choose Neo Hospital</span>
              </h3>
              <p className="ba-description">
                Experience excellence in healthcare at Neo Hospital. Our state-of-the-art 
                facility combines cutting-edge technology with compassionate care, 
                featuring over 20 specialties and 250+ beds across Delhi NCR.
              </p>

              <div className="features-grid">
                <div className="feature-item">
                  <FontAwesomeIcon icon={faCircleCheck} className="feature-icon" />
                  <span>Best Professional Doctors</span>
                </div>
                <div className="feature-item">
                  <FontAwesomeIcon icon={faCircleCheck} className="feature-icon" />
                  <span>24/7 Emergency Care</span>
                </div>
                <div className="feature-item">
                  <FontAwesomeIcon icon={faCircleCheck} className="feature-icon" />
                  <span>Round-the-clock Support</span>
                </div>
                <div className="feature-item">
                  <FontAwesomeIcon icon={faCircleCheck} className="feature-icon" />
                  <span>Quick & Easy Appointments</span>
                </div>
              </div>

              <button
                className="appointment-btn"
                type="button"
                onClick={() => navigate("/contact")}
              >
                <FontAwesomeIcon icon={faCalendarCheck} /> 
                Book Your Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookAppointment;
