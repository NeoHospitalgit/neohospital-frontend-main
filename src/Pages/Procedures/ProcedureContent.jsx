import React from "react";
import "./ProcedureContent.css";
function ProcedureContent() {
  return (
    <div className="procedure-content">

      {/* Overview */}

      <section className="content-section">

        <h2>Procedure Overview</h2>

        <p>
          Knee replacement surgery is a highly successful orthopaedic procedure
          performed to replace damaged knee joints with artificial implants.
          The surgery helps relieve chronic pain, improves mobility, and
          restores quality of life.
        </p>

        <p>
          At NEO Hospital, our experienced orthopaedic surgeons perform
          advanced knee replacement procedures using minimally invasive
          techniques, modern operation theatres and world-class implants for
          faster recovery.
        </p>

      </section>


      {/* Symptoms */}

      <section className="content-section">

        <h2>Symptoms</h2>

        <ul>

          <li>Persistent knee pain while walking</li>

          <li>Difficulty climbing stairs</li>

          <li>Swelling around the knee joint</li>

          <li>Joint stiffness</li>

          <li>Reduced range of movement</li>

          <li>Pain even during rest</li>

        </ul>

      </section>


      {/* Candidate */}

      <section className="content-section">

        <h2>Who is the Right Candidate?</h2>

        <p>
          Knee replacement is recommended for patients suffering from severe
          osteoarthritis, rheumatoid arthritis or traumatic knee injuries where
          medications and physiotherapy no longer provide relief.
        </p>

        <ul>

          <li>Age above 50 years (generally)</li>

          <li>Severe joint degeneration</li>

          <li>Difficulty performing daily activities</li>

          <li>Failed conservative treatment</li>

        </ul>

      </section>


      {/* Contraindications */}

      <section className="content-section">

        <h2>Who Should Avoid This Procedure?</h2>

        <ul>

          <li>Active infection</li>

          <li>Uncontrolled diabetes</li>

          <li>Poor skin condition around knee</li>

          <li>Severe vascular disease</li>

        </ul>

      </section>


      {/* Preparation */}

      <section className="content-section">

        <h2>Before the Procedure</h2>

        <p>
          Before surgery, the doctor performs a detailed examination including
          blood investigations, X-rays, ECG and other diagnostic tests to
          evaluate overall fitness for surgery.
        </p>

        <ul>

          <li>Blood Tests</li>

          <li>X-Ray</li>

          <li>MRI (if required)</li>

          <li>Physician Clearance</li>

          <li>Anaesthesia Assessment</li>

        </ul>

      </section>


      {/* Procedure */}

     


      {/* Recovery */}

      <section className="content-section">

        <h2>Recovery</h2>

        <p>
          Patients usually start walking within 24 hours after surgery.
          Complete recovery depends on age, overall health and physiotherapy.
        </p>

      </section>


      {/* Benefits */}

      <section className="content-section">

        <h2>Benefits</h2>

        <ul>

          <li>Relieves chronic pain</li>

          <li>Improves mobility</li>

          <li>Better quality of life</li>

          <li>Long-lasting implant</li>

          <li>Improved joint function</li>

        </ul>

      </section>

    </div>
  );
}

export default ProcedureContent;