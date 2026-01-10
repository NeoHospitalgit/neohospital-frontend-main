import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./testimonialfile.css";

import feedbackpic from "../../Assets/index/feedbackpic.jpg";
import userreview from "../../Assets/index/userreview.png";
import { testimonials } from "./Homeimages.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons"; // Filled star

const Testimonialfile = () => {
  const [sliderFor, setSliderFor] = useState(null);
  const [sliderNav, setSliderNav] = useState(null);

  const sliderForRef = useRef(null);
  const sliderNavRef = useRef(null);

  // Sync sliders after mount
  useEffect(() => {
    setSliderFor(sliderForRef.current);
    setSliderNav(sliderNavRef.current);
  }, []);

  const mainSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: sliderNav,
    ref: sliderForRef,
  };

  const navSliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: sliderFor,
    dots: true,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: "0px",
    ref: sliderNavRef,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="neotestimonials" aria-labelledby="testimonials-heading">
      {/* SEO-Friendly H1 - Visible to Google, hidden visually if needed */}
     

      <div className="container">
        <div className="neotestimonial">
          <h3 className="dt-title">
            <span>Testimonials</span>
            <p className="dt-description">What our Patients say about us..</p>
          </h3>
        </div>

        <div className="testifile">
          <div className="main">
            <div className="row align-items-center">
              {/* Left Image */}
              <div className="col-lg-4 col-md-5 mb-4 mb-md-0">
                <img src={feedbackpic} className="img-fluid rounded shadow" alt="Happy patient giving feedback" />
              </div>

              {/* Right Slider Area */}
              <div className="col-lg-8 col-md-7">
                {/* Main Large Testimonial Slider */}
                <div className="main-testimonial-slider mb-4">
                  <Slider {...mainSliderSettings}>
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="testimonial-content px-4">
                        <p className="lead fst-italic">"{testimonial.text}"</p>
                        <div className="mt-4">
                          <strong className="d-block">{testimonial.author}</strong>
                          {testimonial.location && <small className="text-muted">{testimonial.location}</small>}
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>

                {/* Thumbnail / Navigation Slider */}
                <Slider {...navSliderSettings} className="slider-nav-custom">
                  {testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className="nav-testimonial-item text-center px-3">
                      <img
                        src={userreview}
                        alt={`${testimonial.author}'s photo`}
                        className="rounded-circle mb-3"
                        style={{ width: "70px", height: "70px", objectFit: "cover" , margin: "0 0 0 75px"}}
                      />
                      <h6 className="mb-1">{testimonial.author}</h6>
                      <div className="text-warning small">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon key={i} icon={solidStar} />
                        ))}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonialfile;
