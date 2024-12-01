import React from 'react'

import patientservice from "../../Assets/Banners/patient-service.jpg"
function OurServicebanner() {
  return (
    <>
      <section className="bannerimg">
        <img src={patientservice} alt="" srcSet="" className="img-fluid" />
      </section>
    </>
  );
}

export default OurServicebanner