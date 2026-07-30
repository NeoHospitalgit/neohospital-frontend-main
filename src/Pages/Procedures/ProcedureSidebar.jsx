import React, { useMemo, useState } from "react";
import axios from "axios";
import "./ProcedureSidebar.css";

function ProcedureSidebar({ procedure }) {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [number, setNumber] = useState("");

const [loading, setLoading] = useState(false);
const [showSuccessMessage, setShowSuccessMessage] = useState(false);

 const API =
    process.env.REACT_APP_API_URL || "https://api.neohospital.com/api";

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
const handleCallback = async (e) => {

  e.preventDefault();

  if (!name || !number) {
    alert("Please enter Name and Mobile Number.");
    return;
  }

  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(number)) {
    alert("Please enter valid mobile number.");
    return;
  }

  try {

    setLoading(true);
    const res = await axios.post(
      `${API}/api/sendmails/send-doctoremail`,
      {
        doctorname:
          procedure?.procedures_title ||
          "General Consultation",

        name,
        email,
        number,

        message: "Callback Request",

        bookdate: "",
        booktime: "",
      }
    );

    if (res.status === 200) {

      setShowSuccessMessage(true);

      setName("");
      setEmail("");
      setNumber("");

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2500);

    }

  } catch (err) {

  alert(err.response?.data?.message || "Unable to submit request.");

  } finally {

    setLoading(false);

  }

};
  return (
    <>
      {showSuccessMessage && (

    <div className="appointment-success">

      <div className="appointment-success-box">

        <h3>✅ Callback Request Sent</h3>

        <p>
          We'll contact you shortly.
        </p>

      </div>

    </div>

  )}
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

      <form className="callback-form" onSubmit={handleCallback} >

          <div className="form-group">
           <input
  type="text"
  placeholder="Your Name"
  value={name}
  onChange={(e)=>setName(e.target.value)}
  required
/>
          </div>

          <div className="form-group">
          <input
  type="tel"
  placeholder="Mobile Number"
  value={number}
  maxLength={10}
  onChange={(e)=>
    setNumber(
      e.target.value.replace(/\D/g,"")
    )
  }
  required
/>
          </div>

          <div className="form-group">
           <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
/>
          </div>

          <button
            type="submit"
            className="sidebar-btn"
            disabled={loading}
          >
          {loading ? "Submitting..." : "Request Callback"}
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
    </>
  );
}

export default ProcedureSidebar;
