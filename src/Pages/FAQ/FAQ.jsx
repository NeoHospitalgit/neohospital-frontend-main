import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "../../store/auth";
import "./FAQ.css";

function FAQ() {
  const { API } = useAuth();

  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!API) return;

    let cancelled = false;

    const fetchFAQs = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`${API}/api/faqs/view-faqs`);

        if (!response.ok) {
          throw new Error(`Failed to fetch FAQs: ${response.status}`);
        }

        const data = await response.json();

        if (!cancelled) {
          setFaqs(Array.isArray(data?.faqs) ? data.faqs : []);
        }
      } catch (error) {
        console.error("FAQ Error:", error);

        if (!cancelled) {
          setError(true);
          setFaqs([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchFAQs();

    return () => {
      cancelled = true;
    };
  }, [API]);

  const handleFAQClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="faq-page">

      <Helmet>
        <title>
          Frequently Asked Questions | NEO Hospital Noida
        </title>

        <meta
          name="description"
          content="Find answers to frequently asked questions about NEO Hospital, doctors, appointments, treatments, services and healthcare facilities in Noida."
        />

        <link
          rel="canonical"
          href="https://www.neohospital.com/faq"
        />

        {faqs.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      {/* FAQ Banner */}
      <section className="faq-banner">
        <div className="faq-banner-content">
          <h1>Frequently Asked Questions</h1>

          <p>
            Find answers to common questions about NEO Hospital,
            our healthcare services, treatments and facilities.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">

          <div className="faq-heading">
            <span>FAQ</span>

            <h2>
              Frequently Asked Questions
            </h2>

            <p>
              Get answers to the most commonly asked questions
              about NEO Hospital and our healthcare services.
            </p>
          </div>

          {loading && (
            <div className="faq-message">
              <p>Loading FAQs...</p>
            </div>
          )}

          {!loading && error && (
            <div className="faq-message">
              <p>
                Unable to load FAQs at the moment. Please try again later.
              </p>
            </div>
          )}

          {!loading && !error && faqs.length === 0 && (
            <div className="faq-message">
              <p>No FAQs available at the moment.</p>
            </div>
          )}

          {!loading && !error && faqs.length > 0 && (
            <div className="faq-list">

              {faqs.map((faq, index) => (
                <div
                  className={`faq-item ${
                    openIndex === index ? "faq-active" : ""
                  }`}
                  key={faq._id}
                >

                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => handleFAQClick(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${faq._id}`}
                  >
                    <span>
                      {faq.question}
                    </span>

                    <span className="faq-icon">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${faq._id}`}
                    className="faq-answer"
                    style={{
                      display:
                        openIndex === index ? "block" : "none",
                    }}
                  >
                    <p>
                      {faq.answer}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </section>

    </div>
  );
}

export default FAQ;