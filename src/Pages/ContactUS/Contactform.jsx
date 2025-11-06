import React, { useState } from "react";
import "./Contactform.css";
import axios from 'axios';

function Contactform() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFullConsent, setShowFullConsent] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const consentText = "By submitting this form, I consent to Neo Hospital collecting, storing, and processing my personal information for the purposes of responding to my enquiry, scheduling appointments, providing healthcare or related administrative services. I have read and understood the Privacy Policy (link), which explains how my data will be used, stored, shared, and how I can withdraw my consent. My data will be handled in accordance with the Digital Personal Data Protection Act, 2023 and the Information Technology Rules, 2011.";

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate inputs
    if (!name || !number || !email || !message) {
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
      const response = await axios.post('https://api.neohospital.com/api/sendmails/send-contact-email', {
        // const response = await axios.post('http://localhost:5001/api/sendmails/send-contact-email', {
        name,
        number,
        email,
        message
      });

      if (response.status === 200) {
        alert('Feedback submitted successfully');
        // Reset form fields
        setName('');
        setNumber('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="Contactform">
      <div className="contact_us">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="contact_inner">
                <div className="row">
                  <div className="col-md-10">
                    <div className="contact_form_inner">
                      <div className="contact_field">
                        <section id="contact">
                          <div className="mt-5">
                            <h3 className="about-title">
                              <span>Contact Us Today</span>
                            </h3>
                            <p className="about-description">
                              Welcome to Neo Super Speciality Hospital! Ensuring your health is
                              our priority. Schedule your consultation with our
                              expert physicians and specialists effortlessly.
                              Simply choose your preferred date, time, and
                              department. Our dedicated team will confirm your
                              appointment promptly.
                            </p>
                          </div>
                        </section>

                        <form onSubmit={sendEmail}>
                          <input
                            type="text"
                            required
                            className="form-control form-group"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <input
                            type="tel"
                            required
                            className="form-control form-group"
                            placeholder="Phone Number"
                            name="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                          />
                          <input
                            type="email"
                            className="form-control form-group"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <textarea
                            className="form-control form-group"
                            placeholder="Message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          ></textarea>
                          
                          <div className="consent-section" style={{ marginBottom: '20px' }}>
                            <div style={{ position: 'relative' }}>
                              <p style={{ 
                                display: '-webkit-box', 
                                WebkitLineClamp: showFullConsent ? 'unset' : '2', 
                                WebkitBoxOrient: 'vertical', 
                                overflow: 'hidden',
                                marginBottom: '5px'
                              }}>
                                {consentText}
                              </p>
                              {!showFullConsent && (
                                <button 
                                  type="button" 
                                  onClick={() => setShowFullConsent(true)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#0066cc',
                                    padding: 0,
                                    cursor: 'pointer'
                                  }}
                                >
                                  Read More
                                </button>
                              )}
                            </div>
                            <div style={{ marginTop: '10px' }}>
                              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                <input
                                  type="checkbox"
                                  checked={consentChecked}
                                  onChange={(e) => setConsentChecked(e.target.checked)}
                                />
                                <span style={{ fontSize: '14px' }}>
                                  I hereby provide my free, specific, informed, and unconditional consent to the collection and processing of my personal data as described above.
                                </span>
                              </label>
                            </div>
                          </div>

                          <button 
                            type="submit" 
                            className="contact_form_submit" 
                            disabled={isSubmitting || !consentChecked}
                          >
                            {isSubmitting ? 'Submitting...' : 'Send'}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="right_conatct_social_icon d-flex align-items-end">
                      <div className="socil_item_inner d-flex">
                        <li>
                          <a href="#">
                            <i className="fa fa-facebook-square"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-twitter"></i>
                          </a>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact_info_sec">
                  <h3 className="text-light">Contact Info</h3>
                  <div className="d-flex info_single align-items-center">
                    <div>
                      <i className="fa fa-phone"></i>
                      <a className="can" href="tel:0120-4880000">
                        0120-4880000
                      </a>
                    </div>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <div>
                      <i className="fa fa-phone"></i>
                      <a className="can" href="tel:0120-3120000">
                        0120-3120000
                      </a>
                    </div>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <i className="fa fa-envelope"></i>
                    <span>info@neohospital.com</span>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <i className="fa fa-map"></i>
                    <span>
                      Neo Super Speciality Hospital D-170, 170A, 170B, Sector-50, NOIDA, GAUTAM
                      BUDDH NAGAR (U.P) 201301
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contactform;
