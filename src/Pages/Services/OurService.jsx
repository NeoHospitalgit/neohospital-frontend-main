import React from 'react'
import OurServicebanner from './OurServicebanner';
import Corevalue from '../About/Corevalue';
import OurServicecards from './OurServicecards';
import { Serviceseo } from "../SeoContent";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";   


function OurService() {
  return (
    <>
      <Helmet>{parse(Serviceseo.meetafamily)}</Helmet>
          <OurServicebanner />
          <Corevalue />
          <OurServicecards/>
    </>
  );
}

export default OurService
