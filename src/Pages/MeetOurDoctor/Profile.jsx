import React, { useState, useEffect } from "react";
import { Clock, Phone, MapPin, Award, GraduationCap, Calendar, Star, CheckCircle, MessageCircle, Send, Stethoscope, Heart, Users, Shield } from "lucide-react";
import "./profile.css";
import parse from "html-react-parser";
import axios from 'axios';
import fallbackImage from "../../Assets/manpic.png";

function EnhancedDoctorProfile() {
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
  const [showSuccess, setShowSuccess] = useState(false);

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

  // Get doctor from URL params (you'll need to implement useParams)
  // const { dr } = useParams();
  // const doctor = Neodoctor.find((value) => value.drSlug === dr);

  // For demo purposes, using mock data
  const doctor = Neodoctor.length > 0 ? Neodoctor[0] : {
    drTitle: "Dr. Sarah Johnson",
    drQualification: "MBBS, MD (Cardiology), FACC",
    drDepartment: "Cardiology",
    drDetail: "<p>Dr. Sarah Johnson is a renowned cardiologist with over 15 years of experience in treating complex cardiovascular conditions. She specializes in interventional cardiology and has performed over 2,000 successful cardiac procedures.</p><p>Her expertise includes coronary angioplasty, heart valve repairs, and advanced cardiac imaging. Dr. Johnson is committed to providing personalized care with the latest medical technologies.</p>",
    drImage: null,
    drSlug: "dr-sarah-johnson"
  };

  useEffect(() => {
    if (doctor) {
      setDoctorname(doctor.drTitle);
    }
  }, [doctor]);

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const stats = [
    { icon: Users, label: "Happy Patients", value: "2,500+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: Heart, label: "Success Rate", value: "98%" },
    { icon: Shield, label: "Procedures", value: "2,000+" }
  ];

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
        setShowSuccess(true);
        setName("");
        setNumber("");
        setEmail("");
        setBookdate("");
        setBooktime("");
        setMessage("");
        
        setTimeout(() => setShowSuccess(false), 5000);
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

  if (!doctor && Neodoctor.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading doctor information...</p>
      </div>
    );
  }

  return (
    <div className="enhanced-medical-profile">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="float-element element-1">
          <Stethoscope className="medical-icon" />
        </div>
        <div className="float-element element-2">
          <Heart className="medical-icon" />
        </div>
        <div className="float-element element-3">
          <Shield className="medical-icon" />
        </div>
      </div>

      {/* Hero Section with Integrated Booking */}
      <section className="hero-medical-section">
        <div className="hero-background-pattern"></div>
        <div className="hero-container">
          {/* Breadcrumb */}
          <nav className="medical-breadcrumb">
            <span>Home</span>
            <span className="breadcrumb-divider">•</span>
            <span>Doctors</span>
            <span className="breadcrumb-divider">•</span>
            <span className="current-page">{doctor.drTitle}</span>
          </nav>

          <div className="hero-content-grid">
            {/* Doctor Information */}
            <div className="doctor-presentation">
              <div className="doctor-image-container">
                <div className="image-backdrop"></div>
                <div className="doctor-avatar">
                  {doctor.drImage ? (
                    <img 
                      src={`https://api.neohospital.com/uploads/doctors/${doctor.drImage}`} 
                      alt={doctor.drTitle}
                      className="avatar-image"
                    />
                  ) : (
                    <img 
                      src={fallbackImage} 
                      alt={doctor.drTitle}
                      className="avatar-image"
                    />
                  )}
                  <div className="online-indicator">
                    <div className="pulse-ring"></div>
                    <div className="pulse-dot"></div>
                  </div>
                </div>
                <div className="floating-badge">
                  <CheckCircle className="badge-icon" />
                  <span>Verified Doctor</span>
                </div>
              </div>

              <div className="doctor-details">
                <h1 className="doctor-name-title">{doctor.drTitle}</h1>
                <div className="rating-showcase">
                  <div className="star-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="star-filled" fill="currentColor" />
                    ))}
                  </div>
                  <span className="rating-text">4.9 (324 reviews)</span>
                </div>

                <div className="specialty-tags">
                  <div className="specialty-tag primary">
                    <GraduationCap className="tag-icon" />
                    {doctor.drQualification}
                  </div>
                  <div className="specialty-tag secondary">
                    <Award className="tag-icon" />
                    {doctor.drDepartment}
                  </div>
                  <div className="specialty-tag tertiary">
                    <MapPin className="tag-icon" />
                    Neo Super-Speciality Hospital
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="stats-showcase">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                      <stat.icon className="stat-icon" />
                      <div className="stat-content">
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="booking-form-container">
              <div className="booking-card">
                <div className="booking-header">
                  <Calendar className="booking-icon" />
                  <h3 className="booking-title">Schedule Consultation</h3>
                  <div className="availability-pill">
                    <div className="availability-dot"></div>
                    Available Today
                  </div>
                </div>

                {showSuccess && (
                  <div className="success-notification">
                    <CheckCircle className="success-icon" />
                    <div className="success-content">
                      <h4>Appointment Requested!</h4>
                      <p>We'll confirm within 24 hours</p>
                    </div>
                  </div>
                )}

                <form onSubmit={sendEmail} className="booking-form">
                  <div className="form-grid">
                    <div className="input-group">
                      <label className="input-label">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label className="input-label">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label className="input-label">Phone Number</label>
                      <input
                        type="tel"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="form-input"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label className="input-label">Preferred Date</label>
                      <input
                        type="date"
                        value={bookdate}
                        onChange={handleDateChange}
                        className="form-input"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <div className="input-group full-width">
                      <label className="input-label">Time Slot</label>
                      <div className="time-slots-grid">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setBooktime(slot)}
                            className={`time-slot ${booktime === slot ? 'selected' : ''}`}
                          >
                            <Clock className="slot-icon" />
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="input-group full-width">
                      <label className="input-label">Message (Optional)</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="form-textarea"
                        placeholder="Describe your symptoms or concerns..."
                        rows={3}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="submit-icon" />
                        Book Appointment
                      </>
                    )}
                  </button>

                  <div className="contact-footer">
                    <div className="emergency-contact">
                      <Phone className="contact-icon" />
                      <span>Emergency: +91 926 888 0303</span>
                    </div>
                    <div className="response-time">
                      <MessageCircle className="response-icon" />
                      <span>Response within 2 hours</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-medical-section">
        <div className="content-container">
          <div className="section-header">
            <div className="header-decoration"></div>
            <h2 className="section-title">About {doctor.drTitle.split('.')[1]?.trim() || doctor.drTitle}</h2>
            <p className="section-subtitle">Leading Specialist with Excellence in Patient Care</p>
          </div>

          <div className="about-content-grid">
            <div className="about-text-content">
              <div className="content-card">
                <div className="parsed-content">
                  {parse(doctor.drDetail)}
                </div>
              </div>
              
              <div className="expertise-grid">
                <div className="expertise-card">
                  <GraduationCap className="expertise-icon" />
                  <h4>Education & Training</h4>
                  <ul>
                    <li>{doctor.drQualification}</li>
                    <li>Specialized Training in {doctor.drDepartment}</li>
                    <li>Advanced Medical Certification</li>
                  </ul>
                </div>
                
                <div className="expertise-card">
                  <Award className="expertise-icon" />
                  <h4>Specializations</h4>
                  <ul>
                    <li>Advanced {doctor.drDepartment} Procedures</li>
                    <li>Minimally Invasive Treatments</li>
                    <li>Patient-Centered Care</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="testimonial-sidebar">
              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="patient-avatar">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" alt="Patient" />
                  </div>
                  <div className="patient-info">
                    <h5>John Smith</h5>
                    <div className="patient-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="mini-star" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p>"Exceptional care and expertise. The doctor's professional approach made all the difference in my treatment."</p>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="patient-avatar">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b829?w=50&h=50&fit=crop&crop=face" alt="Patient" />
                  </div>
                  <div className="patient-info">
                    <h5>Maria Garcia</h5>
                    <div className="patient-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="mini-star" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p>"Professional, compassionate, and incredibly skilled. I couldn't have asked for better medical care."</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EnhancedDoctorProfile;
