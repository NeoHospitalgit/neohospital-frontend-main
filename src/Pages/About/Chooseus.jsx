import React, { useState } from "react";
import "./Chooseus.css";

const Chooseus = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <>
      <section className="chooseus container">
        <div>
          <h3 className="about-title">
            <span>Why Choose Neo Hospital</span>
          </h3>
          <p className="about-description">
            Choosing Neo Hospital means choosing a healthcare provider dedicated
            to accuracy, expertise, and patient well-being, promising a superior
            standard of healthcare for individuals and communities.
          </p>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div>
              <button
                onClick={() => handleTabClick(1)}
                className={activeTab === 1 ? "active" : ""}
              >
                High Quality Lab{" "}
                <i className="fa fa-angle-double-right text-light"></i>
              </button>
            </div>
            <div>
              {" "}
              <button
                onClick={() => handleTabClick(2)}
                className={activeTab === 2 ? "active" : ""}
              >
                Unmatched Expertise{" "}
                <i className="fa fa-angle-double-right text-light"></i>
              </button>
            </div>
            <div>
              <button
                onClick={() => handleTabClick(3)}
                className={activeTab === 3 ? "active" : ""}
              >
                Precise Result{" "}
                <i className="fa fa-angle-double-right text-light"></i>
              </button>
            </div>
            <div>
              <button
                onClick={() => handleTabClick(4)}
                className={activeTab === 4 ? "active" : ""}
              >
                Qualified Staff{" "}
                <i className="fa fa-angle-double-right text-light"></i>
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <div>
              {activeTab === 1 && (
                <>
                  <section className="choosecontent">
                    <p className="about-description">
                      Neo Hospital is committed to delivering a high-quality lab
                      experience by integrating state-of-the-art technology into
                      its facilities. Equipped with cutting-edge diagnostic
                      tools, the modern labs empower medical professionals to
                      make accurate and informed diagnoses. <br />
                      <br />
                      This commitment ensures that patients receive precise and
                      reliable test results, laying the foundation for effective
                      treatment plans. The emphasis on a high-quality lab
                      underscores Neo Hospital's dedication to medical
                      excellence, fostering trust among patients and healthcare
                      providers.
                    </p>
                  </section>
                </>
              )}
              {activeTab === 2 && (
                <>
                  <section className="choosecontent">
                    <p className="about-description">
                      Neo Hospital stands as a beacon of Unmatched Expertise in
                      healthcare, housing a team of highly skilled and
                      experienced medical professionals across diverse
                      specialties. <br />
                      <br /> This collective proficiency ensures that patients
                      receive comprehensive and personalized care, setting
                      Neo Hospital apart as a trusted healthcare provider. The
                      depth of expertise within the medical staff enables the
                      hospital to address complex medical challenges, offering
                      tailored solutions for optimal patient outcomes.
                    </p>
                  </section>
                </>
              )}
              {activeTab === 3 && (
                <>
                  <section className="choosecontent">
                    <p className="about-description">
                      Neo Hospital prioritizes Precise Results, emphasizing
                      accuracy in diagnostic outcomes. This commitment is
                      pivotal in understanding patients' health conditions with
                      precision and facilitating informed treatment decisions.
                      <br />
                      By focusing on delivering reliable and exact results,
                      Neo Hospital ensures that healthcare professionals can
                      tailor treatment plans according to individual needs.
                      <br />
                      <br /> This dedication to precision enhances the overall
                      quality of patient care, instilling confidence in both
                      medical practitioners and those seeking healthcare
                      services.
                    </p>
                  </section>
                </>
              )}
              {activeTab === 4 && (
                <>
                  <section className="choosecontent">
                    <p className="about-description">
                      Neo Hospital takes pride in its Qualified Staff, composed
                      of skilled and well-trained professionals, including
                      doctors, nurses, and support staff.
                      <br /> This team forms the backbone of the hospital,
                      contributing to the delivery of high-quality healthcare
                      services. Their expertise ensures a comprehensive approach
                      to patient care, fostering efficiency and effectiveness in
                      medical operations.
                      <br />
                      <br />
                      Neo Hospital recognizes the significance of a proficient
                      staff in enhancing the overall healthcare experience for
                      patients.
                    </p>
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chooseus;
