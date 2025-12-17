import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Profile.css";
import parse from "html-react-parser";
import axios from "axios";
import fallbackImage from "../../Assets/manpic.png";

// === Separate Appointment Form Component (THIS FIXES THE ISSUE) ===
const AppointmentForm = React.memo(({ doctorname, onClose }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [booktime, setBooktime] = useState("");
  const [bookdate, setBookdate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !number || !email || !booktime || !bookdate) {
      alert("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(number)) {
      alert("Please enter a valid Indian phone number.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.neohospital.com/api/sendmails/send-doctoremail",
        {
          name,
          number,
          email,
          booktime,
          message: message || "",
          doctorname,
          bookdate,
        }
      );

      if (response.status === 200) {
        setShowSuccessMessage(true);
        setName("");
        setNumber("");
        setEmail("");
        setBookdate("");
        setBooktime("");
        setMessage("");

        setTimeout(() => {
          setShowSuccessMessage(false);
          onClose();
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("Failed to submit appointment request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate.getDay() === 0) {
      alert("Doctor is not available on Sundays");
      setBookdate("");
    } else {
      setBookdate(e.target.value);
    }
  };

  return (
    <div className="appointment-modal">
      <div className="appointment-modal-content">
        <button className="close-modal" onClick={onClose}>
          ×
        </button>

        {showSuccessMessage && (
          <div className="success-notification" style={{ position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 9999 }}>
            <div className="success-content">
              <div className="success-icon">✅</div>
              <div>
                <h4>Appointment Request Submitted!</h4>
                <p>We'll contact you within 24 hours to confirm.</p>
              </div>
            </div>
          </div>
        )}

        <div className="appointment-card">
          <div className="card-header">
            <h3 className="appointment-title">
              <div className="title-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z" />
                </svg>
              </div>
              Book Appointment
            </h3>
            <p className="appointment-subtitle">Get personalized medical care</p>
          </div>

          <div className="appointment-note">
            <div className="note-icon">ℹ️</div>
            <p><strong>Quick Response:</strong> Your appointment will be confirmed within 24 hours after a callback.</p>
          </div>

          <form className="appointment-form" onSubmit={sendEmail}>
            <div className="form-group">
              <label className="form-label" htmlFor="full-name">Full Name <span className="required">*</span></label>
              <input id="full-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address <span className="required">*</span></label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number <span className="required">*</span></label>
              <input id="phone" type="tel" value={number} onChange={(e) => setNumber(e.target.value)} className="form-input" required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="preferred-date">Preferred Date <span className="required">*</span></label>
                <input id="preferred-date" type="date" value={bookdate} onChange={handleDateChange} min={today} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="preferred-time">Preferred Time <span className="required">*</span></label>
                <select id="preferred-time" value={booktime} onChange={(e) => setBooktime(e.target.value)} className="form-select" required>
                  <option value="">Select time slot</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message (Optional)</label>
              <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Any specific concerns or symptoms..." rows={3} className="form-textarea" />
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-btn">
              {isSubmitting ? (
                <>Submitting...</>
              ) : (
                <>Schedule Appointment</>
              )}
            </button>
          </form>

          <div className="contact-infoo">
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" />
                </svg>
              </div>
              <div>
                <div className="contact-label">Emergency Contact</div>
                <div className="contact-value">0120-4880000</div>
              </div>
            </div>
            <div className="availability-badge small">
              <div className="status-indicator small"></div>
              24/7 Available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

function Profile() {
  const [Neodoctor, setNeodoctor] = useState([]);
  const [error, setError] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const { dr } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.neohospital.com/api/adminv2/view-doctors/");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setNeodoctor(data.doctors || []);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, []);

  const doctor = useMemo(() => Neodoctor.find((d) => d.drSlug === dr), [Neodoctor, dr]);

  if (error) {
    return <div className="error-container">/* your error UI */</div>;
  }

  if (!doctor) {
    return <div className="loading-container">/* your loading UI */</div>;
  }

  const getDoctorDisplayName = () => doctor.drTitle.split(".")[1]?.trim() || doctor.drTitle;

  const formatQualification = (q) => q.split(",").map((qual, i) => <span key={i} className="qualification-tag">{qual.trim()}</span>);

  return (
    <div className="profile-page">
      <Helmet>
        <title>{doctor.drTitle} - Neo Hospital</title>
        <meta name="description" content={`Book appointment with ${doctor.drTitle}, ${doctor.drDepartment} at Neo Hospital.`} />
      </Helmet>

      {/* Success message moved inside form component */}

      <div className="doctor-profile-header">
        <div className="container">
          <div className="doctor-header-grid">
            <div className="doctor-image-container">
              <img src={`https://api.neohospital.com/uploads/doctors/${doctor.drImage}`} alt={doctor.drTitle} onError={(e) => (e.target.src = fallbackImage)} loading="lazy" />
            </div>
            <div className="doctor-info-container">
              <h1>{doctor.drTitle}</h1>
              <p className="specialty">{doctor.drDepartment}</p>
              <div className="qualifications">{formatQualification(doctor.drQualification)}</div>
              <p className="experience">{doctor.drExperience ? `${doctor.drExperience}+ years experience` : "Experienced Doctor"}</p>
              <button className="hero-appointment-btn" onClick={() => setShowAppointmentForm(true)}>
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="main-content">
        <div className="container">
          <section className="doctor-content">
            <div className="about-section">
              <h2 className="section-title">About {getDoctorDisplayName()}</h2>
              <div className="about-text">{parse(doctor.drDetail)}</div>
            </div>
          </section>
        </div>
      </main>

      {/* Modal - now stable because form is its own component */}
      {showAppointmentForm && (
        <AppointmentForm doctorname={doctor.drTitle} onClose={() => setShowAppointmentForm(false)} />
      )}
    </div>
  );
}

export default Profile;
