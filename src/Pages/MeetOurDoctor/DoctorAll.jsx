import React, {
  useState,
  useEffect,
} from "react";

import Doctorcard from "./Doctorcard";
import { useAuth } from "../../store/auth";

function DoctorAll() {

  const { API } = useAuth();

  const [isLoading, setIsLoading] =
    useState(true);

  const [homedoc, setHomeDoc] =
    useState([]);

  const [error, setError] =
    useState(null);

  useEffect(() => {

    if (!API) return;

    const fetchhomeData =
      async () => {

        try {

          const response =
            await fetch(
              `${API}/api/home-doctors/view-home-doctors`
            );

          const data =
            await response.json();

          if (!response.ok) {

            throw new Error(
              data?.message ||
              "Failed to fetch doctors"
            );

          }

          const uniqueDoctors = [
            ...new Map(
              (data?.doctors || [])
                .map((doc) => [
                  doc.drSlug ||
                  doc.drTitle,
                  doc,
                ])
            ).values(),
          ];

          setHomeDoc(
            uniqueDoctors
          );

        } catch (error) {

          console.error(
            "Home Doctors API Error:",
            error
          );

          setError(error);

        } finally {

          setIsLoading(false);

        }

      };

    fetchhomeData();

  }, [API]);

  if (isLoading) {

    return (
      <div>
        Loading...
      </div>
    );

  }

  if (error) {

    return (
      <div>
        Home Error: {error.message}
      </div>
    );

  }

  return (

    <section>

      <div className="row">

        {homedoc
          .slice(0, 4)
          .map((doctor) => (

            <div
              key={
                doctor._id ||
                doctor.drSlug
              }
              className="col-md-3"
            >

              <Doctorcard

                doctorid={
                  doctor._id
                }

                doctorpic={
                  doctor.drImage
                }

                doctorname={
                  doctor.drTitle
                }

                doctordetails={
                  doctor.drQualification
                }

                doctorslug={
                  doctor.drSlug
                }

                doctortime={
                  doctor.drTiming
                }

                doctordepartment={
                  doctor.drDepartment
                }

              />

            </div>

          ))}

      </div>

    </section>

  );
}

export default DoctorAll;