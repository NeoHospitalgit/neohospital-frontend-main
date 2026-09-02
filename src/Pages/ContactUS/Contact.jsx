import React, { useEffect, useState } from "react";
import Contactbanner from "./Contactbanner";
import Corevalue from "../About/Corevalue";
import "./Contact.css";
import Contactform from "./Contactform";
import { Contactseo } from "../SeoContent";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";

import { useAuth } from "../../store/auth";

function Contact() {
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
        // Find About SEO Record
        // =====================================

        const contactSeo = Array.isArray(
          data?.header
        )
          ? data.header.find(
              (item) =>
                item?.page
                  ?.trim()
                  ?.toLowerCase() ===
                "contact"
            )
          : null;

        if (!cancelled) {
          setSeo(contactSeo || null);
        }

      } catch (error) {
        if (!cancelled) {
          console.error(
            "contact SEO Error:",
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
      <Contactbanner />
      <Contactform />
    </>
  );
}

export default Contact;
