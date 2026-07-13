import React from "react";
import "./Keyword.css";

function WelcomeSection({ title, description }) {
  return (
    <section className="welcome-section">
      <div className="container">

        <div className="row align-items-center">

          {/* Left Content */}

          <div className="col-lg-8">

            <span className="welcome-tag">
              Welcome to NEO Super Speciality Hospital
            </span>

            <h2 className="welcome-title">
              {title}
            </h2>

            <p className="welcome-description">
              {description}
            </p>

          </div>

          {/* Right Card */}

          <div className="col-lg-4">

            <div className="welcome-card">

              <h4>Why Choose NEO?</h4>

              <ul>

                <li> Experienced Doctors</li>

                <li> Advanced Technology</li>

                <li> NABH Accredited Hospital</li>

                <li> 24×7 Emergency Care</li>

                <li> Patient-Centric Treatment</li>

              </ul>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default WelcomeSection;