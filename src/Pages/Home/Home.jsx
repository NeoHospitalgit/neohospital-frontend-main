import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Info from "./Info";
import BookAppointment from "./BookAppointment";
import Doctors from "./Doctors";
import Testimonialfile from "./Testimonialfile";
import Blogs from "./Blogs";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
import { useAuth } from "../../store/auth";

function Home() {
  const [seo, setSeo] = useState(null);
  const { API } = useAuth();

  useEffect(() => {
    if (!API) return;

    const fetchSeo = async () => {
      try {
        const response = await fetch(
          `${API}/api/header/view-header`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch header data"
          );
        }

        const data = await response.json();

        const homeSeo = data?.header?.find(
          (item) =>
            item?.page?.toLowerCase() === "home"
        );

        setSeo(homeSeo || null);

      } catch (err) {
        console.error(
          "Home SEO Error:",
          err
        );
      }
    };

    fetchSeo();

  }, [API]);

  return (
    <div className="home-section">

      {/* Dynamic Home SEO */}
      <Helmet>
        {seo?.tagdata &&
          parse(seo.tagdata)}
      </Helmet>

      <Hero />

      <Info />

      <BookAppointment />

      <Doctors />

      <Testimonialfile />

      <Blogs />

    </div>
  );
}

export default Home;