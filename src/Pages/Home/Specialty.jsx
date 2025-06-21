import React from 'react';
import { Link } from 'react-router-dom';
import './Specialty.css';

const Specialty = () => {
  const specialties = [
    {
      id: 1,
      title: "Internal Medicine",
      description: "Advanced cardiac treatments and interventions",
      link: "internal-medicine"
    },
    {
      id: 2,
      title: "Neurology",
      description: "Comprehensive oncology services and treatments",
      link: "neurology"
    },
    {
      id: 3,
      title: "Gastrosciences",
      description: "Expert care for neurological conditions",
      link: "gastrosciences"
    },
    {
      id: 4,
      title: "Cardiology",
      description: "Specialized digestive health treatments",
      link: "cardiology"
    },
    {
      id: 5,
      title: "Pulmonology",
      description: "Advanced bone and joint care",
      link: "pulmonology"
    },
    {
      id: 6,
      title: "Dental",
      description: "Comprehensive kidney treatment services",
      link: "dental"
    },
    {
      id: 7,
      title: "Dermatology",
      description: "Expert liver transplantation services",
      link: "dermatology"
    },
    {
      id: 8,
      title: "Dietetics",
      description: "Specialized bone marrow procedures",
      link: "dietetics"
    },
    {
      id: 9,
      title: "ENT",
      description: "Specialized bone marrow procedures",
      link: "ent"
    },
    {
      id: 10,
      title: "Gynaecology & Obstetrics",
      description: "Specialized women's health services",
      link: "gynaecology" // Updated link with "and" instead of hyphen
    },
    {
      id: 11,
      title: "Clinical Laboratory",
      description: "Specialized bone marrow procedures",
      link: "clinical-laboratory"
    },
    {
      id: 12,
      title: "Anaesthesiology",
      description: "Specialized bone marrow procedures",
      link: "anaesthesiology"
    }
  ];

  return (
    <div className="specialty-container">
      <div className="specialty-grid">
        {specialties.map((specialty) => (
          <div key={specialty.id} className="specialty-card">
            <div className="specialty-icon">
              <img 
                src={`sicons/${specialty.id}.svg`} 
                alt={specialty.title}
                className="specialty-img"
              />
            </div>
            <h3>{specialty.title}</h3>
            <p>{specialty.description}</p>
            <Link to={`https://www.neohospital.com/${specialty.link}`} className="know-more-btn">
              Know More
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        ))}
      </div>
      <div className="view-all-services">
        <Link to="/services">
          <button className="view-all-services-btn">
            View All Services
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Specialty;
