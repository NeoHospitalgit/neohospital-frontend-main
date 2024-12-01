import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NeoTestimonial.css";
import { testimonials } from "./Homeimages.jsx";

const NeoTestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <section className="testibackground py-5">
        <div className="container">
          <div className="neotestimonial">
            <h3 className="dt-title">
              <span>Testimonials</span>
              <p className="dt-description">What our Patients say about us..</p>
            </h3>
          </div>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="testimonial-slider">
                <Slider {...settings}>
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial">
                      <div className="testiimg">
                        <img src={testimonial.person} alt="" srcSet="" />
                      </div>
                      <p>{testimonial.text}</p>
                      <a
                        href={testimonial.testurl}
                        target="_blank"
                        className="author"
                      >
                        {testimonial.author}
                      </a>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NeoTestimonialSlider;
