import React, { useState, useEffect } from "react";
import Doctorcard from "./Doctorcard";

function DoctorAll() {
  const [isLoading, setIsLoading] = useState(true);
  const [homedoc, setHomeDoc] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchhomeData = async () => {
      try {
        const response = await fetch(
          "https://api.neohospital.com/api/adminv7/view-home-doctors"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setHomeDoc(data.doctors);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchhomeData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Home Error: {error.message}</div>;
  }

  return (
    <>
      <section>
        <div className="row">
          {homedoc.slice(0, 4).map((doctor) => (
            <div key={doctor._id} className="col-md-3">
              <Doctorcard
                doctorid={doctor._id}
                doctorpic={doctor.drImage}
                doctorname={doctor.drTitle}
                doctordetails={doctor.drQualification}
                doctorslug={doctor.drSlug}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default DoctorAll;
