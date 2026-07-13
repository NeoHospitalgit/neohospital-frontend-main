import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaUserMd } from "react-icons/fa";
import "./Keyword.css";

function DoctorsSection({ doctors, API }) {
  return (
    <section className="doctor-section">
      <div className="container">

        <div className="section-heading">

          <span className="section-tag">
            Our Medical Experts
          </span>

          <h2>
            Meet Our Doctors
          </h2>

          <p>
            Our experienced specialists provide advanced diagnosis,
            personalized treatment, and compassionate healthcare.
          </p>

        </div>

        <div className="row">

          {doctors.map((doctor) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={doctor._id}
            >

              <div className="doctor-card">

                <div className="doctor-image">

                  <img
                    src={`${API}/uploads/doctors/${doctor.drImage}`}
                    alt={doctor.drTitle}
                  />

                </div>

                <div className="doctor-body">

                  <span className="doctor-speciality">
                    <FaUserMd />
                    Specialist
                  </span>

                  <h3>
                    {doctor.drTitle}
                  </h3>

                  <p className="qualification">
                    {doctor.drQualification}
                  </p>

                
                  <div className="doctor-buttons">

                    <a
                      href="/appointment"
                      className="book-btn"
                    >
                    
                      Book Appointment
                    </a>

                    <Link
                      to={`/doctor/${doctor.slug || doctor._id}`}
                      className="profile-btn"
                    >
                      View Profile
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default DoctorsSection;