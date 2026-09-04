import React from "react";
import "./MeetOurDoctor.css";
import { Link } from "react-router-dom";
import fallbackImage from "../../Assets/manpic.png";
import { useAuth } from "../../store/auth";

function Doctorcard(props) {
  const { API } = useAuth();

  const imageUrl = props.doctorpic
    ? `${API}/uploads/doctors/${props.doctorpic}`
    : fallbackImage;

  return (
    <section className="doclinks">
      <Link to={`/doctor-details/${props.doctorslug}`}>
        <div className="doctorcard">
          <div className="card">

            {/* =========================
                FRONT
            ========================= */}

            <div className="face face1">
              <div className="content">
                <img
                  src={imageUrl}
                  alt={
                    props.doctorname ||
                    "NEO Hospital Doctor"
                  }
                  width="400"
                  height="300"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />

                <h3>
                  {props.doctorname}
                </h3>
              </div>
            </div>

            {/* =========================
                DETAILS
            ========================= */}

            <div className="face face2">
              <div className="content">

                {props.doctortime && (
                  <p>
                    {props.doctortime}
                  </p>
                )}

                {props.doctorspecialist && (
                  <p>
                    {props.doctorspecialist}
                  </p>
                )}

                {props.doctordepartment && (
                  <p>
                    {props.doctordepartment}
                  </p>
                )}

                <div>
                  <button
                    type="button"
                    className="text-appointment-btn"
                  >
                    📝 Schedule
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </Link>
    </section>
  );
}

export default Doctorcard;

