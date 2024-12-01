import React from "react";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./Specialty.css";
import DepartmentCard from "../OurDepartment/DepartmentCard";
// import departmentcontent from "../OurDepartment/DepartmentContent";
import "../OurDepartment/departmentcard.css";

const Specialty = () => {
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

  // Rendering the component
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <>
        <section className="departmentarrow">
          <div
            className={`${className} custom-prev-arrow`}
            style={{ ...style }}
            onClick={onClick}
          >
            Previous
          </div>
        </section>
      </>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <>
        <section className="departmentarrow">
          <div
            className={`${className} custom-next-arrow`}
            style={{ ...style }}
            onClick={onClick}
          >
            Next
          </div>
        </section>
      </>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const cardsToShow = showMore ? Neospecial.length : 12;

  return (
    <>
      <section className="departmentcards">
        <div className="card-slider">
          <div className="row">
            {Neospecial.slice(0, cardsToShow).map((value, index) => (
              <div
                key={index}
                className="col-lg-2 col-md-3 col-6 department-responsive"
              >
                <DepartmentCard
                  blogimage={`https://api.neohospital.com/uploads/categories/${value.image}`}
                  title={value.title}
                  departmentslug={value.slug}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <button onClick={toggleShowMore} className="text-appointment-btn">
              {showMore ? "View Less" : "View All Department"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Specialty;
