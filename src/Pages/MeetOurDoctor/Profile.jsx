import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";
import parse from "html-react-parser";
import axios from 'axios';
import fallbackImage from "../../Assets/manpic.png";

function Profile() {
  const [Neodoctor, setNeodoctor] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [booktime, setBooktime] = useState("");
  const [bookdate, setBookdate] = useState("");
  const [doctorname, setDoctorname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.neohospital.com/api/adminv2/view-doctors/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setNeodoctor(data.doctors);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const { dr } = useParams();
  const doctor = Neodoctor.find((value) => value.drSlug === dr);

  useEffect(() => {
    if (doctor) {
      setDoctorname(doctor.drTitle);
    }
  }, [doctor]);

  if (!doctor) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading doctor information...</p>
      </div>
    );
  }

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !number || !email || !booktime || !bookdate) {
      window.alert("Please fill out all fields.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.alert("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(number)) {
      window.alert("Please enter a valid Indian phone number.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('https://api.neohospital.com/api/sendmails/send-doctoremail', {
        name,
        number,
        email,
        booktime,
        message,
        doctorname,
        bookdate
      });

      if (response.status === 200) {
        alert('Appointment request submitted successfully!');
        setName("");
        setNumber("");
        setEmail("");
        setBookdate("");
        setBooktime("");
        setMessage("");
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Failed to submit appointment request. Please try again.');
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
    <div className="profile-page">
      {/* Header Section */}
      <header className="profile-header">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <span>Home</span>
            <span className="separator">→</span>
            <span>Doctors</span>
            <span className="separator">→</span>
            <span className="current">{doctor.drTitle}</span>
          </nav>
          
          <div className="header-content">
            {/* Doctor Photo - Left Side */}
            <div className="doctor-photo-container">
              <div className="doctor-photo">
                {doctor.drImage ? (
                  <img 
                    src={`https://api.neohospital.com/uploads/doctors/${doctor.drImage}`} 
                    alt={`${doctor.drTitle}`} 
                    loading="lazy"
                  />
                ) : (
                  <img src={fallbackImage} alt="Doctor" loading="lazy" />
                )}
                <div className="availability-badge">Available Today</div>
              </div>
            </div>

            {/* Doctor Info - Right Side */}
            <div className="doctor-info">
              <h1 className="doctor-name">{doctor.drTitle}</h1>
              
              <div className="doctor-rating">
                
              </div>
              
              <div className="doctor-details">
                <div className="detail-item">
                  <span className="icon">🎓</span>
                  <span>{doctor.drQualification}</span>
                </div>
                <div className="detail-item">
                  <span className="icon">🏆</span>
                  <span>{doctor.drDepartment}</span>
                </div>
                
                <div className="detail-item">
                  <span className="icon">📍</span>
                  <span>Neo Super-Speciality Hospital</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container main-content">
      <div className="content-grid" style={{ gridTemplateColumns: '60% 1fr' }}>
          {/* Doctor Details - Left Side */}
          <section className="doctor-content">
            <div className="about-section">
              <h2 className="section-title">
                <span className="icon">🏆</span>
                About {doctor.drTitle.split('.')[1]?.trim() || doctor.drTitle}
              </h2>
              <div className="about-text">
                {parse(doctor.drDetail)}
              </div>
            </div>

            <div className="info-cards">
              <div className="info-card">
                <h3 className="card-title">
                  <span className="icon">🎓</span>
                  Education & Qualifications
                </h3>
                <div className="card-content">
                  <div className="qualification-item">• {doctor.drQualification}</div>
                  <div className="qualification-item">• Specialized Training in {doctor.drDepartment}</div>
                 
                </div>
              </div>

              
            </div>
          </section>

          {/* Appointment Form - Right Side */}
          <aside className="appointment-sidebar">
            <div className="appointment-card">
              <h3 className="appointment-title">
                <span className="icon">📅</span>
                Book Appointment
              </h3>
              
              <div className="appointment-note">
                <p><strong>Note:</strong> Your appointment will be confirmed within 24 hours after a callback from our team.</p>
              </div>

              <div className="appointment-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">Full Name</label>
                  <input
                    id="full-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="form-input"
                    aria-required="true"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="preferred-date">Preferred Date</label>
                    <input
                      id="preferred-date"
                      type="date"
                      value={bookdate}
                      onChange={handleDateChange}
                      className="form-input"
                      aria-required="true"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="preferred-time">Preferred Time</label>
                    <select
                      id="preferred-time"
                      value={booktime}
                      onChange={(e) => setBooktime(e.target.value)}
                      className="form-select"
                      aria-required="true"
                    >
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
                  <label className="form-label" htmlFor="message">Additional Message (Optional)</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Any specific concerns or requirements..."
                    rows={3}
                    className="form-textarea"
                  />
                </div>

                <button
                  onClick={sendEmail}
                  disabled={isSubmitting}
                  className="submit-btn"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner small"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span className="icon">📅</span>
                      Schedule Appointment
                    </>
                  )}
                </button>
              </div>

              <div className="contact-info">
                <div className="contact-item">
                  <span className="icon">📞</span>
                  <span>+91 926 888 0303</span>
                </div>
                <div className="availability-badge small">24/7 Available</div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Profile;
