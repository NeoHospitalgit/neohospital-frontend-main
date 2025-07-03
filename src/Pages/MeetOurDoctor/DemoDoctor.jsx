import React, { useState, useEffect } from "react";
import Doctorcard from "./Doctorcard";

function DemoDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.neohospital.com/api/adminv2/view-doctors"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setDoctors(data.doctors);
        setFilteredDoctors(data.doctors); // Initialize filteredDoctors with all doctors
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.neohospital.com/api/adminv1/view-category"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.category);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Filter doctors based on search query
    const filtered = doctors.filter((doctor) =>
      doctor.drTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <section className="doctorpage">
        <div>
          <div className="row">
            <div className="col-md-8">
              <h3 className="about-title">Meet Our Doctors</h3>
            </div>
            <div className="col-md-4">
              <form className="search-bar form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search doctors"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </form>
            </div>
          </div>
          <p className="about-description">
            Neo Super Speciality Hospital places paramount importance on patient care, seamlessly
            merging cutting-edge medical advancements with heartfelt compassion.
            Our foundational principle is to craft an experience where every
            patient feels supported, efficient, and valued.
          </p>
        </div>
        {categories
          .filter((category) =>
            filteredDoctors.some(
              (doctor) => doctor.drDepartment === category.title
            )
          )
          .map((category) => (
            <div key={category.id}>
              <h2>{category.title}</h2>
              <div className="row">
                {filteredDoctors
                  .filter((doctor) => doctor.drDepartment === category.title)
                  .map((doctor) => (
                    <div className="col-md-3" key={doctor.id}>
                      <Doctorcard
                        doctorpic={doctor.drImage}
                        doctorname={doctor.drTitle}
                        doctordetails={doctor.drQualification}
                        doctorslug={doctor.drSlug}
                        doctordepartment={doctor.drDepartment}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </section>
    </>
  );
}

export default DemoDoctor;
