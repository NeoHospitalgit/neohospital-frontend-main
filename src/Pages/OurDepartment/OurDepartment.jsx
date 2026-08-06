import React from "react";
import Ourdepartmentbanner from "./Ourdepartmentbanner";
import Corevalue from "../About/Corevalue";
import Ourdepartmentcards from "./Ourdepartmentcards";
import { Helmet } from "react-helmet";
function OurDepartment() {
  return (
    <>
      <Helmet>
       <title>Best Super Speciality Hospital in Noida | NEO Hospital</title>
      <meta name="title" content="Best Super Speciality Hospital in Noida | NEO Hospital" />
      <meta name="description" content="NEO Hospital is a leading super speciality hospital in Noida offering advanced treatments, modern technology, and comprehensive healthcare for patients of all ages." />
      
      <meta name="keywords" content="multi-speciality hospital Noida, medical specialities in Noida, super speciality hospital Noida, specialist doctors Noida, advanced healthcare Noida" />
      <link rel="canonical" href="https://www.neohospital.com/specialities" />
      
      <meta name="DC.Title" content="Best Super Speciality Hospital in Noida | NEO Hospital" />
      <meta name="DC.Subject" content="NEO Hospital is a leading super speciality hospital in Noida offering advanced treatments, modern technology, and comprehensive healthcare for patients of all ages." />
      
      <meta property="og:title" content="Best Super Speciality Hospital in Noida | NEO Hospital" />
      <meta property="og:description" content="NEO Hospital is a leading super speciality hospital in Noida offering advanced treatments, modern technology, and comprehensive healthcare for patients of all ages." />
      
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
