import React from "react";
import { Link } from "react-router-dom";
// import InformationCard from "./InformationCard";
// import { faHeartPulse, faTruckMedical, faTooth } from "@fortawesome/free-solid-svg-icons";
import "./Info.css";
import Specialty from "./Specialty";
function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <div className="row">
          <div className="col-md-5">
            <h3 className="info-title">
              <span>OUR SPECIALITY DEPARTMENTS</span>
              <div className="services container">
                <div>
                  <i className="fa fa-ambulance"></i>
                  <i className="fa fa-h-square"></i>
                  <i className="fa fa-medkit"></i>
                  <i className="fa fa-user-md"></i>
                  <i className="fa fa-wheelchair"></i>
                  <i className="fa fa-heartbeat"></i>
                  <br />
                </div>
              </div>
            </h3>
          </div>
          <div className="col-md-7">
            <p className="info-description">
              At Neo Super Speciality Hospital, excellence is our tradition. Explore our
              specialized departments, including Neurology, Cardiology,
              Orthopedics, and Women's Health. Our expert teams are committed to
              providing unparalleled care for your well-being.
            </p>
          </div>
        </div>
      </div>
      <Specialty /> 
    </div>
  );
}

export default Info;
