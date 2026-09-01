import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";
import "./DetailsDepartment.css";
import NotFound from "../NotFound";
import { useAuth } from "../../store/auth";
import fallbackImage from "../../Assets/manpic.png";

function DetailsDepartment() {
  const { API } = useAuth();
  const { departid } = useParams();

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorLoading, setDoctorLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load departments and the complete doctor team for the current department.
  useEffect(() => {
    if (!API) return;

    let cancelled = false;

    const fetchDepartmentData = async () => {
      try {
        setLoading(true);
        setDoctorLoading(true);
        setError(null);

        const departmentResponse = await fetch(
          `${API}/api/categories/view-category`
        );

        const departmentData = await departmentResponse.json();

        if (!departmentResponse.ok) {
          throw new Error(
            departmentData?.message || "Failed to fetch departments"
          );
        }

        const categoryList = Array.isArray(departmentData?.category)
          ? departmentData.category
          : [];

        if (cancelled) return;

        setDepartments(categoryList);

        const currentDepartment = categoryList.find(
          (item) => item?.slug === departid
        );

        if (!currentDepartment) {
          setDoctorLoading(false);
          return;
        }

        // Existing backend endpoint used by the admin department/doctor mapping.
        const doctorResponse = await fetch(
          `${API}/api/adminv2/department/${currentDepartment._id}`
        );

        const doctorData = await doctorResponse.json();

        if (!doctorResponse.ok) {
          throw new Error(
            doctorData?.message || "Failed to fetch department doctors"
          );
        }

        const departmentDoctors = Array.isArray(doctorData?.doctors)
          ? doctorData.doctors
          : [];

        if (!cancelled) {
          setDoctors(departmentDoctors);
        }
      } catch (err) {
        console.error("Department page error:", err);

        if (!cancelled) {
          setError(err);
          setDoctors([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setDoctorLoading(false);
        }
      }
    };

    fetchDepartmentData();

    return () => {
      cancelled = true;
    };
  }, [API, departid]);

  const department = useMemo(
    () => departments.find((item) => item?.slug === departid),
    [departments, departid]
  );

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

  if (error && !department) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>
            We couldn't load the department information. Please try again
            later.
          </p>
        </div>
      </div>
    );
  }

  if (!department) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        {parse(
          department?.seo_tag ||
            department?.seo_head ||
            department?.seotags ||
            department?.tagdata ||
            ""
        )}
      </Helmet>

      <section className="main-content">
        <div className="container">
          <div className="content-grid">
            <aside className="sidebar">
              <div className="sidebar-card">
                <h3 className="sidebar-title">All Departments</h3>

                <div className="departments-list">
                  {departments.map((value) => (
                    <Link
                      key={value?._id || value?.slug}
                      to={`/${value.slug}`}
                      className={`department-link ${
                        value.slug === departid ? "active" : ""
                      }`}
                    >
                      <div className="department-item">
                        <span className="department-icon">
                          <i className="fa fa-stethoscope"></i>
                        </span>
                        <span className="department-name">
                          {value.title}
                        </span>
                        <span className="arrow">
                          <i className="fa fa-chevron-right"></i>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="contact-card">
                <h4>Need Help?</h4>
                <p>Contact our specialists for more information</p>
                <button className="contact-btn" onClick={handleCallNow}>
                  <i className="fa fa-phone"></i>
                  Call Now
                </button>
              </div>
            </aside>

            <main className="main-section">
              <div className="department-header">
                <div className="department-image-container">
                  <img
                    src={`${API}/uploads/categories/${department.image}`}
                    alt={department.title}
                    className="department-image"
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <span className="department-badge">
                      {department.title}
                    </span>
                  </div>
                </div>
              </div>

              <div className="department-content">
                <div className="content-header">
                  <h1>ABOUT {department.title}</h1>
                  <div className="content-divider"></div>
                </div>

                <div className="content-body">
                  {parse(department.content || "")}
                </div>

                {/* Client requirement:
                    Show the department's complete doctor team near the top,
                    with photo, name, designation, profile and booking actions.
                    The old generic "View Doctors" -> /doctors CTA is removed. */}
                <section className="department-doctors" aria-labelledby="department-doctors-title">
                  <div className="department-doctors-heading">
                    <span className="doctor-section-eyebrow">Our Team</span>
                    <h2 id="department-doctors-title">
                      {department.title} Specialists
                    </h2>
                    <p>
                      Meet our experienced doctors from the {department.title}{" "}
                      department.
                    </p>
                  </div>

                  {doctorLoading ? (
                    <div className="doctor-list-loading">
                      <div className="loading-spinner small"></div>
                      <span>Loading our specialists...</span>
                    </div>
                  ) : doctors.length > 0 ? (
                    <div className="department-doctor-grid">
                      {doctors.map((doctor) => {
                        const doctorName =
                          doctor?.drTitle || "NEO Hospital Doctor";
                        const doctorSlug = doctor?.drSlug;
                        const doctorImage = doctor?.drImage
                          ? `${API}/uploads/doctors/${doctor.drImage}`
                          : fallbackImage;

                        const designation =
                          doctor?.drDesignation ||
                          doctor?.drSpecialist ||
                          doctor?.drDepartment ||
                          "Specialist";

                        const profilePath = doctorSlug
                          ? `/doctor-details/${doctorSlug}`
                          : "/doctors";

                        return (
                          <article
                            className="department-doctor-card"
                            key={doctor?._id || doctorSlug || doctorName}
                          >
                            <div className="department-doctor-image-wrap">
                              <img
                                src={doctorImage}
                                alt={`${doctorName}, ${designation}`}
                                className="department-doctor-image"
                                loading="lazy"
                                width="320"
                                height="340"
                                onError={(event) => {
                                  event.currentTarget.src = fallbackImage;
                                }}
                              />
                            </div>

                            <div className="department-doctor-body">
                              <h3>{doctorName}</h3>

                              {doctor?.drQualification && (
                                <p className="doctor-qualification">
                                  {doctor.drQualification}
                                </p>
                              )}

                              <p className="doctor-designation">
                                {designation}
                              </p>

                              {doctor?.drExperience && (
                                <p className="doctor-experience">
                                  {doctor.drExperience}+ years experience
                                </p>
                              )}

                              <div className="department-doctor-actions">
                                <Link
                                  to={profilePath}
                                  className="doctor-book-btn"
                                >
                                  <i className="fa fa-calendar-check-o"></i>
                                  Book Appointment
                                </Link>

                                {doctorSlug && (
                                  <Link
                                    to={profilePath}
                                    className="doctor-profile-btn"
                                  >
                                    View Profile
                                  </Link>
                                )}
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="no-doctors-message">
                      <p>
                        Doctor information for this department will be
                        updated soon.
                      </p>
                    </div>
                  )}
                </section>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailsDepartment;
