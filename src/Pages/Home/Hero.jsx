import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);
  const textRef = useRef(null);
  const sliderRef = useRef(null);
  const images = [
    "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "2.jpg",
    "1.jpg",
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

  // GSAP text animations
  useEffect(() => {
    gsap.fromTo(
      textRef.current.querySelectorAll(".text-headline, .text-title, .text-descritpion, .text-appointment-btn, .text-stats-container"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  // Slider fade animation
  useEffect(() => {
    const slider = sliderRef.current;
    const animateSlide = () => {
      gsap.to(slider, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setCurrentSlide((prev) => (prev + 1) % images.length);
          gsap.to(slider, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    };

    const interval = setInterval(animateSlide, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="banner-back-color">
      <div className="section-container">
        <div className="hero-section">
          <div className="slider-container" ref={sliderRef} style={{ backgroundImage: `url(${images[currentSlide]})` }}>
            <div className="overlay"></div>
            <div className="content-wrapper">
              <div className="text-section" ref={textRef}>
                <p className="text-headline">Your Health, Our Priority</p>
                <h2 className="text-title">Expert Care for a Healthier Tomorrow</h2>
                <p className="text-descritpion">
                  At Neo Super speciality Hospital, we provide world-class medical care with compassion and expertise.
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
                    <p>+91 1800-123-4567</p>
                  </div>
                  <div className="info-item">
                    <i className="fa fa-ambulance"></i>
                    <p>Ambulance: +91 1800-999-8888</p>
                  </div>
                  <div className="info-divider"></div>
                  <h3>Hospital Hours</h3>
                  <div className="info-item">
                  <i class="fa-solid fa-clock"></i>
                    <p>24/7 Emergency Services</p>
                  </div>
                  <div className="info-item">
                    <i className="fa fa-calendar"></i>
                    <p>OPD: 9:00 AM - 6:00 PM</p>
                  </div>
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
        
        {/* WhatsApp floating button */}
        <a 
          href="https://wa.me/919999999999?text=Hello%20Neo%20Hospital,%20I%20would%20like%20to%20inquire%20about" 
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
        >
         <i class="fa-brands fa-whatsapp"></i>
        </a>
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
