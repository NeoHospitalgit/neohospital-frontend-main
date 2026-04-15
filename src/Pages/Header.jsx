import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import logo from "../Assets/index/logo.png";
import nabhlogo from "../Assets/index/NABH-Logo.png";
import nbl from "../Assets/nbl.png";
import { Link } from "react-router-dom";

import "./Header.css";
import Topbar from "./Topbar";

function Header() {
  const [nav, setNav] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <Topbar />
      <div className="navbar-section">
        <Link to="/">
          <img alt="Neo Super Speciality Hospital" className="neologo" srcSet={logo} />
        </Link>
        <ul className="navbar-items">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/specialities">
              Specialities
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/doctors">
              Doctors
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/services">
              Patient Services
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/blog">
              Blogs
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://www.neohospital.com/gallery"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gallery
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/corporate-policies">
              Corporate Policies
            </Link>
          </li>
           <li className="nav-item">
              <Link className="nav-link" to="/bio-medical-report" onClick={openNav}>
               Bio Medical Rreport
              </Link>
            </li>
        </ul>
        <img alt="Neo Super Speciality Hospital" className="neologo" srcSet={nbl} />
        <img alt="Neo Super Speciality Hospital" className="neologo" srcSet={nabhlogo} />
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar-close">
            <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
          </div>
          <img src={logo} alt="Neo Super Speciality Hospital" className="neologo" />
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" onClick={openNav} to="/">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={openNav}>
                ABOUT US
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/specialities" onClick={openNav}>
                SPECIALITIES
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/doctors" onClick={openNav}>
                MEET OUR DOCTORS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services" onClick={openNav}>
                PATIENT SERVICES
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={openNav}>
                CONTACT
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog" onClick={openNav}>
                BLOG
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.neohospital.com/gallery"
                target="_blank"
                rel="noopener noreferrer"
                onClick={openNav}
              >
                GALLERY
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/corporate-policies" onClick={openNav}>
                CORPORATE POLICIES
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/corporate-policies" onClick={openNav}>
               BIO MEDICAL REPORT
              </Link>
            </li>
            
          </ul>
        </div>
        <div className="mobile-nav">
          <FontAwesomeIcon icon={faBars} onClick={openNav} className="hamb-icon" />
        </div>
      </div>
      <div className="labinmobile">
        <div className="left">
          <div className="labbtn">
            <a
              href="http://lab.neohospital.com/online_his/design/online_lab/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              VIEW ONLINE LAB REPORT
            </a>
          </div>
        </div>
        <div className="right">
          <div className="labbtn">
            <a href="tel:0120-4880000">EMERGENCY CALL</a>
          </div>
        </div>
      </div>
      {/* WhatsApp Floating Icon */}
      <a
        href="https://wa.me/9599388051"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#25D366",
          color: "white",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          zIndex: 1000
        }}
      >
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </a>
    </>
  );
}

export default Header;
