import React from "react";
import "./Doctors.css";
import DoctorAll from "../MeetOurDoctor/DoctorAll";
import { Link } from "react-router-dom";
function Doctors() {
  return (
    <>
      <section className="container">
        <div className="doctor-section" id="doctors">
          <div className="dt-title-content">
            <div className="row">
              <div className="col-md-12">
                <div>
                  <h3 className="dt-title">
                    <span>Meet Our Doctors</span>
                    <p className="dt-description">
                      Join our team of compassionate healthcare providers at Neo
                      Hospital!
                    </p>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <DoctorAll />
          <div className="d-flex justify-content-center p-4">
            <Link to="/doctors">
              <input
                type="button"
                value="View More"
                className="btn btn-secondary w-20 text-appointment-btn"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Doctors;
