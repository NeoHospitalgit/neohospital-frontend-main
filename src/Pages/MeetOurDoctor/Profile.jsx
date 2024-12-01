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

  // Moved doctor check to within the useEffect
  useEffect(() => {
    if (doctor) {
      setDoctorname(doctor.drTitle);
    }
  }, [doctor]);

  if (!doctor) {
    return <div>Loading....</div>;
  }

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate inputs
    if (!name || !number || !email || !booktime || !bookdate) {
      window.alert("Please fill out all fields.");
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.alert("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    // Validate phone number format
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(number)) {
      window.alert("Please enter a valid Indian phone number.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('https://api.neohospital.com/api/sendmails/send-doctoremail', {
        // const response = await axios.post('http://localhost:5001/api/sendmails/send-doctoremail', {
        name,
        number,
        email,
        booktime,
        message,
        doctorname,
        bookdate
      });

      if (response.status === 200) {
        alert('Feedback submitted successfully');
        // Reset form fields
        setName("");
        setNumber("");
        setEmail("");
        setBookdate("");
        setBooktime("");
        setMessage("");
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate.getDay() === 0) {
      alert("Doctor is not available on this day");
      setBookdate("");
    } else {
      setBookdate(e.target.value);
    }
  };

  return (
    <section className="container">
      <div className="doctorprofile">
        <div className="row">
          <div className="col-md-8">
            <h1 className="pb-3">{doctor.drTitle}</h1>
            <div className="doctordetails">
              <section className="Meetourdoctor">
                <div>
                  <p>{parse(doctor.drDetail)}</p>
                </div>
              </section>
            </div>
          </div>

          <div className="col-md-4 shadowdrp">
            <div className="doctorpic">
              <div className="profile-card">
                <div className="img">
                  {doctor.drImage ? (
                    <img src={`https://api.neohospital.com/uploads/doctors/${doctor.drImage}`} alt={doctor.drTitle} />
                  ) : (
                    <img src={fallbackImage} alt="NEO Hospital Doctors" />
                  )}
                </div>
                <div className="about-title">
                  <h2>{doctor.drTitle}</h2>
                  <h5>{doctor.drQualification}</h5>
                  <p>{doctor.drDepartment}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="doctordetails">
              <form onSubmit={sendEmail}>
                <div className="row">
                  <p>Your appointment will be confirmed within 24 hours after a callback from our team.</p>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Phone"
                  className="form-control"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  name="number"
                />

                <div className="slotbook p-3">
                  <div className="row">
                    <div className="col-md-6">
                      <p>Book your Slot Date:</p>
                      <input
                        type="date" // Changed to date input for better UX
                        value={bookdate}
                        onChange={handleDateChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <p>Time Slots:</p>
                      <input
                        type="text"
                        value={booktime}
                        onChange={(e) => setBooktime(e.target.value)}
                        placeholder="Enter Time Slot"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="message"
                  placeholder="Additional message"
                  className="form-control"
                />

                <button
                  type="submit"
                  className="btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Schedule Appointment'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
