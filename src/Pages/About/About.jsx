import React from "react";
import Aboutbanner from "./Aboutbanner";
import Aboutus from "./Aboutus";
import Corevalue from "./Corevalue";
import Chooseus from "./Chooseus";
import { Aboutseo } from "../SeoContent";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";   

function About() {
  return (
    <>
      {/* <Seo
        title={Aboutseo.title}
        metatitle={Aboutseo.metatitle}
        metadescription={Aboutseo.metadescription}
        metakeyword={Aboutseo.metakeyword}
        canonical={Aboutseo.canonical}
        gsv={Aboutseo.gsv}
        dctitle={Aboutseo.dctitle}
        dcsubject={Aboutseo.dcsubject}
        ogtitle={Aboutseo.ogtitle}
        ogdescription={Aboutseo.ogdescription}
      /> */}
      <Helmet>{parse(Aboutseo.meetafamily)}</Helmet>
      <Aboutbanner />
      <Corevalue />
      <Aboutus />
      <Chooseus />
    </>
  );
}

export default About;
