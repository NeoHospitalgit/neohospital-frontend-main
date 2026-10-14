import React from "react";
import "./MeetOurDoctor.css";
import { Link } from "react-router-dom";
import fallbackImage from "../../Assets/manpic.png";
import { useAuth } from "../../store/auth";

function Doctorcard(props) {
  const { API } = useAuth();

  const imageUrl = props.doctorpic
    ? /^https?:\/\//i.test(props.doctorpic)
      ? props.doctorpic
      : `${API}/uploads/doctors/${props.doctorpic.replace(/^\/?uploads\/doctors\//, "")}`
    : fallbackImage;

  return (
    <article className="doctorcard">
      <div className="doctor-card-image-wrap">
        <Link to={`/doctor-details/${props.doctorslug}`}>
                <img
                  src={imageUrl}
                  alt={
                    props.doctorname ||
                    "NEO Hospital Doctor"
                  }
                  width="400"
                  height="300"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
        </Link>
        <button className="doctor-favorite" type="button" aria-label="Add doctor to favourites">♡</button>
        <span className="doctor-availability"><i /> Available</span>
      </div>
      <div className="doctor-card-body">
        <Link to={`/doctor-details/${props.doctorslug}`}><h3>{props.doctorname}</h3></Link>
        <small>{props.doctordetails || "Consultant"}</small>
        <p className="doctor-speciality">♧ {props.doctordepartment || "Specialist"}</p>
        <p className="doctor-experience">{props.doctortime || "Experienced Consultant"}</p>
        <div className="doctor-card-actions">
          <Link className="doctor-profile-btn" to={`/doctor-details/${props.doctorslug}`}>View Profile</Link>
          <Link
            className="doctor-book-btn"
            to={`/doctor-details/${props.doctorslug}`}
            state={{ openAppointment: true }}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </article>
  );
}

export default Doctorcard;
