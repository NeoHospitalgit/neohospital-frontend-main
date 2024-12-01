import React from "react";
// import Doctor from "../../Assets/doctor-book-appointment.png";
import neohospital from "../../Assets/index/Neohospital.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";

function BookAppointment() {
  const navigate = useNavigate();

  const handleBookAppointmentClick = () => {
    navigate("/contact");
  };

  return (
    <div className="ba-section">
      <div className="row">
        <div className="col-md-6 backimg">

        </div>
        <div className="col-md-6">
          <div className="ba-text-content">
            <h3 className="ba-title">
              <span>Why Choose Neo Hospital</span>
            </h3>
            <p className="ba-description">
              We believe in providing world-class services with more than 20
              specialties, all over Delhi NCR. Neo a multi-Specialty hospital
              with more than 250 beds with Specialist doctor.
            </p>

            <p className="ba-checks ba-check-first">
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: "#1E8FFD" }}
              />{" "}
              Best Professional Doctors
            </p>
            <p className="ba-checks">
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: "#1E8FFD" }}
              />{" "}
              Emergency Care
            </p>
            <p className="ba-checks">
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: "#1E8FFD" }}
              />{" "}
              24/7 Support
            </p>
            <p className="ba-checks ba-check-last">
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: "#1E8FFD" }}
              />{" "}
              Easy and Quick to Login
            </p>

            <button
              className="text-appointment-btn justify-content-center"
              type="button"
              onClick={handleBookAppointmentClick}
            >
              <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
            </button>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default BookAppointment;
