import React from "react";
import patientservice from "../../../Assets/Banners/patientservicebanner.png";
import Corevalue from "../../About/Corevalue";
import DiagnosticServiceslist from "./DiagnosticServiceslist";
import './clinicalservice.css';
import Diagnosticinner from "./Diagnosticinner";
function DiagnosticServices() {
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
                <span>Diagnostic Services List</span>
              </h3>
            </div>
            <div>
              <DiagnosticServiceslist />
            </div>
          </div>
          <div className="col-md-8">
            <Diagnosticinner />
          </div>
        </div>
      </section>
    </>
  );
}

export default DiagnosticServices;
