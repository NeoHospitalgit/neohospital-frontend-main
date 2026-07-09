import React from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";

function Topbar() {
  return (
    <>
      <section className="sahiltop">
        <div className="header">
          <div className="icon">
            <i className="fa fa-phone"></i>
            <a>Emergency Number - </a>
            <a href="tel:0120-4880088"><span className="emergency-highlight">0120-4880088</span></a>
          </div>
          <div className="icon">
            <i className="fa fa-phone"></i>
            <a href="tel:0120-3120000"><span className="emergency-highlight">0120-3120000</span></a>
          </div>
          <div className="icon">
            <i className="fa fa-calendar"></i>
            <a
              href="http://lab.neohospital.com/online_his/design/online_lab/default.aspx"
              target="_blank"
            >
              Lab Report
            </a>
          </div>
          <div className="icon">
            <i className="fa fa-envelope-open-o"></i>
            <a href="mailto:info@neohospital.com">info@neohospital.com</a>
          </div>
        </div>
        <div className="social-media-icons">
          <a
            href="https://www.facebook.com/neohospitalinnoida"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-facebook-f fb ticon"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/neohospitalnoida/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-linkedin linkedin ticon"></i>
          </a>
          <a
            href="https://www.instagram.com/neohospitalnoida/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-instagram insta ticon"></i>
          </a>
          <a
            href="https://twitter.com/neo_hospital"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="ticon ddddicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
          </a>
          <a
            href="https://youtube.com/@neohospitalofficial?si=aDuqZU-awqibJiUB"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="ticon ddddicon youtube-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path fill="#FF0000" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}

export default Topbar;
