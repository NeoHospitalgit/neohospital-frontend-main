import React from "react";
import patientservice from "../../../Assets/Banners/patientservicebanner.png";
import Corevalue from "../../About/Corevalue";
import Supportserviceslist from "./Supportserviceslist";
import Supportservicesimg from "../../../Assets/Services/services.jpeg";
import './clinicalservice.css';
function Supportservices() {
  return (
    <>
      <section className="bannerimg">
        <img src={patientservice} alt="" srcSet="" className="img-fluid" />
      </section>
      <Corevalue />

      <section className="container ClinicalService">
        <div className="row">
          <div className="col-md-4">
            <div>
              <h3 className="about-title">
                <span>Profession Services List</span>
              </h3>
            </div>
            <div>
              <Supportserviceslist />
            </div>
          </div>
          <div className="col-md-8">
            <div>
              <img src={Supportservicesimg} alt="" className="img-fluid" />
              <div>
                <h3 className="about-title mt-4">
                  <span>Profession Services</span>
                </h3>
              </div>
              <p className="mt-4">
                Profession Services refer to a range of medical tests and
                procedures performed by healthcare professionals to identify and
                diagnose diseases, conditions, or disorders in individuals.
                These services play a crucial role in healthcare by helping
                physicians and other healthcare providers make informed
                decisions about patient care.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Supportservices;
