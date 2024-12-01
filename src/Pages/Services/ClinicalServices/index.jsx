import React from "react";
import patientservice from "../../../Assets/Banners/patientservicebanner.png";
import Corevalue from "../../About/Corevalue";
import ClinicalServiceslist from "./ClinicalServiceslist";
import clinicalserviceimg from "../../../Assets/Services/services.jpeg"
import './clinicalservice.css';
function ClinicalServices() {
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
                <span>Clinical Services List</span>
              </h3>
            </div>
            <div>
              <ClinicalServiceslist />
            </div>
          </div>
          <div className="col-md-8">
            <div>
              <img src={clinicalserviceimg} alt="" className="img-fluid" />
              
              <p className="mt-4">
                Clinical services generally refer to the range of healthcare
                services provided by trained and licensed healthcare
                professionals to individuals seeking medical care. These
                services are typically focused on the diagnosis, treatment, and
                prevention of various medical conditions. Clinical services can
                be provided in a variety of settings, including hospitals,
                clinics, private practices, and other healthcare facilities.
                Here are some common types of clinical services:
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClinicalServices;
