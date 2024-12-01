import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Servicecard.css";
import patientservicess from "../../Assets/Services/lb.jpg";

function OurServicecards() {
  const [NeoService, setNeoService] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.neohospital.com/api/adminv5/manage-service-category"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setNeoService(data.servicescategories);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const { service } = useParams();
  const Service = NeoService.find((value) => value.service_slug === service);

  if (!Service) {
    return <div>No service found</div>;
  }
  return (
    <>
      <section className="OurServicecards container">
        <div>
          <h3 className="about-title">
            <span>SCOPE OF SERVICES</span>
          </h3>
          <p className="about-description">
            Neo Hospital places paramount importance on patient care, seamlessly
            merging cutting-edge medical advancements with heartfelt compassion.
            Our foundational principle is to craft an experience where every
            patient feels supported, efficient, and valued.
          </p>
        </div>
        <div className="row ">
          <div className="col-md-3">
            <a
              className="card1"
              href="http://103.75.34.114/online_his/design/online_lab/default.aspx"
            >
              <div className="card"></div>
              <div>
                <img
                  src={patientservicess}
                  className="img-fluid"
                  alt="lab-report"
                  srcSet=""
                />
              </div>
              <h3>Lab Report</h3>
              <div className="text-center">
                <a href="http://103.75.34.114/online_his/design/online_lab/default.aspx">
                  <button>Read More</button>
                </a>
              </div>
              <div className="go-corner">
                <div className="go-arrow">→</div>
              </div>
            </a>
          </div>

          {NeoService.map((value) => (
            <div className="col-md-3">
              <Link className="card1" to={`/service/${value.slug}`}>
                <div key={value.id} className="card"></div>
                {/* <img src={value.imageUrl} alt={value.title} /> */}
                <div>
                  <img
                    src={`https://api.neohospital.com/uploads/Service/${value.image}`}
                    className="img-fluid"
                    alt={value.altImg}
                    srcSet=""
                  />
                </div>
                {/* <h3>{value.imageUrl}</h3> */}
                <h3>{value.title}</h3>
                {/* <p>
                  Card description with lots of great facts and interesting
                  details.
                </p> */}
                <div className="text-center">
                  <Link to={`/service/${value.slug}`}>
                    <button>Read More</button>
                  </Link>
                </div>
                <div className="go-corner">
                  <div className="go-arrow">→</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default OurServicecards;
