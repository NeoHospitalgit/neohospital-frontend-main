import React, { useState } from "react";
import "./ProcedureFAQ.css";

function ProcedureFAQ() {

  const faqs = [
    {
      question: "What is Knee Replacement Surgery?",
      answer:
        "Knee replacement surgery is a procedure in which damaged parts of the knee joint are replaced with artificial implants to reduce pain and improve movement.",
    },
    {
      question: "Who needs Knee Replacement Surgery?",
      answer:
        "People suffering from severe arthritis, chronic knee pain, stiffness, or limited mobility that does not improve with medication or physiotherapy may require knee replacement surgery.",
    },
    {
      question: "How long does the surgery take?",
      answer:
        "The procedure generally takes between 1 to 2 hours, depending on the patient's condition and the complexity of the surgery.",
    },
    {
      question: "How long is the recovery period?",
      answer:
        "Most patients can resume normal daily activities within 4 to 6 weeks, while complete recovery may take around 3 months with proper rehabilitation.",
    },
    {
      question: "Is Knee Replacement Surgery safe?",
      answer:
        "Yes. Knee replacement is considered a safe and highly successful procedure when performed by experienced orthopaedic surgeons.",
    },
    {
      question: "How soon can I walk after surgery?",
      answer:
        "Most patients begin standing and walking with assistance within 24 hours after the surgery under the guidance of a physiotherapist.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="procedure-faq">

      <div className="container">

        <div className="section-heading">

          <span>Frequently Asked Questions</span>

          <h2>
            Knee Replacement Surgery FAQs
          </h2>

          <p>
            Find answers to the most commonly asked questions about
            knee replacement surgery, recovery, risks and treatment.
          </p>

        </div>

        <div className="faq-wrapper">

          {faqs.map((faq, index) => (

            <div
              className={`faq-item ${
                activeIndex === index ? "active" : ""
              }`}
              key={index}
            >

              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >

                <span>{faq.question}</span>

                <span className="faq-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>

              </button>

              <div
                className={`faq-answer ${
                  activeIndex === index ? "show" : ""
                }`}
              >

                <p>{faq.answer}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ProcedureFAQ;