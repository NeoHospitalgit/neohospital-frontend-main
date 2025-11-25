import React from "react";
import Ourdepartmentbanner from "./Ourdepartmentbanner";
import Corevalue from "../About/Corevalue";
import Ourdepartmentcards from "./Ourdepartmentcards";
import { Helmet } from "react-helmet";
function OurDepartment() {
  return (
    <>
      <Helmet>
        <title>Expert Doctors & Specialities at Neo Hospital</title>
        <meta name="title" content="Expert Doctors & Specialities at Neo Hospital" />
        <meta name="description" content="Explore Neo Hospital’s over 20 advanced specialties, from cardiology and neurology to oncology and orthopedics — delivering expert, patient-focused care." />

        <meta name="keywords" content="multi-speciality hospital Noida, medical specialities in Noida, super speciality hospital Noida, specialist doctors Noida, advanced healthcare Noida" />
        <link rel="canonical" href="https://www.neohospital.com/specialities" />

        <meta name="DC.Title" content="Expert Doctors & Specialities at Neo Hospital" />
        <meta name="DC.Subject" content="Explore Neo Hospital’s over 20 advanced specialties, from cardiology and neurology to oncology and orthopedics — delivering expert, patient-focused care." />

        <meta property="og:title" content="Expert Doctors & Specialities at Neo Hospital" />
        <meta property="og:description" content="Explore Neo Hospital’s over 20 advanced specialties, from cardiology and neurology to oncology and orthopedics — delivering expert, patient-focused care." />

        <meta name="language" content="en-us" />
        <meta name="coverage" content="Global" />
        <meta name="robots" content="INDEX,FOLLOW" />
        <meta name="GOOGLEBOT" content="INDEX, FOLLOW" />
        <meta name="doc-type" content="Webpage" />
        <meta name="revisit-after" content="7 days" />
      </Helmet>

      <Ourdepartmentbanner />
{/*       <Corevalue /> */}
      <Ourdepartmentcards />
    </>
  );
}

export default OurDepartment;
