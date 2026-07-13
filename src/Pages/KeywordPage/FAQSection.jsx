import React, { useState } from "react";
import "./Keyword.css";

function FAQSection({ faqs }) {
  const [active, setActive] = useState(0);

  return (
    <section className="faq-section">
      <div className="container">

        <div className="section-heading">

          <span className="section-tag">
            FAQs
          </span>

          <h2>
            Frequently Asked Questions
          </h2>

          <p>
            Find answers to the most common questions about our doctors,
            treatments and healthcare services.
          </p>

        </div>

        <div className="faq-wrapper">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className={`faq-item ${
                active === index ? "active" : ""
              }`}
            >

              <button
                className="faq-question"
                onClick={() =>
                  setActive(active === index ? -1 : index)
                }
              >

                <span>
                  {faq.question}
                </span>

                <span className="faq-icon">
                  {active === index ? "−" : "+"}
                </span>

              </button>

              <div
                className={`faq-answer ${
                  active === index ? "show" : ""
                }`}
              >
                <p>
                  {faq.answer}
                </p>
              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQSection;