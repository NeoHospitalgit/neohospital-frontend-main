import React from "react";
import patientservice from "../../../Assets/Banners/patientservicebanner.png";
import Corevalue from "../../About/Corevalue";
import LaboratoryServiceslist from "./LaboratoryServiceslist";
import Laboratoryserviceimg from "../../../Assets/Services/services4.jpeg";
import './clinicalservice.css';
function LaboratoryServices() {
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
                <span>Laboratory Services List</span>
              </h3>
            </div>
            <div>
              <LaboratoryServiceslist />
            </div>
          </div>
          <div className="col-md-8">
            <div>
              <img src={Laboratoryserviceimg} alt="" className="img-fluid" />

              <p className="mt-4">
                Laboratory Services refer to a range of medical tests and
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

export default LaboratoryServices;
