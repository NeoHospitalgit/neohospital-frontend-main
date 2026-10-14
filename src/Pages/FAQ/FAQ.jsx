import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
import { useAuth } from "../../store/auth";
import "./FAQ.css";

function FAQ() {
  const { API } = useAuth();

  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [seo, setSeo] = useState(null);

  // =====================================
  // Fetch FAQs
  // =====================================

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

  // =====================================
  // Fetch FAQ SEO
  // =====================================

  useEffect(() => {
    if (!API) return;

    let cancelled = false;

    const fetchSeo = async () => {
      try {
        const response = await fetch(`${API}/api/header/view-header`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch header data: ${response.status}`
          );
        }

        const data = await response.json();

        const headers = Array.isArray(data?.header)
          ? data.header
          : [];

        const faqSeo = headers.find((item) => {
          const pageName = String(item?.page || "")
            .trim()
            .toLowerCase();

          return (
            pageName === "faq" ||
            pageName === "/faq" ||
            pageName === "faqs" ||
            pageName === "/faqs"
          );
        });

        if (!cancelled) {
          setSeo(faqSeo || null);
        }
      } catch (error) {
        console.error("FAQ SEO Error:", error);

        if (!cancelled) {
          setSeo(null);
        }
      }
    };

    fetchSeo();

    return () => {
      cancelled = true;
    };
  }, [API]);

  // =====================================
  // FAQ Accordion
  // =====================================

  const handleFAQClick = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  // =====================================
  // FAQ Schema
  // =====================================

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter(
        (faq) =>
          faq?.question &&
          faq?.answer
      )
      .map((faq) => ({
        "@type": "Question",
        name: String(faq.question).trim(),
        acceptedAnswer: {
          "@type": "Answer",
          text: String(faq.answer).trim(),
        },
      })),
  };

  // =====================================
  // Dynamic SEO Head
  // =====================================

  const seoTags = seo?.tagdata
    ? parse(seo.tagdata)
    : null;

  return (
    <>
      <Helmet>
        {/* =====================================
            DEFAULT FAQ SEO FALLBACK
            Used when CMS SEO is unavailable
        ===================================== */}

        {!seo?.tagdata && (
          <>
            <title>
              Frequently Asked Questions | NEO Hospital
            </title>

            <meta
              name="description"
              content="Find answers to frequently asked questions about NEO Hospital, healthcare services, treatments, doctors, facilities and patient care in Noida."
            />

            <meta
              name="keywords"
              content="NEO Hospital FAQ, frequently asked questions NEO Hospital, hospital FAQ Noida, healthcare FAQ Noida, NEO Hospital services, hospital services Noida"
            />

            <link
              rel="canonical"
              href="https://www.neohospital.com/faq"
            />

            <meta
              name="robots"
              content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
            />

            <meta
              name="author"
              content="NEO Hospital"
            />

            <meta
              name="publisher"
              content="NEO Hospital"
            />

            {/* Open Graph */}

            <meta
              property="og:title"
              content="Frequently Asked Questions | NEO Hospital"
            />

            <meta
              property="og:description"
              content="Find answers to frequently asked questions about NEO Hospital, healthcare services, treatments, doctors, facilities and patient care in Noida."
            />

            <meta
              property="og:type"
              content="website"
            />

            <meta
              property="og:url"
              content="https://www.neohospital.com/faq"
            />

            <meta
              property="og:site_name"
              content="NEO Hospital"
            />

            <meta
              property="og:locale"
              content="en_IN"
            />

            {/* Twitter / X */}

            <meta
              name="twitter:card"
              content="summary_large_image"
            />

            <meta
              name="twitter:title"
              content="Frequently Asked Questions | NEO Hospital"
            />

            <meta
              name="twitter:description"
              content="Find answers to frequently asked questions about NEO Hospital, healthcare services, treatments, doctors, facilities and patient care in Noida."
            />

            <meta
              name="twitter:url"
              content="https://www.neohospital.com/faq"
            />
          </>
        )}

        {/* =====================================
            CMS SEO HEAD
        ===================================== */}

        {seoTags}

        {/* =====================================
            FAQ STRUCTURED DATA
        ===================================== */}

        {faqSchema.mainEntity.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema),
            }}
          />
        )}
      </Helmet>

      {/* =====================================
          FAQ PAGE
      ===================================== */}

      <div className="faq-page">

        {/* FAQ Banner */}

        <section className="faq-banner">
          <div className="faq-banner-content">

            <h1>
              Frequently Asked Questions
            </h1>

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

            {/* Loading */}

            {loading && (
              <div className="faq-message">
                <p>
                  Loading FAQs...
                </p>
              </div>
            )}

            {/* Error */}

            {!loading && error && (
              <div className="faq-message">
                <p>
                  Unable to load FAQs at the moment.
                  Please try again later.
                </p>
              </div>
            )}

            {/* Empty */}

            {!loading &&
              !error &&
              faqs.length === 0 && (
                <div className="faq-message">
                  <p>
                    No FAQs available at the moment.
                  </p>
                </div>
              )}

            {/* FAQ List */}

            {!loading &&
              !error &&
              faqs.length > 0 && (
                <div className="faq-list">

                  {faqs.map((faq, index) => (
                    <div
                      className={`faq-item ${
                        openIndex === index
                          ? "faq-active"
                          : ""
                      }`}
                      key={
                        faq?._id ||
                        faq?.id ||
                        `faq-${index}`
                      }
                    >

                      <button
                        type="button"
                        className="faq-question"
                        onClick={() =>
                          handleFAQClick(index)
                        }
                        aria-expanded={
                          openIndex === index
                        }
                        aria-controls={`faq-answer-${
                          faq?._id ||
                          faq?.id ||
                          index
                        }`}
                      >

                        <span>
                          {faq?.question}
                        </span>

                        <span className="faq-icon">
                          {openIndex === index
                            ? "−"
                            : "+"}
                        </span>

                      </button>

                      <div
                        id={`faq-answer-${
                          faq?._id ||
                          faq?.id ||
                          index
                        }`}
                        className="faq-answer"
                        style={{
                          display:
                            openIndex === index
                              ? "block"
                              : "none",
                        }}
                      >

                        <p>
                          {faq?.answer}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>
              )}

          </div>
        </section>

      </div>
    </>
  );
}

export default FAQ;