import React from "react";

import ProcedureBanner from "./ProcedureBanner";
import ProcedureOverview from "./ProcedureOverview";
import ProcedureFAQ from "./ProcedureFAQ";



function ProcedurePage() {
  return (
    <>
      {/* Banner */}
      <ProcedureBanner />

      {/* Overview + Right Sticky Sidebar */}
      <ProcedureOverview />

       <ProcedureFAQ />

    

      
      {/* <ProcedureSymptoms /> */}
    </>
  );
}

export default ProcedurePage;