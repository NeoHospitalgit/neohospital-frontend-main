import React from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./DetailsDepartment.css";
import Header from "../Header";
import Footer from "../Footer";

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

  // Function to handle phone call
  const handleCallNow = () => {
    window.location.href = "tel:0120-4880000";
  };

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
       {/* Place Header at the very top */}
      <Helmet>{parse(departments.seo_tag)}</Helmet>
      
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
                <button className="contact-btn" onClick={handleCallNow}>
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
                  <Link to="/doctors" className="btn btn-secondary">
                    <i className="fa fa-user-md"></i>
                    View Doctors
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
      {/* Quick Stats Section (if any) */}
      {/* Place Footer at the very bottom */}
    </>
  );
}

export default DetailsDepartment;
