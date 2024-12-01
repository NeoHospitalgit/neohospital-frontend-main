import React from "react";
import "./MeetOurDoctor.css";
import Doctorsbanner from "./Doctorsbanner";
import Profile from "./Profile";
// import { Neodoctor } from "./DoctorAllContent";

function DoctorDetails() {
  return (
    <>
      <section className="doctorback">
        {/*         <Doctorsbanner /> */}
        <Profile />
      </section>
    </>
  );
}

export default DoctorDetails;
