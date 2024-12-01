
import "./MeetOurDoctor.css"
import Doctorsbanner from "./Doctorsbanner"
// import DoctorAll from './DoctorAll';
import Corevalue from "../About/Corevalue";
import DemoDoctor from './DemoDoctor';
function MeetOurDoctor() {
  return (
    <>
      <Doctorsbanner />
      <Corevalue />
      <section className="Meetourdoctor container mt-5">
        
        <DemoDoctor />
      </section>
    </>
  );
}

export default MeetOurDoctor