import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "./Hero.css";

// WhatsApp SVG Icon Component
const WhatsAppIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.064 3.488"/>
  </svg>
);

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
                    <p> 0120-4880000</p>
                  </div>
                  <div className="info-item">
                    <i className="fa fa-ambulance"></i>
                    <p>Ambulance: 0120-3120000</p>
                  </div>
                  <div className="info-divider"></div>
                  <h3>Hospital Hours</h3>
                  <div className="info-item">
                    <i className="fa-solid fa-clock"></i>
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
        
        {/* WhatsApp floating button with SVG icon */}
        <a 
          href="https://wa.me/91 9599388049?text=Hello%20Neo%20Hospital,%20I%20would%20like%20to%20inquire%20about" 
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
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
