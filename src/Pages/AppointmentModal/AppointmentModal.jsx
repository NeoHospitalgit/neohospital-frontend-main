import React, { useState } from "react";
import axios from "axios";
import "./AppointmentModal.css";
import { useAuth } from "../../store/auth";

function AppointmentModal({
  buttonText = "Book Appointment",
  doctorname = "General Consultation",
}) {

  const { API } = useAuth();

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [bookdate, setBookdate] = useState("");
  const [booktime, setBooktime] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleDateChange = (e) => {

    const selectedDate = new Date(e.target.value);

    if (selectedDate.getDay() === 0) {

      alert("Doctor is not available on Sundays");

      setBookdate("");

      return;

    }

    setBookdate(e.target.value);

  };

  const sendEmail = async (e) => {

    e.preventDefault();

    if (!name || !number || !bookdate || !booktime) {

      alert("Please fill all required fields.");

      return;

    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(number)) {

      alert("Please enter valid mobile number.");

      return;

    }

    if (email) {

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {

        alert("Please enter valid email.");

        return;

      }

    }

    try {

      setIsSubmitting(true);

      const response = await axios.post(

        `${API}/api/sendmails/send-doctoremail`,

        {

          doctorname,

          name,

          email,

          number,

          message,

          bookdate,

          booktime,

        }

      );

      if (response.status === 200) {

        setShowSuccessMessage(true);

        setName("");
        setEmail("");
        setNumber("");
        setBookdate("");
        setBooktime("");
        setMessage("");

        setTimeout(() => {

          setShowSuccessMessage(false);
          setShowModal(false);

        }, 2500);

      }

    } catch (error) {

     console.log("Full Error:", error);

  console.log("Response:", error.response);

  console.log("Request:", error.request);

  console.log("Message:", error.message);

  console.log("Code:", error.code);

  alert("Appointment booking failed.");


    } finally {

      setIsSubmitting(false);

    }

  };

  return (
    <>

      {showSuccessMessage && (

        <div className="appointment-success">

          <div className="appointment-success-box">

            <h3>✅ Appointment Booked</h3>

            <p>
              We'll contact you shortly.
            </p>

          </div>

        </div>

      )}

      <button
        className="appointment-open-btn"
        onClick={() => setShowModal(true)}
      >
        📅 {buttonText}
      </button>

      {showModal && (

        <div className="appointment-overlay">

          <div className="appointment-modals">

            <button
              className="appointment-close"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <div className="appointment-header">

              <div className="appointment-icon">
                📅
              </div>

              <div>

                <h2>
                  Book Appointment
                </h2>

                <p>
                  Get personalized medical care
                </p>

              </div>

            </div>

            <div className="appointment-info">

              <span className="info-icon">
                ℹ
              </span>

              <span>

                <strong>
                  Quick Response:
                </strong>

                {" "}

                Your appointment will be confirmed
                within 24 hours after a callback
                from our team.

              </span>

            </div>

            <form
              className="appointment-form"
              onSubmit={sendEmail}
            >

              <input
                type="text"
                placeholder="Full Name *"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />

              <input
                type="tel"
                placeholder="Phone Number *"
                value={number}
                onChange={(e)=>setNumber(e.target.value)}
                required
              />

              <div className="appointment-row">

                <input
                  type="date"
                  min={today}
                  value={bookdate}
                  onChange={handleDateChange}
                  required
                />

                <select
                  value={booktime}
                  onChange={(e)=>setBooktime(e.target.value)}
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

              <textarea
                rows="5"
                placeholder="Any specific concerns, symptoms, or requirements..."
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
              />
                            <button
                type="submit"
                className="appointment-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Booking...
                  </>
                ) : (
                  "Book Appointment"
                )}
              </button>

            </form>

          </div>

        </div>

      )}

    </>
  );
}

export default AppointmentModal;
