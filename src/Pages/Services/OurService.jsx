import React, { useEffect, useState } from "react";
import OurServicebanner from './OurServicebanner';
import Corevalue from '../About/Corevalue';
import OurServicecards from './OurServicecards';
import { Serviceseo } from "../SeoContent";

import { Helmet } from "react-helmet";
import parse from "html-react-parser";

import { useAuth } from "../../store/auth";
  
function OurService() {
  const { API } = useAuth();

  const [seo, setSeo] = useState(null);

  // =====================================
  // Fetch Service SEO
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
        // Find Service SEO Record
        // =====================================

        const aboutSeo = Array.isArray(
          data?.header
        )
          ? data.header.find(
              (item) =>
                item?.page
                  ?.trim()
                  ?.toLowerCase() ===
                "services"
            )
          : null;

        if (!cancelled) {
          setSeo(aboutSeo || null);
        }

      } catch (error) {
        if (!cancelled) {
          console.error(
            "About SEO Error:",
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
  {/*           <OurServicebanner />
          <Corevalue /> */}
          <OurServicecards/>
    </>
  );
}

export default OurService
