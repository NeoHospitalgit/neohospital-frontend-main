import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
import "./OurInternationPatientcards.css";
// import patientservicess from "../../Assets/Services/lb.jpg";

function OurServicecards() {
  // const [NeoService, setNeoService] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://api.neohospital.com/api/adminv5/manage-service-category"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const data = await response.json();
  //       setNeoService(data.servicescategories);
  //     } catch (error) {
  //       setError(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const { service } = useParams();
  // const Service = NeoService.find((value) => value.service_slug === service);

  // if (!Service) {
  //   return <div>No service found</div>;
  // }
  return (
    <>
      <section className="container OurInternation d-flex justify-content-center align-items-center">
        <h3>Coming Soon ....</h3>
      </section>
    </>
  );
}

export default OurServicecards;
