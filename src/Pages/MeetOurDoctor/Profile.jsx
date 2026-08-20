import React, {
  useState,
  useEffect,
} from "react";

import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Profile.css";
import parse from "html-react-parser";
import axios from "axios";
import NotFound from "../NotFound";
import { useAuth } from "../../store/auth";

import fallbackImage from "../../Assets/manpic.png";

function Profile() {

  const { API } = useAuth();

  const [Neodoctor, setNeodoctor] =
    useState([]);

  const [error, setError] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [name, setName] =
    useState("");

  const [number, setNumber] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [booktime, setBooktime] =
    useState("");

  const [bookdate, setBookdate] =
    useState("");

  const [doctorname, setDoctorname] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [showSuccessMessage, setShowSuccessMessage] =
    useState(false);

  const [showAppointmentForm, setShowAppointmentForm] =
    useState(false);

  const { dr } = useParams();

  // =====================================
  // Fetch Doctors
  // =====================================

  useEffect(() => {

    if (!API) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {

      try {

        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API}/api/doctors/view-doctors`
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
            "Failed to fetch doctors"
          );
        }

        setNeodoctor(
          data?.doctors || []
        );

      } catch (error) {

  console.error(
    "Doctor profile API error:",
    error
  );

  setError(error);
  setNeodoctor([]);

} finally {

        setLoading(false);

      }

    };

    fetchData();

  }, [API]);

  // =====================================
  // Find Doctor
  // =====================================

  const doctor = Neodoctor.find(
    (value) =>
      value.drSlug === dr
  );

  // =====================================
  // Doctor Name
  // =====================================

  useEffect(() => {

    if (doctor) {
      setDoctorname(
        doctor.drTitle
      );
    }

  }, [doctor]);

  // =====================================
  // Minimum Date
  // =====================================

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  // =====================================
  // Error
  // =====================================

// =====================================
// Loading
// =====================================

if (loading) {
  return (
    <div className="loading-spinner-container">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">
          Loading...
        </span>
      </div>
    </div>
  );
}

// =====================================
// Doctor Not Found
// =====================================

if (!loading && (!doctor || error)) {
  return <NotFound />;
}
  // =====================================
  // Loading
  // =====================================

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  // =====================================
  // Doctor Not Found
  // =====================================

  if (!doctor) {
    return <NotFound />;
  }

  // =====================================
  // Send Appointment
  // =====================================

  const sendEmail = async (e) => {

    e.preventDefault();

    setIsSubmitting(true);

    if (
      !name ||
      !number ||
      !booktime ||
      !bookdate
    ) {

      window.alert(
        "Please fill out all required fields."
      );

      setIsSubmitting(false);

      return;
    }

    if (email) {

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {

        window.alert(
          "Please enter a valid email address."
        );

        setIsSubmitting(false);

        return;
      }
    }

    const phoneRegex =
      /^[6-9]\d{9}$/;

    if (!phoneRegex.test(number)) {

      window.alert(
        "Please enter a valid Indian phone number."
      );

      setIsSubmitting(false);

      return;
    }

    try {

      const response =
        await axios.post(
          `${API}/api/sendmails/send-doctoremail`,
          {
            name,
            number,
            email,
            booktime,
            message,
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

        }, 5000);
      }

    } catch (error) {

      console.error(
        "Error submitting appointment:",
        error
      );

      alert(
        "Failed to submit appointment request. Please try again."
      );

    } finally {

      setIsSubmitting(false);

    }
  };

  // =====================================
  // Date Change
  // =====================================

  const handleDateChange = (e) => {

    const selectedDate =
      new Date(e.target.value);

    if (
      selectedDate.getDay() === 0
    ) {

      alert(
        "Doctor is not available on Sundays"
      );

      setBookdate("");

    } else {

      setBookdate(
        e.target.value
      );

    }
  };

  // =====================================
  // Doctor Display Name
  // =====================================

  const getDoctorDisplayName = () => {

    return (
      doctor.drTitle
        ?.split(".")[1]
        ?.trim() ||
      doctor.drTitle
    );
  };

  // =====================================
  // Qualification
  // =====================================

  const formatQualification =
    (qualification) => {

      if (!qualification) {
        return null;
      }

      return qualification
        .split(",")
        .map((qual, index) => (

          <span
            key={index}
            className="qualification-tag"
          >
            {qual.trim()}
          </span>

        ));
    };

  // =====================================
  // Doctor Image
  // =====================================

  const doctorImage =
    doctor.drImage
      ? `${API}/uploads/doctors/${doctor.drImage}`
      : fallbackImage;

  return (

    <div className="profile-page">

      {/* =====================================
          SEO
      ===================================== */}
      <Helmet>
  {doctor.drMetaTags?.trim() ? (
    parse(doctor.drMetaTags)
  ) : (
    <>
     <title>
          {doctor.drTitle} - Neo Hospital
        </title>

        <meta
          name="description"
          content={`Book an appointment with ${doctor.drTitle}, ${doctor.drDepartment} at Neo Hospital. ${
            doctor.drExperience
              ? `${doctor.drExperience}+ years of experience.`
              : ""
          }`}
        />

        {doctor.drDepartment && (
          <meta
            name="keywords"
            content={`${doctor.drDepartment} in noida`}
          />
        )}

        <meta
          property="og:title"
          content={`${doctor.drTitle} - Neo Hospital`}
        />

        <meta
          property="og:description"
          content={`${doctor.drDepartment} specialist with ${
            doctor.drExperience ||
            "extensive"
          } years of experience`}
        />

        <meta
          property="og:type"
          content="profile"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <meta
          name="googlebot"
          content="index, follow"
        />

        <meta
          name="bingbot"
          content="index, follow"
        />

        <meta
          name="author"
          content="Neo Hospital"
        />

        <meta
          name="publisher"
          content="YRC"
        />

        <link
          rel="canonical"
          href={`https://www.neohospital.com/doctor-details/${doctor.drSlug}`}
        />
    </>
  )}
</Helmet>

      {/* =====================================
          SUCCESS MESSAGE
      ===================================== */}

      {showSuccessMessage && (

        <div className="success-notification">

          <div className="success-content">

            <div className="success-icon">
              ✅
            </div>

            <div>

              <h4>
                Appointment Request Submitted!
              </h4>

              <p>
                We'll contact you within
                24 hours to confirm your
                appointment.
              </p>

            </div>

            <button
              className="close-notification"
              onClick={() =>
                setShowSuccessMessage(false)
              }
            >
              ×
            </button>

          </div>

        </div>
      )}

      {/* =====================================
          DOCTOR HEADER
      ===================================== */}

      <div className="doctor-profile-header">

        <div className="container">

          <div className="doctor-header-grid">

            <div className="doctor-image-container">

              <img
                src={doctorImage}
                alt={doctor.drTitle}
                onError={(e) => {
                  e.currentTarget.src =
                    fallbackImage;
                }}
                loading="lazy"
              />

            </div>

            <div className="doctor-info-container">

              <h1>
                {doctor.drTitle}
              </h1>

              <p className="specialty">
                {doctor.drDepartment}
              </p>

              <div className="qualifications">

                {formatQualification(
                  doctor.drQualification
                )}

              </div>

              <p className="experience">

                {doctor.drExperience
                  ? `${doctor.drExperience}+ years experience`
                  : "Experienced Doctor"}

              </p>

              <button
                className="hero-appointment-btn"
                onClick={() =>
                  setShowAppointmentForm(true)
                }
              >
                📅 Book Appointment
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================
          DOCTOR CONTENT
      ===================================== */}

      <main className="main-content">

        <div className="container">

          <div className="content-full">

            <section className="doctor-content">

              <div className="about-section">

                <h2 className="section-title">

                  <div className="title-icon">
                    ℹ️
                  </div>

                  About {getDoctorDisplayName()}

                </h2>

                <div className="about-text">

                  {doctor.drDetail
                    ? parse(doctor.drDetail)
                    : "Doctor information will be updated soon."}

                </div>

              </div>

            </section>

          </div>

        </div>

      </main>

      {/* =====================================
          APPOINTMENT MODAL
      ===================================== */}

      {showAppointmentForm && (

        <div className="appointment-modal">

          <div className="appointment-modal-content">

            <button
              className="close-modal"
              onClick={() =>
                setShowAppointmentForm(false)
              }
            >
              ×
            </button>

            <div className="appointment-card">

              <div className="card-header">

                <h3 className="appointment-title">

                  📅 Book Appointment

                </h3>

                <p className="appointment-subtitle">
                  Get personalized medical care
                </p>

              </div>

              <div className="appointment-note">

                <div className="note-icon">
                  ℹ️
                </div>

                <p>
                  <strong>
                    Quick Response:
                  </strong>{" "}
                  Your appointment will be
                  confirmed within 24 hours
                  after a callback from our team.
                </p>

              </div>

              <form
                className="appointment-form"
                onSubmit={sendEmail}
              >

                {/* Name */}

                <div className="form-group">

                  <label
                    htmlFor="full-name"
                    className="sr-only"
                  >
                    Full Name
                  </label>

                  <input
                    id="full-name"
                    type="text"
                    placeholder="Full Name *"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className="form-input"
                    required
                  />

                </div>

                {/* Email */}

                <div className="form-group">

                  <label
                    htmlFor="email"
                    className="sr-only"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="form-input"
                  />

                </div>

                {/* Phone */}

                <div className="form-group">

                  <label
                    htmlFor="phone"
                    className="sr-only"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="Phone Number *"
                    value={number}
                    onChange={(e) =>
                      setNumber(e.target.value)
                    }
                    className="form-input"
                    required
                  />

                </div>

                {/* Date / Time */}

                <div className="form-row">

                  <div className="form-group">

                    <input
                      type="date"
                      value={bookdate}
                      onChange={
                        handleDateChange
                      }
                      min={today}
                      className="form-input"
                      required
                    />

                  </div>

                  <div className="form-group">

                    <select
                      value={booktime}
                      onChange={(e) =>
                        setBooktime(
                          e.target.value
                        )
                      }
                      className="form-select"
                      required
                    >

                      <option value="">
                        Select Time Slot *
                      </option>

                      <option value="09:00 AM">
                        09:00 AM
                      </option>

                      <option value="10:00 AM">
                        10:00 AM
                      </option>

                      <option value="11:00 AM">
                        11:00 AM
                      </option>

                      <option value="12:00 PM">
                        12:00 PM
                      </option>

                      <option value="02:00 PM">
                        02:00 PM
                      </option>

                      <option value="03:00 PM">
                        03:00 PM
                      </option>

                      <option value="04:00 PM">
                        04:00 PM
                      </option>

                      <option value="05:00 PM">
                        05:00 PM
                      </option>

                    </select>

                  </div>

                </div>

                {/* Message */}

                <div className="form-group">

                  <textarea
                    placeholder="Any specific concerns, symptoms, or requirements..."
                    rows="3"
                    value={message}
                    onChange={(e) =>
                      setMessage(
                        e.target.value
                      )
                    }
                    className="form-textarea"
                  />

                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn"
                >

                  {isSubmitting
                    ? "Submitting..."
                    : "📅 Schedule Appointment"}

                </button>

              </form>

              <div className="contact-infoo">

                <div className="contact-item">

                  <div className="contact-icon">
                    📞
                  </div>

                  <div>

                    <div className="contact-label">
                      Emergency Contact
                    </div>

                    <div className="contact-value">
                      0120-4880000
                    </div>

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
      )}

    </div>
  );
}

export default Profile;
