import React, { useEffect, useState, useRef } from "react";
import Banner from "./Homeimages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import vidnew from "../../Assets/Banners/finalvid.mp4";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    navigate("/contact");
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
    }
  }, []);

  return (
    <>
      <section className="banner-back-color">
        <div className="section-container">
          <div className="hero-section">
            <div className="row">
              <div className="col-md-6">
                <div className="text-section">
                  <p className="text-headline">{Banner.Health}</p>
                  <h2 className="text-title">{Banner.Heading}</h2>
                  <p className="text-descritpion">{Banner.paragraph}</p>
                  <button
                    className="text-appointment-btn"
                    type="button"
                    onClick={handleBookAppointmentClick}
                  >
                    <FontAwesomeIcon icon={faCalendarCheck} /> {Banner.button}
                  </button>
                  <button className="text-appointment-btn" type="button" style={{ margin: "5px 38px" }}>
                    <FontAwesomeIcon />
                    <Link to="/about">Read More</Link>
                    <i className="fa fa-caret-right"></i>
                  </button>
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
              </div>
              <div className="col-md-6">
                <video ref={videoRef} autoPlay loop muted>
                  <source src={vidnew} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <div
            onClick={scrollToTop}
            className={`scroll-up ${goUp ? "show-scroll" : ""}`}
          >
            <FontAwesomeIcon icon={faAngleUp} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
