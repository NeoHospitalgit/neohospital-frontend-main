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
          Welcome to Neo Super Specialty Hospital, a trusted name in advanced and compassionate healthcare. With 250+ beds, modern infrastructure, and a full range of clinical services, we are dedicated to providing high-quality, affordable, and patient-centered care. Our hospital is equipped with modular operation theatres, fully monitored ICUs, 24/7 emergency & trauma services, in-house pharmacy, advanced diagnostics, and ambulance support—all designed to offer seamless treatment in a safe and healing environment.

One of our most renowned centers is the Neuro Department, where we specialize in treating conditions related to the brain, spine, and nervous system. Led by highly experienced neurologists and neurosurgeons, our Neuro Unit handles cases such as stroke, epilepsy, brain tumors, spinal disorders, neuropathies, Parkinson’s disease, and more. Equipped with high-resolution MRI, CT scan, EEG, and neuro-navigation systems, we ensure early detection and precise treatment with minimal risk and faster recovery.

Apart from Neurosciences, we also offer super specialty care in Cardiology, Oncology, Orthopedics, Gastroenterology, Pulmonology, Nephrology, Urology, and Critical Care, with departments staffed by top experts in their fields.

Our hospital is designed to cater to both emergency and long-term care needs, with a focus on comfort, safety, and dignity. We also provide preventive health check-ups, post-treatment rehabilitation services, and counseling support for a holistic approach to wellness.

At Neo Super Specialty Hospital, we’re not just treating patients—we’re building healthier lives, one family at a time.
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
