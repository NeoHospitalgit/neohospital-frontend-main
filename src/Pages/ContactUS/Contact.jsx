import React from "react";
import Contactbanner from "./Contactbanner";
import Corevalue from "../About/Corevalue";
import "./Contact.css";
import Contactform from "./Contactform";
import { Contactseo } from "../SeoContent";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";

function Contact() {
  return (
    <>
      <Helmet>{parse(Contactseo.meetafamily)}</Helmet>
      <Contactbanner />
      <Corevalue />
      <Contactform />
    </>
  );
}

export default Contact;
