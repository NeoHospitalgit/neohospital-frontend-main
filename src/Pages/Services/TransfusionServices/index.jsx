import React from "react";
import patientservice from "../../../Assets/Banners/patientservicebanner.png";
import Corevalue from "../../About/Corevalue";
import Transfusionserviceslist from "./Transfusionserviceslist";
import Transfusionservicesimg from "../../../Assets/Services/Transfusion.jpeg";
import './clinicalservice.css';
function Transfusionservices() {
  return (
    <>
      <section className="bannerimg">
        <img src={patientservice} alt="" srcset="" className="img-fluid" />
      </section>
      <Corevalue />

      <section className="container ClinicalService">
        <div className="row">
          <div className="col-md-4">
            <div>
              <h3 className="about-title">
                <span>Transfusion Services List</span>
              </h3>
            </div>
            <div>
              <Transfusionserviceslist />
            </div>
          </div>
          <div className="col-md-8">
            <div>
              <img src={Transfusionservicesimg} alt="" className="img-fluid" />
              <div>
                <h3 className="about-title mt-4">
                  <span>Transfusion Services</span>
                </h3>
              </div>
              <p className="mt-4">
                Transfusion Services refer to a range of medical tests and
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

export default Transfusionservices;
