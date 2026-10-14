import React, { useState, useEffect } from "react";
import Doctorcard from "./Doctorcard";
import { useAuth } from "../../store/auth";

function DemoDoctor() {
  const { API } = useAuth();

  const [doctors, setDoctors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState("");
  const [gender, setGender] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 8;

  // =====================================
  // Fetch Doctors + Categories
  // =====================================

  useEffect(() => {
    if (!API) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [doctorsResponse, categoriesResponse] =
          await Promise.all([
            fetch(`${API}/api/doctors/view-doctors`),
            fetch(`${API}/api/categories/view-category`),
          ]);

        const doctorsData = await doctorsResponse.json();
        const categoriesData = await categoriesResponse.json();

        if (!doctorsResponse.ok) {
          throw new Error(
            doctorsData?.message ||
              "Failed to fetch doctors"
          );
        }

        if (!categoriesResponse.ok) {
          throw new Error(
            categoriesData?.message ||
              "Failed to fetch categories"
          );
        }

        const doctorList =
          doctorsData?.doctors || [];

        const categoryList =
          categoriesData?.category || [];

        setDoctors(doctorList);
        setFilteredDoctors(doctorList);
        setCategories(categoryList);
      } catch (error) {
        console.error(
          "Doctors page API error:",
          error
        );

        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API]);

  // =====================================
  // Search Doctors
  // =====================================

  useEffect(() => {
    const search = searchQuery.trim().toLowerCase();
    const filtered = doctors.filter((doctor) => {
      const searchable = [
        doctor.drTitle,
        doctor.drDepartment,
        doctor.drQualification,
      ].join(" ").toLowerCase();
      const doctorExperience = Number.parseInt(
        String(doctor.drExperience || doctor.drYearsExperience || "").match(/\d+/)?.[0] || "0",
        10
      );
      const doctorGender = String(doctor.drGender || doctor.gender || "").toLowerCase();
      return (!search || searchable.includes(search)) &&
        (!department || doctor.drDepartment === department) &&
        (!experience || doctorExperience >= Number(experience)) &&
        (!gender || doctorGender === gender.toLowerCase());
    });
    setFilteredDoctors(filtered);
    setCurrentPage(1);
  }, [searchQuery, department, experience, gender, doctors]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  // =====================================
  // Search Change
  // =====================================

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setDepartment("");
    setExperience("");
    setGender("");
  };

  const sortedDoctors = [...filteredDoctors].sort((firstDoctor, secondDoctor) => {
    if (sortBy !== "name") return 0;
    return String(firstDoctor.drTitle || "").localeCompare(
      String(secondDoctor.drTitle || "")
    );
  });
  const totalPages = Math.ceil(sortedDoctors.length / doctorsPerPage);
  const visibleDoctors = sortedDoctors.slice(
    (currentPage - 1) * doctorsPerPage,
    currentPage * doctorsPerPage
  );

  // =====================================
  // Error
  // =====================================

  if (error) {
    return (
      <div className="text-center py-5">
        <h3 className="text-danger">
          Unable to load doctors.
        </h3>

        <p>{error.message}</p>
      </div>
    );
  }

  // =====================================
  // Render
  // =====================================

  return (
    <section className="doctorpage">
      <div className="doctor-hero">
        <div className="doctor-hero-inner">
          <div className="doctor-hero-copy">
            <div className="doctor-breadcrumb">Home <span>›</span> Doctors</div>
            <h1>Meet Our <span>Expert Doctors</span></h1>
            <p>Our experienced team of doctors is committed to providing world-class, compassionate and personalized healthcare for you and your family.</p>
            <div className="doctor-highlights">
              <span><b>♧</b> Highly Qualified<br />Specialists</span>
              <span><b>♡</b> Patient-Centric<br />Approach</span>
              <span><b>▦</b> Advanced<br />Medical Facilities</span>
              <span><b>♢</b> Trusted by<br />Thousands</span>
            </div>
          </div>
          <div className="doctor-quote">“Expert Care<br />for a Healthier<br />Tomorrow”</div>
          <div className="doctor-stats">
            <div><strong>♟</strong><b>25+</b><small>Years of Excellence</small></div>
            <div><strong>♧</strong><b>100+</b><small>Expert Doctors</small></div>
            <div><strong>♣</strong><b>50,000+</b><small>Happy Patients</small></div>
            <div><strong>♧</strong><b>30+</b><small>Specialities</small></div>
          </div>
        </div>
      </div>

      <div className="doctor-filter-bar">
        <form onSubmit={(e) => e.preventDefault()} className="doctor-search">
          <span>⌕</span>
          <input type="search" placeholder="Search by doctor name, specialty or condition..." value={searchQuery} onChange={handleSearchChange} />
        </form>
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All Departments</option>
          {categories.map((category) => <option key={category._id || category.title} value={category.title}>{category.title}</option>)}
        </select>
        <select value={experience} onChange={(e) => setExperience(e.target.value)}><option value="">Experience</option><option value="10">10+ Years</option><option value="15">15+ Years</option><option value="20">20+ Years</option></select>
        <select value={gender} onChange={(e) => setGender(e.target.value)}><option value="">Gender</option><option>Male</option><option>Female</option></select>
        <button className="doctor-search-btn" type="submit">Search</button>
        <button className="doctor-reset-btn" type="button" onClick={resetFilters}>↻ Reset Filters</button>
      </div>

      {isLoading ? (
        <div className="doctor-grid doctor-grid-loading" aria-label="Loading doctors">
          {Array.from({ length: doctorsPerPage }, (_, index) => (
            <div className="doctor-skeleton" key={index} aria-hidden="true" />
          ))}
        </div>
      ) : (
        <>
          <div className="doctor-results-head">
            <strong>Showing {filteredDoctors.length} Doctors</strong>
            <label>Sort by:
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}><option value="popular">Most Popular</option><option value="name">Name</option></select>
            </label>
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-5">
              <h3>No doctors found.</h3>
            </div>
          )}

          <div className="doctor-grid">
            {visibleDoctors.map((doctor) => (
              <Doctorcard key={doctor._id || doctor.id || doctor.drSlug} doctorpic={doctor.drImage} doctorname={doctor.drTitle} doctordetails={doctor.drQualification} doctorslug={doctor.drSlug} doctordepartment={doctor.drDepartment} doctortime={doctor.drTiming} doctorspecialist={doctor.drQualification} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="doctor-pagination" aria-label="Doctor pages">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  );
}

export default DemoDoctor;