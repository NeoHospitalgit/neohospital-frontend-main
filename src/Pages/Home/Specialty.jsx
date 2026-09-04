import React from 'react';
import { Link } from 'react-router-dom';
import './Specialty.css';

const Specialty = () => {
  const specialties = [
 
{
  id: 1,
  title: "INTERNAL MEDICINE",
  description: "Advanced cardiac treatments and interventions",
  link: "internal-medicine",
  alt: "INTERNAL MEDICINE",  // <-- ALT TAG 
    },
    {
      id: 2,
      title: "Neurology",
      description: "Comprehensive oncology services and treatments",
      link: "neurology",
      alt:"NEUROLOGY",
    },
    {
      id: 3,
      title: "Gastrosciences",
      description: "Expert care for neurological conditions",
      link: "gastrosciences",
      alt:"GASTROSCIENCES",
    },
    {
      id: 4,
      title: "Cardiology",
      description: "Specialized digestive health treatments",
      link: "cardiology",
      alt:"CARDIOLOGY",
    },
    {
      id: 5,
      title: "Pulmonology",
      description: "Advanced bone and joint care",
      link: "pulmonology",
       alt:"PULMONOLOGY",
    },
    {
      id: 6,
      title: "Dental",
      description: "Comprehensive kidney treatment services",
      link: "dental",
       alt:"DENTAL",
    },
    {
      id: 7,
      title: "Dermatology",
      description: "Expert liver transplantation services",
      link: "dermatology",
       alt:"DERMATOLOGY",
    },
    {
      id: 8,
      title: "Dietetics",
      description: "Specialized bone marrow procedures",
      link: "dietetics",
       alt:"DIETETICS",
    },
    {
      id: 9,
      title: "ENT",
      description: "Specialized bone marrow procedures",
      link: "ent",
       alt:"ENT",
    },
    {
      id: 10,
      title: "Gynaecology & Obstetrics",
      description: "Specialized women's health services",
      link: "gynaecology",
       alt:"GYNAECOLOGY & OBSTETRICS",
    },
    {
      id: 11,
      title: "Clinical Laboratory",
      description: "Specialized bone marrow procedures",
      link: "clinical-laboratory",
       alt:"CLINICAL LABORATORY",
    },
    {
      id: 12,
      title: "Anaesthesiology",
      description: "Specialized bone marrow procedures",
      link: "anaesthesiology",
       alt:"ANAESTHESIOLOGY",
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
               width="400" height="300" />
            </div>
            <h3>{specialty.title}</h3>
            
            <Link to={`https://www.neohospital.com/${specialty.link}`} className="know-more-btn">
              Know More
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="arrow-icon"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
      <div className="view-all-services">
        <Link to="/specialities">
          <button className="view-all-services-btn">
            View All Services
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Specialty;
