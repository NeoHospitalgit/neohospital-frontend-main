import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Corevalue from "../About/Corevalue";
import "./clinicalservice.css";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";

import { useAuth } from "../../store/auth";

function ServiceDetails() {
  const [neoServicedetailslast, setNeoServicedetailslast] = useState([]);
  const [neoServicedetails, setNeoServicedetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { service, servicedetail } = useParams();
  const { API } = useAuth();
  useEffect(() => {
    const fetchServiceDetails = async () => {
        if (!API) return;
      try {
        const response = await fetch(
          `${API}/api/services/view-services`
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
  }, [service, servicedetail]); // Add servicedetail to the dependency array

  if (loading) {
    return <div>Loading...</div>;
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
        <div className="row">
          <div className="col-md-4">
            <div>
              <h3 className="about-title">
                <span>{service}</span>
              </h3>
            </div>
            <div> 
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
            </div>
          </div> 
          {servicedetail && (
            <div className="col-md-8">
              <div>
                <p className="mt-4">
                  {neoServicedetails.map((value) => (
                    <div key={value.id}>
                      <img
                        src={`${API}/uploads/Service/${value.image}`}
                        className="img-fluid"
                       width="600" height="400" />
                      <p>{parse(value.serviceDetail)}</p>
                    </div>
                  ))}
                </p>
              </div>
            </div>
          )} 
        </div>
      </section>
    </>
  );
}

export default ServiceDetails;
