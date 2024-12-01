import React from "react";
import clinicalserviceimg from "../../../Assets/Services/service2.jpeg";

function Diagnosticinner() {
  return (
    <>
      <div>
        <img src={clinicalserviceimg} alt="" className="img-fluid" />

        <p className="mt-4">
          Diagnostic services refer to a range of medical tests and procedures
          performed by healthcare professionals to identify and diagnose
          diseases, conditions, or disorders in individuals. These services play
          a crucial role in healthcare by helping physicians and other
          healthcare providers make informed decisions about patient care.
        </p>
      </div>
    </>
  );
}

export default Diagnosticinner;
