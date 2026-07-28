import React from "react";
import parse from "html-react-parser";
import "./ProcedureContent.css";

function ProcedureContent({ procedure }) {
  if (!procedure) return null;

  const content =
    procedure?.procedures_content ||
    procedure?.content ||
    "";

  const title =
    procedure?.content_title ||
    procedure?.procedures_title ||
    "Procedure Details";

  return (
    <div className="procedure-content">

      {/* Main Content */}

      <section className="content-section">

        {/* <h2>{title}</h2> */}

        {content ? (
          <div className="content-description">
            {parse(content)}
          </div>
        ) : (
          <p>
            Procedure details are not available at the
            moment.
          </p>
        )}

      </section>

      {/* Benefits */}

      {procedure?.benefits && (
        <section className="content-section">

          <h2>Benefits</h2>

          <div className="content-description">
            {parse(procedure.benefits)}
          </div>

        </section>
      )}

      {/* Risks */}

      {procedure?.risks && (
        <section className="content-section">

          <h2>Risks</h2>

          <div className="content-description">
            {parse(procedure.risks)}
          </div>

        </section>
      )}

      {/* Recovery */}

      {procedure?.recovery && (
        <section className="content-section">

          <h2>Recovery</h2>

          <div className="content-description">
            {parse(procedure.recovery)}
          </div>

        </section>
      )}

      {/* Preparation */}

      {procedure?.preparation && (
        <section className="content-section">

          <h2>Preparation Before Procedure</h2>

          <div className="content-description">
            {parse(procedure.preparation)}
          </div>

        </section>
      )}

      {/* After Care */}

      {procedure?.after_care && (
        <section className="content-section">

          <h2>After Care</h2>

          <div className="content-description">
            {parse(procedure.after_care)}
          </div>

        </section>
      )}

    </div>
  );
}

export default ProcedureContent;