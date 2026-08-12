import React, { useEffect, useState } from "react";
import Ourdepartmentbanner from "./Ourdepartmentbanner";
import Corevalue from "../About/Corevalue";
import Ourdepartmentcards from "./Ourdepartmentcards";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";

import { useAuth } from "../../store/auth";
function OurDepartment() {
  const { API } = useAuth();

  const [seo, setSeo] = useState(null);

  // =====================================
  // Fetch Department SEO
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

        console.log(
          "Header API Response:",
          data
        );

        // =====================================
        // Find Department SEO Record
        // =====================================

        const departmentSeo = Array.isArray(
          data?.header
        )
          ? data.header.find(
              (item) =>
                item?.page
                  ?.trim()
                  ?.toLowerCase() ===
                "specialities"
            )
          : null;

        console.log(
          "Department SEO:",
          departmentSeo
        );

        if (!cancelled) {
          setSeo(departmentSeo || null);
        }

      } catch (error) {
        if (!cancelled) {
          console.error(
            "Department SEO Error:",
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

      <Ourdepartmentbanner />
{/*       <Corevalue /> */}
      <Ourdepartmentcards />
    </>
  );
}

export default OurDepartment;
