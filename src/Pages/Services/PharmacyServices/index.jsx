import React from "react";
import patientservice from "../../../Assets/Banners/patientservicebanner.png";
import Corevalue from "../../About/Corevalue";
import Pharmacyserviceslist from "./Pharmacyserviceslist";
import Pharmacyservicesimg from "../../../Assets/Services/Pharmacy.jpeg";
import './clinicalservice.css';
function Pharmacyservices() {
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
                <span>Pharmacy Services List</span>
              </h3>
            </div>
            <div>
              <Pharmacyserviceslist />
            </div>
          </div>
          <div className="col-md-8">
            <div>
              <img src={Pharmacyservicesimg} alt="" className="img-fluid" />
              <div>
                <h3 className="about-title">
                  <span>Pharmacy Services</span>
                </h3>
              </div>
              <p className="mt-4">
                Pharmacy Services refer to a range of medical tests and
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

export default Pharmacyservices;
