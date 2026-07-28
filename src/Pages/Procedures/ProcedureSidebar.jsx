import React, { useMemo, useState } from "react";
import "./ProcedureSidebar.css";

function ProcedureSidebar({ procedure }) {
  const [search, setSearch] = useState("");

  const API =
    process.env.REACT_APP_API_URL || "http://localhost:5001";

  // ==========================
  // Doctors
  // ==========================

  const doctors = useMemo(() => {
    return Array.isArray(procedure?.doctors)
      ? procedure.doctors
      : [];
  }, [procedure]);

 const filteredDoctors = doctors.filter((doctor) => {
  const doctorName =
    doctor?.drTitle ||
    doctor?.doctor_name ||
    doctor?.name ||
    "";

  return doctorName
    .toLowerCase()
    .includes(search.toLowerCase());
});

  // ==========================
  // Doctor Image
  // ==========================

  const getDoctorImage = (doctor) => {
  const image = doctor?.drImage || "";

  console.log("Doctor:", doctor);
  console.log("Doctor Image:", image);

  if (!image) {
    return "https://via.placeholder.com/90x90?text=Doctor";
  }

  // Already full URL
  if (image.startsWith("http")) {
    return image;
  }

  // If DB contains uploads/doctors/abc.webp
  if (image.startsWith("uploads")) {
    return `${API}/${image}`;
  }

  // If DB contains /uploads/doctors/abc.webp
  if (image.startsWith("/uploads")) {
    return `${API}${image}`;
  }

  // If DB contains only abc.webp
  return `${API}/uploads/doctors/${image}`;
};

  return (
    <div className="sticky-sidebar">

      {/* ================================= */}
      {/* Callback Form */}
      {/* ================================= */}

      <div className="sidebar-card">

        <div className="sidebar-titless">

          <span>Need Help?</span>

          <h3>
            Request a Call Back
          </h3>

          <p>
            Our healthcare advisor will contact you shortly.
          </p>

        </div>

        <form
          className="callback-form"
          onSubmit={(e) => e.preventDefault()}
        >

          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              placeholder="Mobile Number"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
            />
          </div>

          <button
            type="submit"
            className="sidebar-btn"
          >
            Request Callback
          </button>

          <p className="privacy">
            Your information is completely secure.
          </p>

        </form>

      </div>

      {/* ================================= */}
      {/* Department */}
      {/* ================================= */}

      {procedure?.department && (

        <div className="sidebar-card">

          <div className="sidebar-titless">

            <span>Department</span>

            <h3>
              {procedure.department.department_name ||
                procedure.department.name ||
                procedure.department.title}
            </h3>

          </div>

        </div>

      )}

      {/* ================================= */}
      {/* Doctors */}
      {/* ================================= */}

      <div className="sidebar-card">

        <div className="sidebar-titless">

          <span>Doctors</span>

          <h3>
            Our Specialists
          </h3>

        </div>
<input
  type="text"
  className="doctor-search"
  placeholder="Search Doctor..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<div className="doctor-list">

  {filteredDoctors.length > 0 ? (

    filteredDoctors.map((doctor) => {

      const doctorName =
        doctor?.drTitle ||
        doctor?.doctor_name ||
        doctor?.name ||
        "Doctor";

      const doctorDepartment =
        doctor?.drDepartment ||
        doctor?.designation ||
        doctor?.speciality ||
        doctor?.department?.department_name ||
        "";

      const doctorExperience =
        doctor?.drExperience ||
        doctor?.experience;

      return (

        <div
          className="doctor-item"
          key={doctor?._id}
        >

          {/* Doctor Image */}

          <div className="doctor-imagess">

            <img
            src={getDoctorImage(doctor)}
            alt={doctorName}
            onError={(e) => {
              console.log("Image Failed:", getDoctorImage(doctor));
              e.target.src = "https://via.placeholder.com/90x90?text=Doctor";
            }}
          />

          </div>

          {/* Doctor Details */}

          <div className="doctor-content">

            <h4>{doctorName}</h4>

            {doctorDepartment && (
              <p>{doctorDepartment}</p>
            )}

            {doctorExperience && (
              <span>
                {doctorExperience} Years Experience
              </span>
            )}

            {doctor?.drQualification && (
              <p className="doctor-qualification">
                {doctor.drQualification}
              </p>
            )}

          </div>

        </div>

      );

    })

  ) : (

    <div className="no-doctor">
      <p>No doctors available.</p>
    </div>

  )}

</div>

      </div>

      {/* ================================= */}
      {/* Contact */}
      {/* ================================= */}

      <div className="sidebar-card">

        <div className="sidebar-titless">

          <span>Need Immediate Help?</span>

          <h3>
            Contact NEO Hospital
          </h3>

        </div>

        <ul className="contact-list">

          <li>
            📞{" "}
            <a href="tel:0120-4880088">
              
                0120-4880088
            </a>
          </li>

          <li>
            ✉️{" "}
            <a href="mailto:info@neohospital.com">
              info@neohospital.com
            </a>
          </li>

          <li>
            📍 Noida, Uttar Pradesh
          </li>

        </ul>

      </div>

    </div>
  );
}

export default ProcedureSidebar;