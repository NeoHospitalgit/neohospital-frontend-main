import { Link } from "react-router-dom";
import fallbackImage from "../../Assets/manpic.png";

function Card({ doctor }) {
  return (
    <>
      <section className="doclinks">
        <Link key={doctor._id} to={`/doctor-details/${doctor.drSlug}`}>
          <div className="doctorcard">
            <div className="card">
              <div className="face face1">
                <div className="content">
                  {doctor.drImage ? (
                    <>
                      <img src={doctor.drImage} alt={doctor.drTitle} />
                      <p>img</p>
                    </>
                  ) : (
                    <>
                      <img src={fallbackImage} alt="NEO Hospital Doctors" />
                      <p>no</p>
                    </>
                  )}
                  <h3>{doctor.drTitle}</h3>
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: doctor.drQualification,
                    }}
                  ></p>
                  <p>{doctor.drTiming}</p>
                  <p>{doctor.drDepartment}</p>
                  <div>
                    <button>📝 Schedule</button>
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

export default Card;
