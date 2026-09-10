import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Corevalue from "../About/Corevalue";
import "./clinicalservice.css";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";

import { useAuth } from "../../store/auth";

function ServiceDetails() {
  const [neoServicedetailslast, setNeoServicedetailslast] = useState([]);
  const [neoServicedetails, setNeoServicedetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { service, servicedetail } = useParams();
  const { API } = useAuth();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!API) return;

      try {
        setLoading(true);

        const response = await fetch(
          `${API}/api/services/view-services`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch service details");
        }

        const data = await response.json();

        const allServices = Array.isArray(data?.services)
          ? data.services
          : [];

        // Filter services based on service category
        const filteredServices = allServices.filter(
          (value) =>
            value.serviceCat === service &&
            value.status !== false
        );

        setNeoServicedetailslast(filteredServices);

        if (servicedetail) {
          const filteredServicesdetails = allServices.filter(
            (value) =>
              value.serviceCat === service &&
              value.slug === servicedetail &&
              value.status !== false
          );

          setNeoServicedetails(filteredServicesdetails);
        } else {
          setNeoServicedetails([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [API, service, servicedetail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!neoServicedetailslast.length) {
    return <div>Service not found for {service}.</div>;
  }

  // ==========================================
  // CURRENT SERVICE
  // ==========================================

  const currentService =
    neoServicedetails.length > 0
      ? neoServicedetails[0]
      : null;

  // ==========================================
  // HELPER - REMOVE HTML
  // ==========================================

  const stripHtml = (html) => {
    if (!html) return "";

    return String(html)
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  // ==========================================
  // FALLBACK SEO DATA
  // ==========================================

  const serviceTitle =
    currentService?.serviceTitle ||
    "NEO Hospital Services";

  const serviceSlug =
    currentService?.slug ||
    servicedetail ||
    "";

  const serviceCategory =
    currentService?.serviceCat ||
    service ||
    "";

  const canonicalUrl = currentService
    ? `https://www.neohospital.com/service/${encodeURIComponent(
        serviceCategory
      )}/${encodeURIComponent(serviceSlug)}`
    : `https://www.neohospital.com/service/${encodeURIComponent(
        service
      )}/${encodeURIComponent(servicedetail || "")}`;

  const serviceContent =
    stripHtml(
      currentService?.serviceDetail || ""
    );

  const fallbackTitle =
    `${serviceTitle} in Noida | NEO Hospital`;

  const fallbackDescription =
    serviceContent
      ? serviceContent.substring(0, 155)
      : `Get advanced ${serviceTitle} services in Noida at NEO Hospital with experienced specialists, modern technology, and quality patient care.`;

  const fallbackKeywords =
    `${serviceTitle}, ${serviceTitle} in Noida, NEO Hospital, ${serviceTitle} services in Noida, hospital in Noida`;

  // ==========================================
  // SEO TAGS FROM DATABASE
  // ==========================================

  const savedSeoTags =
    currentService?.serviceSeoTags
      ? String(currentService.serviceSeoTags).trim()
      : "";

  /*
   * Check which SEO tags are already saved.
   * This prevents duplicate title/canonical/meta tags
   * when we need to add fallback tags.
   */

  const hasTitleTag =
    /<title\b[^>]*>/i.test(savedSeoTags);

  const hasDescriptionTag =
    /<meta\b[^>]*name=["']description["'][^>]*>/i.test(
      savedSeoTags
    );

  const hasKeywordsTag =
    /<meta\b[^>]*name=["']keywords["'][^>]*>/i.test(
      savedSeoTags
    );

  const hasCanonicalTag =
    /<link\b[^>]*rel=["']canonical["'][^>]*>/i.test(
      savedSeoTags
    );

  // ==========================================
  // SEO HEAD
  // ==========================================

  const seoHeadContent = savedSeoTags
    ? parse(savedSeoTags)
    : null;

  return (
    <>
      {/* =====================================
          SEO / HEAD TAGS
      ===================================== */}

      <Helmet>
        {/* Saved SEO Tags from Admin */}
        {seoHeadContent}

        {/* =====================================
            FALLBACK SEO TAGS
            Only added when missing in database
        ===================================== */}

        {!hasTitleTag && (
          <title>{fallbackTitle}</title>
        )}

        {!hasDescriptionTag && (
          <meta
            name="description"
            content={fallbackDescription}
          />
        )}

        {!hasKeywordsTag && (
          <meta
            name="keywords"
            content={fallbackKeywords}
          />
        )}

        {!hasCanonicalTag && (
          <link
            rel="canonical"
            href={canonicalUrl}
          />
        )}

        {/* Always keep robots directive */}
        <meta
          name="robots"
          content="index, follow"
        />
      </Helmet>

      {/* =====================================
          PAGE CONTENT
      ===================================== */}

      <Corevalue />

      <section className="container ClinicalService">
        <div className="row">

          {/* =====================================
              SERVICE SIDEBAR
          ===================================== */}

          <div className="col-md-4">

            <div>
              <h3 className="about-title">
                <span>{service}</span>
              </h3>
            </div>

            <div>
              <ul className="servicelist">

                {neoServicedetailslast.map(
                  (value) => (
                    <li
                      key={
                        value._id ||
                        value.id ||
                        value.slug
                      }
                    >
                      <Link
                        to={`/service/${value.serviceCat}/${value.slug}`}
                      >
                        <i className="fa fa-angle-double-right mx-2"></i>

                        {value.serviceTitle}
                      </Link>
                    </li>
                  )
                )}

              </ul>
            </div>

          </div>

          {/* =====================================
              SERVICE DETAIL
          ===================================== */}

          {servicedetail && (
            <div className="col-md-8">

              <div>

                {neoServicedetails.map(
                  (value) => (
                    <div
                      key={
                        value._id ||
                        value.id ||
                        value.slug
                      }
                    >

                      {/* H1 */}
                      <h1 className="mt-4">
                        {value.serviceTitle}
                      </h1>

                      {/* Service Image */}
                      {value.image && (
                        <img
                          src={`${API}/uploads/Service/${value.image}`}
                          className="img-fluid"
                          width="600"
                          height="400"
                          alt={`${value.serviceTitle} - NEO Hospital`}
                        />
                      )}

                      {/* Service Content */}
                      <div className="service-detail-content">
                        {parse(
                          value.serviceDetail || ""
                        )}
                      </div>

                    </div>
                  )
                )}

              </div>

            </div>
          )}

        </div>
      </section>
    </>
  );
}

export default ServiceDetails;