import React from "react";
import { Link } from "react-router-dom";
// import { useAuth } from "../store/auth";
import "./Topbar.css";
// const { isLoggedIn } = useAuth();

function Topbar() {
  return (
    <>
      <section className="sahiltop">
        <div className="header">
          <div className="icon">
            <i className="fa fa-phone"></i>
            <a>Emergency Number - </a>
            <a href="tel:0120-3120000"> 0120-3120000</a>
          </div>
          <div className="icon">
            <i className="fa fa-phone"></i>
            <a href="tel:0120-4880000">0120-4880000</a>
            {/* <a href="tel:0120-4880000">0120-4880000 /</a> */}
            {/* <a href="tel:0120-3120000"> 0120-3120000</a> */}
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

          {/* <div className="icon"> */}
          {/* <Link className="btn-btn-neo-logocolor" to="/login">
              Login
            </Link> */}

          {/*  {isLoggedIn ? (
              <>
                <Link className="btn-btn-neo-logocolor" to="/logout">
                  LOGOUT
                </Link>

                <Link className="btn-btn-neo-logocolor" to="/admin">
                  DASHBOARD
                </Link>
              </>
            ) : (
              <>
                <Link className="btn-btn-neo-logocolor" to="/login">
                  <button className="btn btn-outline-dark px-3">Login</button>
                </Link>

                <Link className="btn-btn-neo-logocolor" to="/register">
                  Register
                </Link>
              </>
            )} */}
          {/* </div> */}
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
            <svg className="ticon ddddicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
          </a>
        </div>
      </section>
      {/* 
      <section className="neoheader neomiddel">
        <div className="row topbar px-2">
          <div className="col-md-2">
            <Link to="/">
              <img
                src={logo}
                alt="Neo Hospital"
                className="neologo"
                srcSet=""
              />
            </Link>
          </div>
          <div className="col-md-2">
            <div className="d-flex">
              <div className="mx-3 hospital">
                <i className="fa fa-phone"></i>
              </div>
              <p>
                <a href="tel:0120-4880000">
                  Emergency Call
                  <br /> 0120-4880000 <br /> 0120-3120000
                </a>
              </p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="d-flex">
              <div className="mx-3 hospital">
                <i className="fa fa-calendar-o text-warning"></i>
              </div>
              <p>
                <a href="http://103.75.34.114/online_his/design/online_lab/default.aspx">
                  View Online <br /> LAB Report
                </a>
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="d-flex">
              <div className="mx-3 hospital">
                <i className="fa fa-envelope text-primary"></i>
              </div>
              <p>
                <a href="mailto:info@neohospital.com">
                  Email-id <br />
                  info@neohospital.com
                </a>
              </p>
            </div>
          </div>
          <div className="col-md-1">
            <div>
              <img
                src={nabhlogo}
                alt="Neo Hospital"
                className="neologo"
                srcSet=""
              />
            </div>
          </div>
          <div className="col-md-1">
            <div>
              <img
                src={nbl}
                alt="Neo Hospital"
                className="neologo"
                srcSet=""
              />
            </div>
          </div> 
          <div className="col-md-2">
            <img src={nbl} alt="Neo Hospital" className="neologo" srcSet="" />
          </div>
        </div>
      </section> */}
    </>
  );
}

export default Topbar;
