import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./Footer.css";
import logo from "../Assets/index/neologo.png";
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

                <div className="col-md-6 ">
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
                      <a href="https://www.facebook.com/neohospitalinnoida">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.44772 14.1457 5.5 15.198 5.5H17.198V2.5H14.698C12.292 2.5 9.69795 4.18688 9.19795 6.50977V9.50977H7.19795V13.4901H9.19795V21.5Z" fill="currentColor"/>
                        </svg>
                      </a>
                      <a href="https://twitter.com/neo_hospital">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.244 2.25H21.552L14.837 9.951L22.705 21.75H16.025L10.872 15.123L4.991 21.75H1.681L8.891 13.566L1.5 2.25H8.281L12.952 8.241L18.244 2.25ZM17.083 19.77H18.753L7.055 4.078H5.243L17.083 19.77Z" fill="currentColor"/>
                        </svg>
                      </a>
                      <a href="https://www.instagram.com/neohospitalnoida/">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C18.102 2.29 18.741 2.515 19.258 2.757C19.835 3.024 20.319 3.351 20.79 3.822C21.261 4.293 21.588 4.776 21.856 5.352C22.099 5.869 22.323 6.508 22.381 7.76C22.439 9.026 22.451 9.406 22.451 12.611C22.451 15.816 22.439 16.196 22.381 17.462C22.323 18.714 22.099 19.353 21.856 19.87C21.588 20.446 21.261 20.929 20.79 21.4C20.319 21.871 19.835 22.198 19.258 22.465C18.741 22.707 18.102 22.932 16.85 22.989C15.584 23.047 15.204 23.059 12 23.059C8.796 23.059 8.416 23.047 7.15 22.989C5.898 22.932 5.259 22.707 4.742 22.465C4.165 22.198 3.681 21.871 3.21 21.4C2.739 20.929 2.412 20.446 2.144 19.87C1.902 19.353 1.677 18.714 1.619 17.462C1.561 16.196 1.549 15.816 1.549 12.611C1.549 9.406 1.561 9.026 1.619 7.76C1.677 6.508 1.902 5.869 2.144 5.352C2.412 4.776 2.739 4.293 3.21 3.822C3.681 3.351 4.165 3.024 4.742 2.757C5.259 2.515 5.898 2.29 7.15 2.233C8.416 2.175 8.796 2.163 12 2.163ZM12 5.838C9.239 5.838 7 8.077 7 10.838C7 13.599 9.239 15.838 12 15.838C14.761 15.838 17 13.599 17 10.838C17 8.077 14.761 5.838 12 5.838ZM12 13.838C10.343 13.838 9 12.495 9 10.838C9 9.181 10.343 7.838 12 7.838C13.657 7.838 15 9.181 15 10.838C15 12.495 13.657 13.838 12 13.838ZM18.406 5.414C18.406 6.042 17.906 6.542 17.278 6.542C16.65 6.542 16.15 6.042 16.15 5.414C16.15 4.786 16.65 4.286 17.278 4.286C17.906 4.286 18.406 4.786 18.406 5.414Z" fill="currentColor"/>
                        </svg>
                      </a>
                      <a href="https://www.linkedin.com/company/neohospitalnoida/">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.98 3.5C4.98 4.328 4.328 5 3.5 5C2.672 5 2 4.328 2 3.5C2 2.672 2.672 2 3.5 2C4.328 2 4.98 2.672 4.98 3.5ZM5 7H2V22H5V7ZM12.982 7H9.758V22H12.982V14.396C12.982 10.896 16.974 10.5 16.974 14.396V22H20.198V13.188C20.198 7.596 14.486 7.792 12.982 10.992V7Z" fill="currentColor"/>
                        </svg>
                      </a>
                    </div>
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
                        <div className="single-cta ">
                          <i className="fa fa-phone"></i>
                          <a className="fss" href="tel:0120-4880000">
                            0120-4880000
                          </a>
                        </div>
                        <div className="single-cta ">
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
          </div >
          <div className="copyright-area">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                  <div className="copyright-text">
                    <p>2024 All rights reserved © by neohospital.com</p>
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
                        <Link to="/">Privacy</Link>
                      </li>
                      <li>
                        <Link to="/">Policy</Link>
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
        </footer >
      </div >
    </>
  );
}

export default Footer;
