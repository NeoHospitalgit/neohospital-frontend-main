import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import fallbackImage from "../../Assets/manpic.png";

function Doctorcard(props) {
  return (
    <>
      <section className="doclinks">
        <Link to={`/doctor-details/${props.doctorslug}`}>
          <div className="doctorcard">
            <div className="card">
              <div className="face face1">
                <div className="content">
                  {props.doctorpic ? (
                    <img
                      src={`https://api.neohospital.com/uploads/doctors/${props.doctorpic}`}
                      alt={props.doctorname}
                    />
                  ) : (
                    <img src={fallbackImage} alt="NEO Hospital Doctors" />
                  )}
                  <h3>{props.doctorname}</h3>
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p>{parse(props.doctordetails)}</p>
                  <p>{props.doctortime}</p>
                  <p>{props.doctorspecialist}</p>
                  <p>{props.doctordepartment}</p>
                  <div>
                    <button className="text-appointment-btn">📝 Schedule</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>
    </>
  );
}

export default Doctorcard;
