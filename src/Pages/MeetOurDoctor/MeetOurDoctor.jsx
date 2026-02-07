
import "./MeetOurDoctor.css"
import Doctorsbanner from "./Doctorsbanner"
import { Helmet } from "react-helmet";
// import DoctorAll from './DoctorAll';
import Corevalue from "../About/Corevalue";
import DemoDoctor from './DemoDoctor';
function MeetOurDoctor() {
  return (
    <>
      <Helmet>
        <title>Meet Our Skilled Doctors at Neo Super-Speciality Hospital</title>
        <meta name="title" content="Meet Our Skilled Doctors at Neo Super-Speciality Hospital" />
        <meta name="description" content="Explore Neo Hospital’s team of expert, experienced doctors and specialists dedicated to providing advanced, compassionate care across all major medical fields." />

        <meta name="keywords" content="specialist doctors in Noida, best doctors at Neo Hospital, Neo Hospital medical specialists, expert doctors Noida, top healthcare specialists Noida" />
        <link rel="canonical" href="https://www.neohospital.com/doctors" />

        <meta name="DC.Title" content="Meet Our Skilled Doctors at Neo Super-Speciality Hospital" />
        <meta name="DC.Subject" content="Explore Neo Hospital’s team of expert, experienced doctors and specialists dedicated to providing advanced, compassionate care across all major medical fields." />

        <meta property="og:title" content="Meet Our Skilled Doctors at Neo Super-Speciality Hospital" />
        <meta property="og:description" content="Explore Neo Hospital’s team of expert, experienced doctors and specialists dedicated to providing advanced, compassionate care across all major medical fields." />

        <meta name="language" content="en-us" />
        <meta name="coverage" content="Global" />
        <meta name="robots" content="INDEX,FOLLOW" />
        <meta name="GOOGLEBOT" content="INDEX, FOLLOW" />
        <meta name="doc-type" content="Webpage" />
        <meta name="revisit-after" content="7 days" />
      </Helmet>

      <Doctorsbanner />
      <section className="Meetourdoctor container mt-5">
        
        <DemoDoctor />
      </section>
    </>
  );
}

export default MeetOurDoctor
