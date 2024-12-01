import React from "react";
import Hero from "./Hero";
import Info from "./Info";
import BookAppointment from "./BookAppointment";
import Doctors from "./Doctors";
import Testimonialfile from "./Testimonialfile";
// import NeoTestimonialSlider from "./NeoTestimonial";
import Blogs from "./Blogs";
// import Seo from "../Seo";
import { Homeseo } from "../SeoContent";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
function Home() {
  // const [Homeseo, setHomeseo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:5001/api/adminv4/view-header"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const data = await response.json();
  //       setHomeseo(data.header);
  //     } catch (error) {
  //       setError(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="home-section">
      <Helmet>{parse(Homeseo.meetafamily)}</Helmet>
      <Hero />
      <Info />
      <BookAppointment />
      <Doctors />
      <Testimonialfile />
      {/* <NeoTestimonialSlider /> */}
      <Blogs />
    </div>
  );
}

export default Home;
