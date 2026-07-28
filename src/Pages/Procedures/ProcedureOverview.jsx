import React from "react";
import ProcedureContent from "./ProcedureContent";
import ProcedureSidebar from "./ProcedureSidebar";

import "./ProcedureOverview.css";

function ProcedureOverview({ procedure }) {
  if (!procedure) return null;

  return (
    <section className="procedure-overview">
      <div className="container">

        <div className="overview-wrapper">

          {/* =========================
              LEFT CONTENT
          ========================== */}

          <div className="overview-left">

            <ProcedureContent
              procedure={procedure}
            />

          </div>

          {/* =========================
              RIGHT SIDEBAR
          ========================== */}

          <div className="overview-right">

            <div className="sticky-sidebar">

              <ProcedureSidebar
                procedure={procedure}
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ProcedureOverview;