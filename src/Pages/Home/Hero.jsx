import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Hero.css";

// WhatsApp SVG Icon Component


function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);
  const images = [
    {
      src: "/2.jpg",
      alt: "Doctor in blue scrubs attending to a patient in a hospital ward.",
      width: 2560,
      height: 1441,
    },
    {
      src: "/1.jpg",
      alt: "NEO Hospital doctors and nurses standing together in a hospital ward.",
      width: 2560,
      height: 1706,
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Scroll-to-top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navigate to contact page
  const handleBookAppointmentClick = () => {
    navigate("/contact");
  };

  // Show/hide scroll-to-top button
  useEffect(() => {
    const onPageScroll = () => {
      setGoUp(window.scrollY > 600);
    };
    window.addEventListener("scroll", onPageScroll);
    return () => window.removeEventListener("scroll", onPageScroll);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % images.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="banner-back-color">
      <div className="section-container">
        <div className="hero-section">
          <div className="slider-container">
            <img
              className="hero-image"
              src={images[currentSlide].src}
              alt={images[currentSlide].alt}
              width={images[currentSlide].width}
              height={images[currentSlide].height}
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
            />
            <div className="overlay"></div>
            <div className="content-wrapper">
              <div className="text-section">
                <p className="text-headline">Your Health, Our Priority</p>
                <h1 className="text-title">Expert Care for a Healthier Tomorrow</h1>
                <p className="text-descritpion">
                  At Neo Super Speciality Hospital, we provide world-class medical care with compassion and expertise.
                </p>
                <div className="button-group">
                  <button
                    className="text-appointment-btn"
                    type="button"
                    onClick={handleBookAppointmentClick}
                  >
                    <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
                  </button>
                  <button className="text-appointment-btn secondary-btn" type="button">
                    <Link to="/about">Read More</Link>
                    <i className="fa fa-caret-right"></i>
                  </button>
                </div>
                <div className="text-stats">
                  <div className="text-stats-container">
                    <p>280 K+</p>
                    <p>Patients Treated</p>
                  </div>
                  <div className="text-stats-container">
                    <p>50 +</p>
                    <p>Expert Doctors</p>
                  </div>
                  <div className="text-stats-container">
                    <p>10 +</p>
                    <p>Years of Experience</p>
                  </div>
                </div>
              </div>
              
              {/* New right side contact info section */}
              <div className="contact-quick-info">
                <div className="quick-info-card">
                  <h3>Emergency Contact</h3>
                  <div className="info-item">
                    <i className="fa fa-phone"></i>
                    <p>
                      Emergency:{" "}
                      <a href="tel:0120-4880088">0120-4880088</a>
                    </p>
                  </div>
                  <div className="info-item">
                    <i className="fa fa-phone"></i>
                    <p>
                      Helpdesk:{" "}
                      <a href="tel:0120-4880000">0120-4880000</a>
                    </p>
                  </div>
                  <div className="info-item">
                    <i className="fa fa-phone"></i>
                    <p>
                      Helpdesk:{" "}
                      <a href="tel:0120-3120000">0120-3120000</a>
                    </p>
                  </div>
                  <div className="info-divider"></div>
                  <h3>Hospital Hours</h3>
                  <div className="info-item">
                   <i className="fa fa-hospital-o"></i>
                    <p>24/7 Services Available</p>
                  </div>
{/*                   <div className="info-item">
                    <i className="fa fa-user-md"></i>
                    <p>24/7 Available OPD </p>
                  </div> */}
                  <div className="info-divider"></div>
                  <div className="quick-actions">
                    <Link to="/doctors" className="quick-link">Find a Doctor</Link>
                    <Link to="/services" className="quick-link">Our Services</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* WhatsApp floating button with SVG icon */}
       
        <div
          onClick={scrollToTop}
          className={`scroll-up ${goUp ? "show-scroll" : ""}`}
        >
          <FontAwesomeIcon icon={faAngleUp} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
