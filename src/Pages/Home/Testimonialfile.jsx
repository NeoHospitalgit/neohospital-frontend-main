import React, { useRef } from "react";
import Slider from "react-slick";
import "./testimonialfile.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import feedbackpic from "../../Assets/index/feedbackpic.jpg";
import userreview from "../../Assets/index/userreview.png";
import { testimonials } from "./Homeimages.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Testimonialfile = () => {
  const sliderFor = useRef(null);
  const sliderNav = useRef(null);

  const settingsFor = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: sliderNav.current,
  };

  const settingsNav = {
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: sliderFor.current,
    dots: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768, // Mobile view breakpoint
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleClick = (slideNumber) => {
    if (sliderFor.current) {
      sliderFor.current.slickGoTo(slideNumber - 1);
    }
  };

  return (
    <section className="neotestimonials">
      <div className="container">
        <div className="neotestimonial">
          <h3 className="dt-title">
            <span>Testimonials</span>
            <p className="dt-description">What our Patients say about us..</p>
          </h3>
        </div>
        <div className="testifile">
          <div className="main">
            <div className="row">
              <div className="col-md-3">
                <img src={feedbackpic} className="img-fluid" alt="Feedback" />
              </div>
              <div className="col-md-9">
                <Slider
                  {...settingsNav}
                  ref={sliderNav}
                  className="slider slider-nav"
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testcardnew">
                      <div className="row">
                        <div className="col-md-3">
                          <img src={userreview} className="img-fluid" alt="" />
                        </div>
                        <div className="col-md-9">
                          <h2>
                            <a
                              href={testimonial.testurl}
                              className="author"
                            >
                              {testimonial.author}
                            </a>
                          </h2>
                          <div className="reviewstartimg">
                            <FontAwesomeIcon icon="star" />
                            <FontAwesomeIcon icon="star" />
                            <FontAwesomeIcon icon="star" />
                            <FontAwesomeIcon icon="star" />
                            <FontAwesomeIcon icon="star" />
                          </div>
                        </div>
                      </div>
                      <div className="reviewpara">
                        <p>{testimonial.text}</p>
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
