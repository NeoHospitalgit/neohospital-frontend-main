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
  const [doctorStart, setDoctorStart] = useState(0);

  useEffect(() => {
    if (!API) return;

    let cancelled = false;

    const fetchDepartmentData = async () => {
      try {
        setLoading(true);
        setDoctorLoading(true);
        setError(null);

        const response = await fetch(`${API}/api/categories/view-category`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch departments");
        }

        const categoryList = Array.isArray(data?.category) ? data.category : [];

        if (cancelled) return;

        setDepartments(categoryList);

        const currentDepartment = categoryList.find(
          (item) => item?.slug === departid
        );

        if (!currentDepartment) {
          setDoctorLoading(false);
          return;
        }

        const doctorResponse = await fetch(
          `${API}/api/adminv2/department/${currentDepartment._id}`
        );
        const doctorData = await doctorResponse.json();

        if (!doctorResponse.ok) {
          throw new Error(
            doctorData?.message || "Failed to fetch department doctors"
          );
        }

        if (!cancelled) {
          setDoctors(
            Array.isArray(doctorData?.doctors) ? doctorData.doctors : []
          );
          setDoctorStart(0);
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
          <p>We couldn't load the department information.</p>
        </div>
      </div>
    );
  }

  if (!department) return <NotFound />;

  const visibleDoctorCount = 3;
  const hasSlider = doctors.length > visibleDoctorCount;
  const maxStart = Math.max(0, doctors.length - visibleDoctorCount);

  const showNextDoctors = () => {
    setDoctorStart((current) => Math.min(current + 1, maxStart));
  };

  const showPreviousDoctors = () => {
    setDoctorStart((current) => Math.max(current - 1, 0));
  };

  const visibleDoctors = doctors.slice(
    doctorStart,
    doctorStart + visibleDoctorCount
  );

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

      <section className="department-page">
        <div className="container">
          <div className="department-layout">

            <aside className="department-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-heading">
                  <span>NEO Hospital</span>
                  <h3>Specialities</h3>
                </div>

                <div className="departments-list">
                  {departments.map((value) => (
                    <Link
                      key={value?._id || value?.slug}
                      to={`/${value.slug}`}
                      className={`department-link ${
                        value.slug === departid ? "active" : ""
                      }`}
                    >
                      <span className="department-link-icon">
                        <i className="fa fa-stethoscope"></i>
                      </span>
                      <span className="department-name">{value.title}</span>
                      <i className="fa fa-angle-right department-link-arrow"></i>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="sidebar-contact">
                <div className="contact-icon">
                  <i className="fa fa-phone"></i>
                </div>
                <h4>Need expert care?</h4>
                <p>Speak with our hospital team for assistance.</p>
                <button onClick={handleCallNow}>
                  <i className="fa fa-phone"></i>
                  Call 0120-4880000
                </button>
              </div>
            </aside>

            <main className="department-main">

              <div className="department-hero">
                <img
                  src={`${API}/uploads/categories/${department.image}`}
                  alt={department.title}
                  className="department-hero-image"
                />
                <div className="department-hero-overlay"></div>
                <div className="department-hero-content">
                  <span className="hero-kicker">
                    NEO Hospital • Specialist Care
                  </span>
                  <h1>{department.title}</h1>
                  <p>
                    Expert care from our dedicated{" "}
                    {department.title.toLowerCase()} specialists.
                  </p>
                </div>
              </div>

              <div className="department-content">

                {/* Doctors are intentionally before the department content,
                    matching the client's primary requirement. */}
                <section
                  className="department-doctors"
                  aria-labelledby="department-doctors-title"
                >
                  <div className="doctors-section-header">
                    <div>
                      <span className="section-label">
                        Meet Our Specialists
                      </span>
                      <h2 id="department-doctors-title">
                        Our {department.title} Doctors
                      </h2>
                      <div className="section-line"></div>
                    </div>

                    {doctors.length > 0 && (
                      <div className="doctor-slider-controls">
                        <div className="doctor-count">
                          <strong>{doctors.length}</strong>
                          <span>
                            {doctors.length === 1
                              ? "Specialist"
                              : "Specialists"}
                          </span>
                        </div>

                        {hasSlider && (
                          <div className="doctor-slider-arrows">
                            <button
                              type="button"
                              onClick={showPreviousDoctors}
                              disabled={doctorStart === 0}
                              aria-label="Previous doctors"
                              className="doctor-slider-arrow"
                            >
                              <i className="fa fa-chevron-left"></i>
                            </button>

                            <button
                              type="button"
                              onClick={showNextDoctors}
                              disabled={doctorStart === maxStart}
                              aria-label="Next doctors"
                              className="doctor-slider-arrow"
                            >
                              <i className="fa fa-chevron-right"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {doctorLoading ? (
                    <div className="doctor-list-loading">
                      <div className="loading-spinner small"></div>
                      <span>Loading our specialists...</span>
                    </div>
                  ) : doctors.length > 0 ? (
                    <>
                      <div className="department-doctor-slider">
                        <div
                          className="department-doctor-track"
                          style={{
                            gridTemplateColumns: `repeat(${visibleDoctors.length}, minmax(0, 1fr))`,
                          }}
                        >
                          {visibleDoctors.map((doctor) => {
                            const doctorName =
                              doctor?.drTitle || "NEO Hospital Doctor";
                            const doctorSlug = doctor?.drSlug;
                            const designation =
                              doctor?.drDesignation ||
                              doctor?.drSpecialist ||
                              doctor?.drDepartment ||
                              "Specialist";
                            const qualification = doctor?.drQualification;
                            const image = doctor?.drImage
                              ? `${API}/uploads/doctors/${doctor.drImage}`
                              : fallbackImage;
                            const profilePath = doctorSlug
                              ? `/doctor-details/${doctorSlug}`
                              : "/doctors";

                            return (
                              <article
                                className="department-doctor-card"
                                key={
                                  doctor?._id ||
                                  doctorSlug ||
                                  doctorName
                                }
                              >
                                <div className="doctor-photo-wrap">
                                  <img
                                    src={image}
                                    alt={`${doctorName}, ${designation}`}
                                    className="doctor-photo"
                                    loading="lazy"
                                    onError={(event) => {
                                      event.currentTarget.src =
                                        fallbackImage;
                                    }}
                                  />

                                  <span className="doctor-specialist-badge">
                                    <i className="fa fa-check-circle"></i>
                                    Verified Specialist
                                  </span>
                                </div>

                                <div className="doctor-card-content">
                                  <span className="doctor-department">
                                    {department.title}
                                  </span>

                                  <h3>{doctorName}</h3>

                                  <p className="doctor-designation">
                                    {designation}
                                  </p>

                                  {qualification && (
                                    <p className="doctor-qualification">
                                      {qualification}
                                    </p>
                                  )}

                                  {doctor?.drExperience && (
                                    <p className="doctor-experience">
                                      <i className="fa fa-briefcase"></i>
                                      {doctor.drExperience}+ years experience
                                    </p>
                                  )}

                                  <div className="doctor-actions">
                                    

                                    {doctorSlug && (
                                      <Link
                                        to={profilePath}
                                        className="view-profile-btn"
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
                      </div>

                      {hasSlider && (
                        <div className="doctor-slider-status">
                          <span>
                            Showing {doctorStart + 1}–{" "}
                            {Math.min(
                              doctorStart + visibleDoctorCount,
                              doctors.length
                            )}{" "}
                            of {doctors.length} doctors
                          </span>
                          <div className="doctor-slider-dots">
                            {Array.from({ length: maxStart + 1 }).map(
                              (_, index) => (
                                <button
                                  type="button"
                                  key={index}
                                  aria-label={`Show doctors ${index + 1}`}
                                  className={
                                    index === doctorStart
                                      ? "active"
                                      : ""
                                  }
                                  onClick={() => setDoctorStart(index)}
                                />
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="no-doctors-message">
                      <div className="no-doctors-icon">
                        <i className="fa fa-user-md"></i>
                      </div>
                      <h3>Specialists coming soon</h3>
                      <p>
                        Doctor information for this department will be updated
                        soon.
                      </p>
                    </div>
                  )}
                </section>

                <section className="about-department">
                  <div className="section-label">About the Department</div>
                  <h2>{department.title} Care at NEO Hospital</h2>
                  <div className="section-line"></div>
                  <div className="content-body">
                    {parse(department.content || "")}
                  </div>
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