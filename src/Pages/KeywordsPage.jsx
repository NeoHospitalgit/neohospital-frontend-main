import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";

const Hero = lazy(() => import("../Pages/Home/Hero"));
const Info = lazy(() => import("../Pages/Home/Info"));
const BookAppointment = lazy(() => import("../Pages/Home/BookAppointment"));
const Doctors = lazy(() => import("../Pages/Home/Doctors"));
const OurServiceCard = lazy(() => import("../Pages/Services/OurServicecards"));
const Blogs = lazy(() => import("../Pages/Home/Blogs"));

function KeywordsPage() {
  const [keywordsPage, setKeywordsPage] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.neohospital.com/api/adminv8/view-seopages"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setKeywordsPage(data.seopages);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const { keywordspage } = useParams();
  const keywordsData = keywordsPage.find(
    (value) => value.pageurl === keywordspage
  );

  useEffect(() => {
    if (!keywordsData) {
      //   navigate("/");
    }
  }, [navigate, keywordsData]);

  if (!keywordsData) {
    return null;
  }

  return (
    <div className="home-section">
      <Suspense fallback={<div>Loading...</div>}>
        <Helmet>{parse(keywordsData.seotags)}</Helmet>
        <Hero />
        <Info />
        <OurServiceCard />
        <BookAppointment />
        <Doctors />
        <Blogs />
      </Suspense>
    </div>
  );
}

export default KeywordsPage;
