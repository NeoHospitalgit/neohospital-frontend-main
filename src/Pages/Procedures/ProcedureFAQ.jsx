import React, { useState } from "react";
import "./ProcedureFAQ.css";

function ProcedureFAQ({ faq = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  // ==========================
  // No FAQ
  // ==========================
  if (!Array.isArray(faq) || faq.length === 0) {
    return null;
  }

  return (
    <section className="procedure-faq">

      <div className="container">

        {/* Heading */}

        <div className="section-heading">

          <span>
            Frequently Asked Questions
          </span>

          <h2>
            Frequently Asked Questions
          </h2>

          <p>
            Find answers to the most commonly asked questions about this
            procedure.
          </p>

        </div>

        {/* FAQ */}

        <div className="faq-wrapper">

          {faq.map((item, index) => {

            const question =
              item?.question ||
              item?.faq_question ||
              "";

            const answer =
              item?.answer ||
              item?.faq_answer ||
              "";

            return (

              <div
                className={`faq-item ${
                  activeIndex === index
                    ? "active"
                    : ""
                }`}
                key={item?._id || index}
              >

                <button
                  type="button"
                  className="faq-question"
                  onClick={() =>
                    toggleFAQ(index)
                  }
                >

                  <span>
                    {question}
                  </span>

                  <span className="faq-icon">
                    {activeIndex === index
                      ? "−"
                      : "+"}
                  </span>

                </button>

                <div
                  className={`faq-answer ${
                    activeIndex === index
                      ? "show"
                      : ""
                  }`}
                >

                  <p>
                    {answer}
                  </p>

                </div>

              </div>

            );
          })}

        </div>

      </div>

    </section>
  );
}

export default ProcedureFAQ;