import React, { useEffect, useState } from "react";
import List from "./List";
import "./List.css";
import TopBarAdmin from "./TopBarAdmin";
import { useAuth } from "../../store/auth";

const getCollection = (payload, keys) => {
  if (Array.isArray(payload)) return payload;

  for (const key of keys) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }

  return [];
};

function Admin() {
  const { API, authorizationToken } = useAuth();

  const [counts, setCounts] = useState({
    blogs: 0,
    specialities: 0,
    doctors: 0,
    services: 0,
    specialistPages: 0,
    procedures: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!API) return;

    const fetchDashboardCounts = async () => {
      try {
        setLoading(true);
        setError("");

        const adminOptions = {
          headers: { Authorization: authorizationToken },
        };
        const responses = await Promise.all([
          fetch(`${API}/api/adminv3/view-blogs`, adminOptions),
          fetch(`${API}/api/adminv1/view-category`, adminOptions),
          fetch(`${API}/api/adminv2/view-doctors`, adminOptions),
          fetch(`${API}/api/adminv6/manage-service`, adminOptions),
          fetch(`${API}/api/adminv11/keywords`, adminOptions),
          fetch(`${API}/api/adminv12/view-procedures`, adminOptions),
        ]);

        if (responses.some((response) => !response.ok)) {
          throw new Error("Failed to load dashboard counts");
        }

        const [
          blogData,
          specialityData,
          doctorData,
          serviceData,
          specialistPageData,
          procedureData,
        ] = await Promise.all(responses.map((response) => response.json()));
        const blogs = getCollection(blogData, ["Blog", "blogs", "data"]);
        const specialities = getCollection(specialityData, [
          "category",
          "categories",
          "data",
        ]);
        const doctors = getCollection(doctorData, ["doctors", "Doctor", "data"]);
        const services = getCollection(serviceData, ["services", "data"]);
        const specialistPages = getCollection(specialistPageData, [
          "data",
          "keywords",
        ]);
        const procedures = getCollection(procedureData, ["data", "procedures"]);

        setCounts({
          blogs: blogs.length,
          specialities: specialities.length,
          doctors: doctors.length,
          services: services.length,
          specialistPages: specialistPages.length,
          procedures: procedures.length,
        });
      } catch (error) {
        console.error("Dashboard count error:", error);
        setError("Unable to load dashboard counts. Please refresh and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardCounts();
  }, [API, authorizationToken]);

  const countCards = [
    { label: "Blogs", value: counts.blogs },
    { label: "Specialities", value: counts.specialities },
    { label: "Doctors", value: counts.doctors },
    { label: "Patient Services", value: counts.services },
    { label: "Specialist Pages", value: counts.specialistPages },
    { label: "Procedure Pages", value: counts.procedures },
  ];

  return (
    <>
      <TopBarAdmin />

      <section>
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-3 adminleft">
              <div>
                <List />
              </div>
            </div>

            <div className="col-md-9">
              <div className="row">
                {error && (
                  <div className="col-12" role="alert">
                    <p className="text-danger">{error}</p>
                  </div>
                )}
                {countCards.map((card) => (
                  <div className="col-md-4" key={card.label}>
                    <div className="BlogDetails border border-primary m-4 text-center">
                      <h4>
                        {card.label}: {loading ? "..." : error ? "Unavailable" : card.value}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Admin;