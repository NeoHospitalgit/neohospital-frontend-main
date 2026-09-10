import React from "react";
import Hero from "./Hero";
import Info from "./Info";
import BookAppointment from "./BookAppointment";
import Doctors from "./Doctors";
import Testimonialfile from "./Testimonialfile";
import Blogs from "./Blogs";

function Home() {
  return (
    <div className="home-section">
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
