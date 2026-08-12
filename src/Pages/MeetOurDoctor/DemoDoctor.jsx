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
  const [filteredDoctors, setFilteredDoctors] = useState([]);

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
    const search = searchQuery
      .trim()
      .toLowerCase();

    if (!search) {
      setFilteredDoctors(doctors);
      return;
    }

    const filtered = doctors.filter((doctor) =>
      doctor.drTitle
        ?.toLowerCase()
        .includes(search)
    );

    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

  // =====================================
  // Search Change
  // =====================================

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // =====================================
  // Loading
  // =====================================

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <h3>Loading doctors...</h3>
      </div>
    );
  }

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

      {/* Header */}
      <div>
        <div className="row align-items-center">

          <div className="col-md-8">
            <h1 className="about-title">
              Meet Our Doctors
            </h1>
          </div>

          <div className="col-md-4">
            <form
              className="search-bar form-inline my-2 my-lg-0"
              onSubmit={(e) =>
                e.preventDefault()
              }
            >
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
          Neo Super Speciality Hospital places
          paramount importance on patient care,
          seamlessly merging cutting-edge medical
          advancements with heartfelt compassion.
          Our foundational principle is to craft
          an experience where every patient feels
          supported, efficient, and valued.
        </p>
      </div>

      {/* No Doctors */}
      {filteredDoctors.length === 0 && (
        <div className="text-center py-5">
          <h3>No doctors found.</h3>
        </div>
      )}

      {/* Doctors by Department */}
      {categories
        .filter((category) =>
          filteredDoctors.some(
            (doctor) =>
              doctor.drDepartment ===
              category.title
          )
        )
        .map((category) => (

          <div
            key={
              category._id ||
              category.id ||
              category.title
            }
          >

            <h2>{category.title}</h2>

            <div className="row">

              {filteredDoctors
                .filter(
                  (doctor) =>
                    doctor.drDepartment ===
                    category.title
                )
                .map((doctor) => (

                  <div
                    className="col-md-3"
                    key={
                      doctor._id ||
                      doctor.id ||
                      doctor.drSlug
                    }
                  >

                    <Doctorcard
                      doctorpic={
                        doctor.drImage
                      }
                      doctorname={
                        doctor.drTitle
                      }
                      doctordetails={
                        doctor.drQualification
                      }
                      doctorslug={
                        doctor.drSlug
                      }
                      doctordepartment={
                        doctor.drDepartment
                      }
                      doctortime={
                        doctor.drTiming
                      }
                      doctorspecialist={
                        doctor.drQualification
                      }
                    />

                  </div>

                ))}

            </div>

          </div>

        ))}
    </section>
  );
}

export default DemoDoctor;