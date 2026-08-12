import React from "react";
import { Link } from "react-router-dom";
import { FaUserMd } from "react-icons/fa";
import parse from "html-react-parser";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import "./Keyword.css";

function DoctorsSection({
  doctors = [],
  API,
  teamTitle,
  teamContent,
  doctorname,
}) {
  return (
    <section className="doctor-section">
      <div className="container">

        {/* Section Heading */}
        <div className="section-heading">
          <span className="section-tag">
            Our Team
          </span>

          <h2>
            {teamTitle || `Meet Our ${doctorname || "Specialists"}`}
          </h2>

          {teamContent && (
            <div className="section-content">
              {parse(teamContent)}
            </div>
          )}
        </div>

        {/* Doctor Cards */}
        <div className="row">
          {doctors && doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div
                className="col-lg-4 col-md-6 mb-4"
                key={doctor._id}
              >
                <div className="doctor-card">

                  <div className="doctor-image">
                    <img
                      src={
                        doctor.drImage
                          ? `${API}/uploads/doctors/${doctor.drImage}`
                          : "/images/default-doctor.png"
                      }
                      alt={doctor.drTitle}
                      loading="lazy"
                    />
                  </div>

                  <div className="doctor-body">

                    <span className="doctor-speciality">
                      <FaUserMd />
                      Specialist
                    </span>

                    <h3>{doctor.drTitle}</h3>

                    {doctor.drQualification && (
                      <p className="qualification">
                        {doctor.drQualification}
                      </p>
                    )}

                    <div className="doctor-buttons">
                      {/* <AppointmentModal
                        buttonText="Book Appointment"
                        doctorname={doctor.drTitle}
                      /> */}

                      <Link
                        to={`/doctor-details/${doctor.drSlug || doctor._id}`}
                        className="profile-btn"
                      >
                        View Profile
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center py-5">
                <h4>No Doctors Available</h4>
                <p>
                  Our specialist information will be updated soon.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default DoctorsSection;