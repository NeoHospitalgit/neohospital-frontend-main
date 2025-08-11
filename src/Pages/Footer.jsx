import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./Footer.css";
import logo from "../Assets/index/logo.png";
import { Link } from "react-router-dom";
import Social from "./Home/Social";
import axios from 'axios';

function Footer() {
  const [Neospecial, setNeospecial] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSpecialties, setShowSpecialties] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.neohospital.com/api/adminv1/view-category"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setNeospecial(data.category);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

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

  const toggleSpecialties = () => {
    setShowSpecialties(!showSpecialties);
    console.log("Toggle clicked, new state:", !showSpecialties);
  };

  return (
    <>
      <Social />
      <div className="neofooter">
        <footer className="footer-section">
          <div className="container">
            <div className="footer-cta pt-4 pb-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="single-cta">
                    <i className="fa fa-map"></i>
                    <div className="cta-text">
                      <h4>Find Us :</h4>
                      <span>
                        <a href="#">
                          NEO HOSPITAL D-170, 170A, 170B, Sector-50, Noida,
                          <br />
                          Gautam Buddh Nagar (U.P) 201301
                        </a>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.997586581386!2d77.3675414745703!3d28.56983518692671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce58cda3bc64d%3A0x2e9995b44137c369!2sNEO%20Hospital!5e0!3m2!1sen!2sin!4v1709726316429!5m2!1sen!2sin"
                    width="100%"
                    height="150"
                    style={{ padding: "0", margin: "0" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="footer-speciality">
              <div className="speciality-header" onClick={toggleSpecialties}>
                <h3 className="text-center py-3">
                  <i className="fa fa-user-md"></i> Speciality
                  <i className={`fa fa-chevron-${showSpecialties ? 'up' : 'down'} toggle-icon`}></i>
                </h3>
              </div>
              
              <div className={`all-department ${showSpecialties ? 'show' : 'hide'}`}>
                <div className="row">
                  {Neospecial.map((value) => (
                    <div className="col-md-3" key={value.slug}>
                      <Link to={`https://www.neohospital.com/${value.slug}`}> 
                        <i className="fa fa-caret-right pe-2"></i>
                        {value.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="footer-content py-3">
              <div className="row">
                <div className="col-xl-4 col-lg-4 mb-50">
                  <div className="footer-widget">
                    <div className="footer-logo">
                      <Link to="/">
                        <img src={logo} className="img-fluid" alt="logo" />
                      </Link>
                    </div>
                    <div className="footer-text">
                      <p>
                        NEO Hospital is recognized within and beyond Noida
                        people as an advanced diagnostic and treatment facility,
                        staffed with highly qualified professionals.
                      </p>
                    </div>
                   <div className="footer-social-icon">
  <span>Follow us</span>
  <div className="social-icons">
    {/* Facebook */}
    <a href="https://facebook.com/neohospitalinnoida" target="_blank" rel="noreferrer">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5.006 3.657 9.128 8.438 9.878v-6.988H7.898v-2.89h2.54V9.845c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 17.006 22 12z"/>
      </svg>
    </a>

    {/* X (Twitter New Logo) */}
    <a href="https://twitter.com/neo_hospital" target="_blank" rel="noreferrer">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.21 2H20.5l-7.42 8.48L21.96 22h-6.03l-4.72-5.53L5.82 22H2.5l7.92-9.05L2.04 2h6.14l4.27 4.99L17.21 2zm-1.06 17h1.66L7.93 4.87H6.14l10.01 14.13z"/>
      </svg>
    </a>

    {/* Instagram */}
    <a href="https://instagram.com/neohospitalnoida" target="_blank" rel="noreferrer">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-2.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/>
      </svg>
    </a>

    {/* LinkedIn */}
    <a href="https://linkedin.com/company/neohospitalnoida" target="_blank" rel="noreferrer">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM0 24h5V7H0v17zM7 7v17h5v-9.4c0-2.9 3-3.1 3 0V24h5V13.4c0-6.1-6.5-5.9-8-2.9V7H7z"/>
      </svg>
    </a>

    {/* YouTube */}
    <a href="https://youtube.com/@neohospitalofficial?si=aDuqZU-awqibJiUB" target="_blank" rel="noreferrer">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.8-1.7-.8-2.1-.9C17.4 2.5 12 2.5 12 2.5h-.1s-5.4 0-8.6.5c-.4 0-1.3.1-2.1.9C.7 4.6.5 6.2.5 6.2S0 8.1 0 10v4c0 1.9.5 3.8.5 3.8s.2 1.6.8 2.3c.8.8 1.8.8 2.2.9 1.6.2 6.5.5 8.5.5s6.9-.1 8.6-.5c.4 0 1.3-.1 2.1-.9.6-.6.8-2.3.8-2.3s.5-1.9.5-3.8v-4c0-1.9-.5-3.8-.5-3.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
      </svg>
    </a>
  </div>
</div>


                <div className="col-xl-2 col-lg-2 col-md-6">
                  <div>
                    <div className="footer-widget-heading">
                      <h3>Quick Links</h3>
                    </div>
                    <div className="category">
                      <ul>
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/about">About Us</Link>
                        </li>
                        <li>
                          <Link to="/doctors">Doctors</Link>
                        </li>
                        <li>
                          <Link to="/services">Services</Link>
                        </li>
                        <li>
                          <Link to="/blog">Blog</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                          <Link to="/gallery">Gallery</Link>
                        </li>
                        <li>
                          <Link to="/career">Career</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-6 mb-50">
                  <div className="footer-widget">
                    <div className="footer-widget-heading">
                      <h3>Suggestions / Feedback</h3>
                    </div>
                    <div className="footer-text ms-3">
                      <p>
                        Have any feedback or suggestions? Just tell us. We are
                        here to help you with everything.
                      </p>
                      <div>
                        <div className="single-cta">
                          <i className="fa fa-phone"></i>
                          <a className="fss" href="tel:0120-4880000">
                            0120-4880000
                          </a>
                        </div>
                        <div className="single-cta">
                          <i className="fa fa-phone"></i>
                          <a className="fss" href="tel:0120-3120000">
                            0120-3120000
                          </a>
                        </div>
                        <div className="single-cta">
                          <i className="fa fa-envelope-open"></i>
                          <a className="fss" href="mailto:info@neohospital.com">
                            info@neohospital.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 mb-50">
                  <div className="footer-widget">
                    <div className="footer-widget-heading">
                      <h3>Connect With Us</h3>
                    </div>
                    <div className="footer-text ms-3">
                      <div className="footerform">
                        <form onSubmit={sendEmail}>
                          <div>
                            <input
                              type="text"
                              placeholder="Name"
                              className="form-control"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              name="name"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              placeholder="Number"
                              className="form-control"
                              value={number}
                              onChange={(e) => setNumber(e.target.value)}
                              name="number"
                            />
                          </div>
                          <div>
                            <input
                              type="email"
                              placeholder="Email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              name="email"
                            />
                          </div>
                          <div>
                            <textarea
                              placeholder="Message"
                              className="form-control"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              name="message"
                            ></textarea>
                            <br />
                            <button
                              type="submit"
                              value="Submit"
                              className="form-control"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? 'Submitting...' : 'Send'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright-area">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                  <div className="copyright-text">
                    <p>2025 All rights reserved © by neohospital.com</p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                  <div className="footer-menu">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/">Terms</Link>
                      </li>
                      <li>
                        <Link to="/">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
