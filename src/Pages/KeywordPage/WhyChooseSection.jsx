import React from "react";
import "./Keyword.css";
import parse from "html-react-parser";
function WelcomeSection({
  title,
  description,
  canHelpTitle,
  canHelpContent,
}) {
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

           <div className="welcome-description">
            {description && parse(description)}
          </div>

          </div>

          {/* Right Card */}

          <div className="col-lg-4">

            <div className="welcome-card">

          <h4>{canHelpTitle}</h4>

            {canHelpContent && parse(canHelpContent)}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default WelcomeSection;
