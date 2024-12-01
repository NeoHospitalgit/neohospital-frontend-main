import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Corevalue from "../About/Corevalue";
import "./clinicalservice.css";
import parse from "html-react-parser";

function ServiceDetails() {
  const [neoServicedetailslast, setNeoServicedetailslast] = useState([]);
  const [neoServicedetails, setNeoServicedetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { service, servicedetail } = useParams();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(
          "https://api.neohospital.com/api/adminv6/manage-service"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch service details");
        }
        const data = await response.json();
        // Filter the services based on the service category
        const filteredServices = data.services.filter(
          (value) => value.serviceCat === service
        );

        setNeoServicedetailslast(filteredServices);

        if (servicedetail) {
          const filteredServicesdetails = data.services.filter(
            (value) => value.slug === servicedetail
          );
          setNeoServicedetails(filteredServicesdetails);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [service, servicedetail]);

  if (loading) {
    return <>
      <div className="loading-spinner-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!neoServicedetailslast.length) {
    return <div>Service not found for {service}.</div>;
  }

  return (
    <>
      <Corevalue />
      <section className="container ClinicalService">
        <div>
          <h3 className="about-title">
            <span>{service}</span>
          </h3>
        </div>
        <div className="row">

          {/* content start */}
          {servicedetail && (
            <div className="col-md-8">
              <div>
                <p className="mt-4">
                  {neoServicedetails.map((value) => (
                    <div key={value.id}>
                      <img
                        src={`https://api.neohospital.com/uploads/Service/${value.image}`}
                        className="img-fluid"
                      />
                      <p>{parse(value.serviceDetail)}</p>
                    </div>
                  ))}
                </p>
              </div>
            </div>
          )}
          <div className="col-md-4">
            <div>
              <h3 className="about-title">
                <span>Our Services</span>
              </h3>
            </div>
            <div>
              {/* sidebar start */}
              <ul className="servicelist">
                {neoServicedetailslast.map((value) => (
                  <li key={value.id}>
                    <Link to={`/service/${value.serviceCat}/${value.slug}`}>
                      <i className="fa fa-angle-double-right mx-2"></i>
                      {value.serviceTitle}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* sidebar end */}
            </div>
          </div>
          {/* content end */}
        </div>
      </section>
    </>
  );
}

export default ServiceDetails;
