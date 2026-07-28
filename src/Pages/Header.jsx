import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

import logo from "../Assets/index/logo.png";
import nabhlogo from "../Assets/index/NABH-Logo.png";
import nbl from "../Assets/nbl.png";

import "./Header.css";
import Topbar from "./Topbar";

  const API = "http://localhost:5001/api";
const specialities = [
  "Internal Medicine",
  "Neurology",
  "Gastrosciences",
  "Cardiology",
  "Pulmonology",
  "Dental",
  "Dermatology",
  "Dietetics",
  "ENT",
  "Gynaecology",
  "Clinical Laboratory",
  "Anaesthesiology",
  "Emergency Medicine",
  "Clinical Psychology",
  "Nephrology",
  "Neurosurgery",
  "Orthopedics",
  "Opthalmology",
  "Physiotherapy",
  "Psychiatry",
  "Neonatology & Peadiatrics",
  "Cosmetic & Plastic Surgery",
  "Cath Lab",
  "General & Laparoscopic Surgery",
  "Urology",
  "Radiology",
  "Medical Oncology",
  "Oncology Surgery",
  "Occupational Therapy",
  "Audiologist and Speech Therapist",
];

function Header() {

  const [nav, setNav] = useState(false);

  const [megaMenu, setMegaMenu] = useState(false);

  const [mobileMegaMenu, setMobileMegaMenu] = useState(false);

  const [resourcesMenu, setResourcesMenu] = useState(false);

  const [mobileResourcesMenu, setMobileResourcesMenu] = useState(false);

  /* Procedures */

  const [procedureMenu, setProcedureMenu] = useState(false);

  const [mobileProcedureMenu, setMobileProcedureMenu] = useState(false);

  const [procedures, setProcedures] = useState([]);

  const openNav = () => {
    setNav(!nav);
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/&/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  const loadProcedures = async () => {
    try {

     const res = await axios.get(`${API}/adminv12/public-procedures`);

      if (res.data.success) {
        setProcedures(res.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProcedures();
  }, []);

  return (
    <>
      <Topbar />

      <div className="navbar-section">

        <Link to="/">
          <img
            src={logo}
            alt="Neo Super Speciality Hospital"
            className="neologo"
          />
        </Link>

        <ul className="navbar-items">
          {/* ================= HOME ================= */}

          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>

          {/* ================= ABOUT ================= */}

          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About Us
            </Link>
          </li>

          {/* ================= SPECIALITIES ================= */}

          <li
            className="nav-item mega-parent"
            onMouseEnter={() => setMegaMenu(true)}
            onMouseLeave={() => setMegaMenu(false)}
          >
            <Link className="nav-link" to="/specialities">
              Specialities
              <FontAwesomeIcon
                icon={faChevronDown}
                className="dropdown-icon"
              />
            </Link>

            <div className={`mega-menu ${megaMenu ? "show" : ""}`}>

              {/* Column 1 */}

              <div className="mega-column">
                {specialities.slice(0, 10).map((item) => (
                  <Link
                    key={item}
                    className="mega-link"
                    to={`/${slugify(item)}`}
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Column 2 */}

              <div className="mega-column">
                {specialities.slice(10, 20).map((item) => (
                  <Link
                    key={item}
                    className="mega-link"
                    to={`/${slugify(item)}`}
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Column 3 */}

              <div className="mega-column">
                {specialities.slice(20).map((item) => (
                  <Link
                    key={item}
                    className="mega-link"
                    to={`/${slugify(item)}`}
                  >
                    {item}
                  </Link>
                ))}
              </div>

            </div>
          </li>


          {/* ================= PROCEDURES ================= */}

          <li
            className="nav-item mega-parent"
            onMouseEnter={() => setProcedureMenu(true)}
            onMouseLeave={() => setProcedureMenu(false)}
          >
            <Link className="nav-link" to="/procedures">
              Procedures
              <FontAwesomeIcon
                icon={faChevronDown}
                className="dropdown-icon"
              />
            </Link>

            <div className={`mega-menu ${procedureMenu ? "show" : ""}`}>

              <div className="mega-column">
                {procedures.slice(0, 10).map((item) => (
                  <Link
                    key={item._id}
                    className="mega-link"
                    to={`/procedures/${item.procedures_slug}`}
                  >
                    {item.procedures_title}
                  </Link>
                ))}
              </div>

              <div className="mega-column">
                {procedures.slice(10, 20).map((item) => (
                  <Link
                    key={item._id}
                    className="mega-link"
                    to={`/procedures/${item.procedures_slug}`}
                  >
                    {item.procedures_title}
                  </Link>
                ))}
              </div>

              <div className="mega-column">
                {procedures.slice(20).map((item) => (
                  <Link
                    key={item._id}
                    className="mega-link"
                    to={`/procedures/${item.procedures_slug}`}
                  >
                    {item.procedures_title}
                  </Link>
                ))}
              </div>

            </div>
          </li>

          {/* ================= DOCTORS ================= */}

          <li className="nav-item">
            <Link className="nav-link" to="/doctors">
              Doctors
            </Link>
          </li>
          {/* ================= PATIENT SERVICES ================= */}

          <li className="nav-item">
            <Link className="nav-link" to="/services">
              Patient Services
            </Link>
          </li>

          {/* ================= CONTACT ================= */}

          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>

          {/* ================= BLOG ================= */}

          <li className="nav-item">
            <Link className="nav-link" to="/blog">
              Blogs
            </Link>
          </li>

          {/* ================= GALLERY ================= */}

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

          {/* ================= RESOURCES ================= */}

          <li
            className="nav-item resources-parent"
            onMouseEnter={() => setResourcesMenu(true)}
            onMouseLeave={() => setResourcesMenu(false)}
          >
            <span className="nav-link">
              Resources
              <FontAwesomeIcon
                icon={faChevronDown}
                className="dropdown-icon"
              />
            </span>

            <div className={`resources-dropdown ${resourcesMenu ? "show" : ""}`}>
              <Link
                className="resources-link"
                to="/corporate-policies"
              >
                Corporate Policies
              </Link>

              <Link
                className="resources-link"
                to="/bio-medical-report"
              >
                Bio Medical Report
              </Link>
            </div>
          </li>

        </ul>

        <img
          src={nbl}
          alt="NBL"
          className="neologo"
        />

        <img
          src={nabhlogo}
          alt="NABH"
          className="neologo"
        />

        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>

          <div
            className="mobile-navbar-close"
            onClick={openNav}
          >
            <FontAwesomeIcon
              icon={faXmark}
              className="hamb-icon"
            />
          </div>

          <img
            src={logo}
            alt="Neo Super Speciality Hospital"
            className="neologo"
          />

          <ul className="navbar-nav">
            {/* ================= MOBILE HOME ================= */}

            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/"
                onClick={openNav}
              >
                HOME
              </Link>
            </li>

            {/* ================= MOBILE ABOUT ================= */}

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                onClick={openNav}
              >
                ABOUT US
              </Link>
            </li>

            {/* ================= MOBILE SPECIALITIES ================= */}

            <li className="nav-item">

              <div
                className="mobile-speciality-title"
                onClick={() => setMobileMegaMenu(!mobileMegaMenu)}
              >
                <span>SPECIALITIES</span>

                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`dropdown-icon ${mobileMegaMenu ? "rotate" : ""
                    }`}
                />
              </div>

              <div
                className={`mobile-mega-menu ${mobileMegaMenu ? "show-mobile-menu" : ""
                  }`}
              >

                {specialities.map((item) => (

                  <Link
                    key={item}
                    className="mobile-mega-link"
                    to={`/${slugify(item)}`}
                    onClick={() => {
                      setMobileMegaMenu(false);
                      openNav();
                    }}
                  >
                    {item}
                  </Link>

                ))}

              </div>

            </li>

            {/* ================= MOBILE PROCEDURES ================= */}

            <li className="nav-item">

              <div
                className="mobile-speciality-title"
                onClick={() => setMobileProcedureMenu(!mobileProcedureMenu)}
              >
                <span>PROCEDURES</span>

                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`dropdown-icon ${mobileProcedureMenu ? "rotate" : ""
                    }`}
                />
              </div>

              <div
                className={`mobile-mega-menu ${mobileProcedureMenu ? "show-mobile-menu" : ""
                  }`}
              >

                {procedures.slice(0, 30).map((item) => (

                  <Link
                    key={item._id}
                    className="mobile-mega-link"
                    to={`/procedures/${item.procedures_slug}`}
                    onClick={() => {
                      setMobileProcedureMenu(false);
                      openNav();
                    }}
                  >
                    {item.procedures_title}
                  </Link>

                ))}

              </div>

            </li>

            {/* ================= MOBILE DOCTORS ================= */}

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/doctors"
                onClick={openNav}
              >
                MEET OUR DOCTORS
              </Link>
            </li>

            {/* ================= MOBILE PATIENT SERVICES ================= */}

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/services"
                onClick={openNav}
              >
                PATIENT SERVICES
              </Link>
            </li>
            {/* ================= MOBILE CONTACT ================= */}

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                onClick={openNav}
              >
                CONTACT
              </Link>
            </li>

            {/* ================= MOBILE BLOG ================= */}

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/blog"
                onClick={openNav}
              >
                BLOG
              </Link>
            </li>

            {/* ================= MOBILE GALLERY ================= */}

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

            {/* ================= MOBILE RESOURCES ================= */}

            <li className="nav-item">

              <div
                className="mobile-speciality-title"
                onClick={() =>
                  setMobileResourcesMenu(!mobileResourcesMenu)
                }
              >
                <span>RESOURCES</span>

                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`dropdown-icon ${mobileResourcesMenu ? "rotate" : ""
                    }`}
                />
              </div>

              <div
                className={`mobile-mega-menu ${mobileResourcesMenu ? "show-mobile-menu" : ""
                  }`}
              >

                <Link
                  className="mobile-mega-link"
                  to="/corporate-policies"
                  onClick={() => {
                    setMobileResourcesMenu(false);
                    openNav();
                  }}
                >
                  Corporate Policies
                </Link>

                <Link
                  className="mobile-mega-link"
                  to="/bio-medical-report"
                  onClick={() => {
                    setMobileResourcesMenu(false);
                    openNav();
                  }}
                >
                  Bio Medical Report
                </Link>

              </div>

            </li>


          </ul>
        </div>

        <div className="mobile-nav">
          <FontAwesomeIcon
            icon={faBars}
            className="hamb-icon"
            onClick={openNav}
          />
        </div>

      </div>
      {/* ==========================
          MOBILE LAB BUTTONS
    ========================== */}

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
            <a href="tel:01204880000">
              EMERGENCY CALL
            </a>
          </div>
        </div>

      </div>

      {/* ==========================
          WHATSAPP
    ========================== */}

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
          color: "#fff",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 8px rgba(0,0,0,.2)",
          zIndex: 9999,
        }}
      >
        <FontAwesomeIcon
          icon={faWhatsapp}
          size="2x"
        />
      </a>

    </>
  );

}

export default Header;
