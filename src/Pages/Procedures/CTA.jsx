import React, { useState } from "react";
import { FaPhoneAlt, FaCalendarCheck } from "react-icons/fa";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import "./ProceduresPage.css";

function CTA({ pageData }) {
  const [showAppointment, setShowAppointment] = useState(false);

  return (
    <>
      <section className="procedure-cta">

        <div className="procedure-cta-content">

          <span>NEO Hospital</span>

          <h2>
            {pageData?.cat_title || "Looking for the Right Treatment?"}
          </h2>

         
           <div
  dangerouslySetInnerHTML={{
    __html:
      pageData?.cat_content ||
      "Connect with our experienced specialists and get the best treatment with personalized care at NEO Hospital.",
  }}
/>
         

          <div className="procedure-cta-buttons">

           <AppointmentModal
        show={showAppointment}
        onClose={() => setShowAppointment(false)}
        doctorname=""
      />
            <a
              href="tel:01204880088"
              className="cta-btn btn-outlines"
            >
              <FaPhoneAlt />
              Call Now
            </a>

          </div>

        </div>

      </section>

      
    </>
  );
}

export default CTA;
