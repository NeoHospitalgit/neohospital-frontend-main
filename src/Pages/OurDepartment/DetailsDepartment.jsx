import React from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./DetailsDepartment.css";

function DetailsDepartment() {
  const [Neospecial, setNeospecial] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.neohospital.com/api/adminv1/view-category"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setNeospecial(data.category);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { departid } = useParams();
  const departments = Neospecial.find((value) => value.slug === departid);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading department information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>We couldn't load the department information. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!departments) {
    return (
      <div className="not-found-container">
        <div className="not-found-content">
          <h2>Department Not Found</h2>
          <p>The department you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="back-home-btn">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>{parse(departments.seo_tag)}</Helmet>
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <nav className="breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/departments">Departments</Link>
                <span>/</span>
                <span>{departments.title}</span>
              </nav>
              <h1 className="hero-title">{departments.title}</h1>
              <p className="hero-subtitle">Expert care with cutting-edge technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content">
        <div className="container">
          <div className="content-grid">
            
            {/* Sidebar */}
            <aside className="sidebar">
              <div className="sidebar-card">
                <h3 className="sidebar-title">All Departments</h3>
                <div className="departments-list">
                  {Neospecial.map((value, index) => (
                    <Link
                      key={index}
                      to={`https://www.neohospital.com/${value.slug}`}
                      className={`department-link ${value.slug === departid ? 'active' : ''}`}
                    >
                      <div className="department-item">
                        <span className="department-icon">
                          <i className="fa fa-stethoscope"></i>
                        </span>
                        <span className="department-name">{value.title}</span>
                        <span className="arrow">
                          <i className="fa fa-chevron-right"></i>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="contact-card">
                <h4>Need Help?</h4>
                <p>Contact our specialists for more information</p>
                <button className="contact-btn">
                  <i className="fa fa-phone"></i>
                  Call Now
                </button>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-section">
              <div className="department-header">
                <div className="department-image-container">
                  <img
                    src={`https://api.neohospital.com/uploads/categories/${departments.image}`}
                    alt={departments.title}
                    className="department-image"
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <span className="department-badge">{departments.title}</span>
                  </div>
                </div>
              </div>

              <div className="department-content">
                <div className="content-header">
                  <h2>About {departments.title}</h2>
                  <div className="content-divider"></div>
                </div>
                
                <div className="content-body">
                  {parse(departments.content)}
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button className="btn btn-primary">
                    <i className="fa fa-calendar"></i>
                    Book Appointment
                  </button>
                  <button className="btn btn-secondary">
                    <i className="fa fa-user-md"></i>
                    View Doctors
                  </button>
                  <button className="btn btn-outline">
                    <i className="fa fa-info-circle"></i>
                    More Info
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fa fa-users"></i>
              </div>
              <div className="stat-content">
                <h3>1000+</h3>
                <p>Patients Treated</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fa fa-trophy"></i>
              </div>
              <div className="stat-content">
                <h3>15+</h3>
                <p>Years Experience</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fa fa-star"></i>
              </div>
              <div className="stat-content">
                <h3>4.9/5</h3>
                <p>Patient Rating</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fa fa-clock-o"></i>
              </div>
              <div className="stat-content">
                <h3>24/7</h3>
                <p>Emergency Care</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailsDepartment;
