import React, { useEffect, useState } from "react";
import "./MeetOurDoctor.css";
import Doctorsbanner from "./Doctorsbanner";

import DemoDoctor from "./DemoDoctor";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";

import { useAuth } from "../../store/auth";

function MeetOurDoctor() {
  const { API } = useAuth();

  const [seo, setSeo] = useState(null);

  // =====================================
  // Fetch About SEO
  // =====================================

  useEffect(() => {
    if (!API) return;

    let cancelled = false;

    const fetchSeo = async () => {
      try {
        const response = await fetch(
          `${API}/api/header/view-header`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch header data: ${response.status}`
          );
        }

        const data = await response.json();

       

        // =====================================
        // Find doctors SEO Record
        // =====================================

        const doctorsSeo = Array.isArray(
          data?.header
        )
          ? data.header.find(
              (item) =>
                item?.page
                  ?.trim()
                  ?.toLowerCase() ===
                "doctors"
            )
          : null;

      

        if (!cancelled) {
          setSeo(doctorsSeo || null);
        }

      } catch (error) {
        if (!cancelled) {
          console.error(
            "doctors SEO Error:",
            error
          );

          setSeo(null);
        }
      }
    };

    fetchSeo();

    return () => {
      cancelled = true;
    };

  }, [API]);
  return (
    <>
     {seo?.tagdata && (
        <Helmet>
          {parse(seo.tagdata)}
        </Helmet>
      )}
      <Doctorsbanner />

      <section className="Meetourdoctor container mt-5">
        <DemoDoctor />
      </section>
    </>
  );
}

export default MeetOurDoctor;