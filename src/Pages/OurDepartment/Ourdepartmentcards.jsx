import React, { useState, useEffect } from "react";
import DepartmentCard from "./DepartmentCard";
import "./departmentcard.css";

function Ourdepartmentcards() {
  const [Neospecial, setNeospecial] = useState([]); // Neospecial state to store API data
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.neohospital.com/api/adminv1/view-category"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        setNeospecial(data.category);
        // Set the fetched data to Neospecial state
      } catch (error) {
        setError(error); // Handle errors
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array to ensure the effect runs only once
  const filteredCategories = Neospecial.filter(
    (category) => category.status === true
  );
  // Rendering the component
  return (
    <section  className='special'>
      <div className="Ourdepartmentcards container">
        <h3 className="about-title">
          <span>OUR SPECIALTY DEPARTMENTS</span>
        </h3>
        <p className="about-description">
          Neo Hospital places paramount importance on patient care, seamlessly
          merging cutting-edge medical advancements with heartfelt compassion.
          Our foundational principle is to craft an experience where every
          patient feels supported, efficient, and valued.
        </p>
      </div>
      {/* <div className="row">
        {filteredCategories.map((value, index) => (
          <div key={index} className="col-lg-3 col-md-6 department-responsive">
            <DepartmentCard
              blogimage={`https://api.neohospital.com/uploads/categories/${value.image}`}
              title={value.title}
              departmentslug={value.slug}
            />
          </div>
        ))}
      </div> */}
      <section className="departmentcards px-5">
        <div className="card-slider">
          <div className="row">
            {Neospecial.map((value, index) => (
              <div
                key={index}
                className="col-4 lg-2 col-md-3 col-12 department-responsive"
              >
                <DepartmentCard
                  blogimage={`https://api.neohospital.com/uploads/categories/${value.image}`}
                  title={value.title}
                  departmentslug={value.slug}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Ourdepartmentcards;
