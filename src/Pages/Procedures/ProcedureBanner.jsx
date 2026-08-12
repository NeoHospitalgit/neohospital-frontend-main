import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaPhoneAlt } from "react-icons/fa";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import "./ProcedureBanner.css";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
import { useAuth } from "../../store/auth";
import BannerImage from "../../Assets/prof.png";

function ProcedureBanner({ procedure }) {
  const [showModal, setShowModal] = useState(true);
  const { API } = useAuth();
  // ==========================
  // API URL
  // ==========================


  // ==========================
  // Dynamic Data
  // ==========================
  const title =
    procedure?.procedures_title || "Procedure";

  const description =
    procedure?.procedures_description || "";

  const bannerImage =
    procedure?.banner_image
      ? procedure.banner_image.startsWith("http")
        ? procedure.banner_image
        : `${API}/${procedure.banner_image.replace(/^\/+/, "")}`
      : BannerImage;

  return (
    <>
      <section className="procedure-banner">
        <div className="container">

          {/* Breadcrumb */}

          <div className="procedure-breadcrumb">
            <Link to="/">Home</Link>

            <span>/</span>

            <Link to="/procedures">
              Procedures
            </Link>

            <span>/</span>

            <strong>{title}</strong>
          </div>

          <div className="procedure-banner-wrapper">

            {/* LEFT */}

            <div className="procedure-banner-content">

              <span className="procedure-badge">
                NEO Hospital
              </span>

              <h1>{title}</h1>

              {/* {description && (
                <p>{description}</p>
              )} */}

              <div className="procedure-btns">

                {showModal && (
        <AppointmentModal
          doctorname={title}
          onClose={() => setShowModal(false)}
        />
      )}
                <a
                  href="tel:+919268880303"
                  className="call-btn"
                >
                  <FaPhoneAlt />
                  Call Now
                </a>

              </div>

            </div>

            {/* RIGHT */}

            <div className="procedure-banner-image">

              <div className="circle-bg"></div>

              <img
                src={bannerImage}
                alt={title}
                onError={(e) => {
                  e.target.src = BannerImage;
                }}
              />

            </div>

          </div>

        </div>
      </section>

     
    </>
  );
}

export default ProcedureBanner;