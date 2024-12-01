import React from "react";
import Doctor from "../../Assets/doctor-group.png";
import "./Aboutus.css";

function Aboutus() {
  return (
    <>
      <section className="container-fluid">
        <div className="about-section container" id="about">
          <h3 className="about-title">
            <span>
              Neo Hospital - A Commitment to Excellence in Healthcare
            </span>
          </h3>
          <p className="about-description">
            Welcome to Neo Hospital, where your health and well-being are our
            utmost priorities. Situated at the forefront of healthcare
            innovation and patient-centered care, Neo Hospital stands as a
            symbol of excellence, compassion, and integrity. In this article,
            we delve deeper into our mission, values, services, and the
            dedicated team that drives us forward, shaping the future of
            healthcare.
          </p>
        </div>
        <div className="about-section" id="about">
          <div className="row">
            <div className="col-md-5">
              <img src={Doctor} alt="Doctor Group" className="img-fluid" />
            </div>
            <div className="col-md-7">
              <div className="ourmission">
                <h3 className="about-title">
                  <span>Vision and Mission</span>
                </h3>
                <div className="row">
                  <div className="col-md-6">
                    <h4>Vision</h4>
                    <p className="about-description">
                      Our vision at Neo Hospital is to redefine healthcare by
                      setting new standards in clinical excellence, patient
                      satisfaction, and community engagement. We aspire to
                      create an ecosystem where healthcare is not just a
                      service but a comprehensive experience that addresses
                      the diverse needs of individuals and families across the
                      region.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h4>Mission</h4>
                    <p className="about-description">
                      Our mission is rooted in a commitment to provide
                      unparalleled healthcare services through cutting-edge
                      technology, continuous learning, and collaboration. We
                      aim to foster an environment that encourages innovation,
                      empowers healthcare professionals, and ensures that
                      every patient receives personalized care tailored to
                      their unique needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Aboutus;
