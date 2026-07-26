import React from "react";
import ProcedureContent from "./ProcedureContent";
import ProcedureSidebar from "./ProcedureSidebar"; // Right sidebar component

import "./ProcedureOverview.css";

function ProcedureOverview() {
  return (
    <section className="procedure-overview">

      <div className="container">

        <div className="overview-wrapper">

          {/* Left Side */}
          <div className="overview-left">
            <ProcedureContent />
          </div>

          {/* Right Side */}
          <aside className="overview-right">
            <ProcedureSidebar />
          </aside>

        </div>

      </div>

    </section>
  );
}

export default ProcedureOverview;