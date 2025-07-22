import React from 'react';
import Aboutus from "./Aboutus";
import Corevalue from "./Corevalue";
import Chooseus from "./Chooseus";
import { Aboutseo } from "../SeoContent";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
import './About.css';

function About() {
  return (
    <div className="about-container">
      <Helmet>{parse(Aboutseo.meetafamily)}</Helmet>
      
      {/* Video Hero Section */}
      <section className="video-hero">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay">
          {/* <p className="hero-subtitle">Compassionate Care, Advanced Technology</p> */}
        </div>
      </section>
      
      <Aboutus />
      <Chooseus />
      <Corevalue />
    </div>
  );
}

export default About;
