import React from "react";
import {
  FaUserMd,
  FaHospital,
  FaHeartbeat,
  FaAmbulance,
  FaAward,
  FaStethoscope,
} from "react-icons/fa";
import "./Keyword.css";

function WhyChooseSection() {
  const features = [
    {
      icon: <FaUserMd />,
      title: "Expert Doctors",
      description:
        "Highly experienced specialists providing world-class medical care.",
    },
    {
      icon: <FaHospital />,
      title: "Advanced Technology",
      description:
        "Modern equipment and advanced diagnostic facilities.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Patient-Centric Care",
      description:
        "Personalized treatment plans focused on every patient's needs.",
    },
    {
      icon: <FaAmbulance />,
      title: "24×7 Emergency",
      description:
        "Round-the-clock emergency and critical care services.",
    },
    {
      icon: <FaAward />,
      title: "NABH Accredited",
      description:
        "Committed to maintaining the highest standards of healthcare.",
    },
    {
      icon: <FaStethoscope />,
      title: "Comprehensive Treatment",
      description:
        "Complete diagnosis, treatment, and follow-up under one roof.",
    },
  ];

  return (
    <section className="why-section">
      <div className="container">

        <div className="section-heading">
          <span className="section-tag">
            Why Choose Us
          </span>

          <h2>
            Why Choose NEO Hospital?
          </h2>

          <p>
            We combine experienced doctors, advanced technology,
            and compassionate care to provide the best possible
            treatment for every patient.
          </p>
        </div>

        <div className="row">

          {features.map((item, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>

              <div className="why-card">

                <div className="why-icon">
                  {item.icon}
                </div>

                <h4>
                  {item.title}
                </h4>

                <p>
                  {item.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseSection;