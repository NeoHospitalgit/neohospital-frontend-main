import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../Assets/index/logo.png";
import nabhlogo from "../Assets/index/NABH-Logo.png";
import nbl from "../Assets/nbl.png";
import { Link } from "react-router-dom";

// import { useAuth } from "../store/auth";

// import { toast } from "react-toastify";

import "./Header.css";
import Topbar from "./Topbar";

function Header() {
  const [nav, setNav] = useState(false);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };
  // const { isLoggedIn } = useAuth();

  return (
    <>
      <Topbar />

      <div className="navbar-section">
        <Link to="/">
          <img alt="Neo Hospital" className="neologo" srcSet={logo} />
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
          {/* <li className="nav-item">
            <Link className="nav-link" to="/international-patient">
              International Patient
            </Link>
          </li> */}
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
          {/* 
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  LOGOUT
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  DASHBOARD
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <button className="btn btn-outline-dark px-3">Login</button>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )} */}
        </ul>
        <img alt="Neo Hospital" className="neologo" srcSet={nbl} />
        <img alt="Neo Hospital" className="neologo" srcSet={nabhlogo} />
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar-close">
            <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
          </div>
          <img src={logo} alt="Neo Hospital" className="neologo" srcSet="" />
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                onClick={openNav}
                aria-current="page"
                to="/"
              >
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
            {/* login */}
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={openNav}>
                LOGIN
              </Link>
            </li>

            <li className="nav-item labbtn">
              <Link className="nav-link" to="/contact">
                Book An Appointment
              </Link>
            </li>
            <div className="d-flex mt-3">
              <div className="mx-3 hospital">
                <i className="fa fa-phone"></i>
              </div>
              <p>
                Emergency Call <br />
                <a href="tel:0120-4880000">0120-4880000 / </a>
                <a href="tel:0120-3120000"> 0120-3120000 </a>
              </p>
            </div>
          </ul>
        </div>
        <div className="mobile-nav">
          <FontAwesomeIcon
            icon={faBars}
            onClick={openNav}
            className="hamb-icon"
          />
        </div>
      </div>
      <div className="labinmobile">
        <div className="left">
          <div className="labbtn">
            <a href="http://lab.neohospital.com/online_his/design/online_lab/default.aspx"
              target="_blank">
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
    </>
  );
}

export default Header;
