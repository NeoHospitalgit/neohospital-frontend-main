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
    if (!name || !number  || !message) {
      window.alert("Please fill out all fields.");
      setIsSubmitting(false);
      return;
    }

    // Validate email format
   // Validate email only if user entered it
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(email)) {
        window.alert("Please enter a valid email address.");
        setIsSubmitting(false);
        return;
      }
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
                      <h2>Find Us :</h2>
                      <span>
                        <a href="#">
                          {/* NEO HOSPITAL D-170, 170A, 170B, Sector-50, Noida,
                          <br />
                          Gautam Buddh Nagar (U.P) 201301 */}

                          NEO HOSPITAL (A unit of Muskan Medical Center Private Limited) - D 170A, SECTOR 50, NOIDA, Gautam Buddha Nagar, Uttar Pradesh, 201301
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
                        NEO Super Speciality Hospital is recognized within and beyond Noida
                        people as an advanced diagnostic and treatment facility,
                        staffed with highly qualified professionals.
                      </p>
                    </div>
                    <div className="footer-social-icon">
                      <span>Follow us</span>
                      <a href="https://www.facebook.com/neohospitalinnoida">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.1979 9.50977H13.198V7.5C13.198 6.79746 13.9985 6 15.1979 6H17.1979V2.5H14.6979C12.7972 2.5 9.19795 3.79731 9.19795 6.5V9.50977H7.19795L6.80214 13.4901H9.19795V21.5Z" fill="currentColor"/>
                        </svg>
                      </a>
                      <a href="https://x.com/neo_hospital">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.901 2.48H21.581L14.801 10.48L22.781 21.48H17.421L12.441 14.98L6.781 21.48H4.101L11.341 12.98L3.781 2.48H9.281L13.781 8.48L18.901 2.48ZM18.101 19.48H20.101L8.101 4.48H6.101L18.101 19.48Z" fill="currentColor"/>
                        </svg>
                      </a>
                      <a href="https://www.instagram.com/neohospitalnoida/">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"/>
                          <path d="M17.5 2.5H6.5C4.29086 2.5 2.5 4.29086 2.5 6.5V17.5C2.5 19.7091 4.29086 21.5 6.5 21.5H17.5C19.7091 21.5 21.5 19.7091 21.5 17.5V6.5C21.5 4.29086 19.7091 2.5 17.5 2.5ZM12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM18.5 7C17.6716 7 17 6.32843 17 5.5C17 4.67157 17.6716 4 18.5 4C19.3284 4 20 4.67157 20 5.5C20 6.32843 19.3284 7 18.5 7Z" fill="currentColor"/>
                        </svg>
                      </a>
                      <a href="https://www.linkedin.com/company/neohospitalnoida/">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM8 17H6V10H8V17ZM7 8.5C6.17157 8.5 5.5 7.82843 5.5 7C5.5 6.17157 6.17157 5.5 7 5.5C7.82843 5.5 8.5 6.17157 8.5 7C8.5 7.82843 7.82843 8.5 7 8.5ZM18 17H16V13C16 12.4477 15.5523 12 15 12C14.4477 12 14 12.4477 14 13V17H12V10H14V11.5C14.6321 10.6739 15.5523 10 16.5 10C18.433 10 18 11.567 18 13V17Z" fill="currentColor"/>
                        </svg>
                      </a>
                      <a href="https://youtube.com/@neohospitalofficial?si=aDuqZU-awqibJiUB">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.5 6.5C21.5 5.39543 20.6046 4.5 19.5 4.5H4.5C3.39543 4.5 2.5 5.39543 2.5 6.5V17.5C2.5 18.6046 3.39543 19.5 4.5 19.5H19.5C20.6046 19.5 21.5 18.6046 21.5 17.5V6.5ZM10 15.5V8.5L15 12L10 15.5Z" fill="currentColor"/>
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
                  <div className="copyright-text"> */}
                    {/* <p>2026 All rights reserved © by neohospital.com</p> */}
                  <p>© 2026 Neo Hospital. Neo Hospital is a brand owned and operated by Muskan Medical Center Private Limited (CIN:U85191UP2012PTC051632 | GSTIN:09AAICM0482D2ZJ). Registered Office: D 170A, SECTOR 50, NOIDA, Gautam Buddha Nagar, Uttar Pradesh, 201301.</p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                  <div className="footer-menu">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/teams-&-conditions">Terms</Link>
                      </li>
                      <li>
                        <Link to="/privacy-policy">Privacy Policy</Link>
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
