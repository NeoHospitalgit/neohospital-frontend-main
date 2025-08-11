import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Servicecard.css";

function OurServicecards() {
  const [NeoService, setNeoService] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { service } = useParams();
  const Service = NeoService.find((value) => value.service_slug === service);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error loading services</h3>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="services-section">
      {/* Header Section */}
      <div className="services-header">
        <h2 className="services-title">Our Medical Services</h2>
        <div className="title-underline"></div>
        <p className="services-description">
           Neo Super Speciality Hospital places paramount importance on patient care, seamlessly merging 
          cutting-edge medical advancements with heartfelt compassion. Our foundational 
          principle is to craft an experience where every patient feels supported, 
          efficient, and valued.
        </p>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {/* Lab Report Special Card */}
        <div className="service-card lab-report-card">
          <div className="card-background-pattern"></div>
          <div className="card-content">
            <div className="card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="card-title">Lab Reports</h3>
            <p className="card-description">
              Access your laboratory test results online quickly and securely
            </p>
            <a 
              href="http://103.75.34.114/online_his/design/online_lab/default.aspx"
              className="card-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Access Now</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Dynamic Service Cards */}
        {NeoService.map((value, index) => (
          <Link 
            key={value.id} 
            to={`/service/${value.slug}`} 
            className={`service-card dynamic-card card-${index + 1}`}
          >
            <div className="card-image-container">
              <img
                src={`https://api.neohospital.com/uploads/Service/${value.image}`}
                className="card-image"
                alt={value.altImg || value.title}
                loading="lazy"
              />
              <div className="card-overlay"></div>
            </div>
            
            <div className="card-content">
              <h3 className="card-title">{value.title}</h3>
              <p className="card-description">
                {value.description || "Comprehensive medical care with expert healthcare professionals"}
              </p>
              
              <div className="card-button">
                <span>Learn More</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="card-hover-effect"></div>
          </Link>
        ))}
      </div>

      {/* No Service Found Message */}
      {!Service && service && (
        <div className="no-service-found">
          <h3>Service not found</h3>
          <p>The requested service could not be found. Please check the URL or browse our available services.</p>
        </div>
      )}
    </section>
  );
}

export default OurServicecards;
