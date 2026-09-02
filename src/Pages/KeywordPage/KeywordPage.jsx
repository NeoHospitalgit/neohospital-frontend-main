import React, { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

import { useAuth } from "../../store/auth";

import KeywordBanner from "./KeywordBanner";
import WelcomeSection from "./WelcomeSection";
import DoctorsSection from "./DoctorsSection";
import ExpertCTASection from "./ExpertCTASection";
import ContentSection from "./ContentSection";
import CTASection from "./CTASection";
import FAQSection from "./FAQSection";
import NotFound from "../NotFound";
import "./Keyword.css";

function KeywordPage() {
  const { slug } = useParams();
  const { API } = useAuth();

  const [keyword, setKeyword] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // Fetch Keyword Data
  // =====================================
  const getKeyword = useCallback(async () => {
    if (!slug || !API) {
      setLoading(false);
      setKeyword(null);
      setError("Invalid page URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setKeyword(null);


      const response = await fetch(
        `${API}/api/keywords/keyword/${slug}`
      );

      const data = await response.json();

      if (response.ok && data?.success && data?.data) {
        setKeyword(data.data);
      } else {
        setKeyword(null);
        setError("Page Not Found");
      }
    } catch (error) {
      console.error("Keyword API Error:", error);

      setKeyword(null);
      setError("Unable to load page.");
    } finally {
      setLoading(false);
    }
  }, [slug, API]);

  // =====================================
  // Load Keyword
  // =====================================
  useEffect(() => {
    getKeyword();
  }, [getKeyword]);

  // =====================================
  // Loading
  // =====================================
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!keyword) {
    return <NotFound />;
  }
  // =====================================
  // Error / Not Found
  // =====================================
  if (!keyword) {
    return (
      <div className="container py-5 text-center">
        <h2>{error || "Page Not Found"}</h2>
      </div>
    );
  }

  // =====================================
  // Render Page
  // =====================================
  return (
    <>
      {/* =====================================
          DYNAMIC SEO
          ===================================== */}

      {(keyword?.seo_head || keyword?.seo_tag || keyword?.seotags || keyword?.tagdata) && (
        <Helmet>
          {parse(
            keyword?.seo_head ||
            keyword?.seo_tag ||
            keyword?.seotags ||
            keyword?.tagdata
          )}
        </Helmet>
      )}

      {/* =====================================
          KEYWORD BANNER
          ===================================== */}

      <KeywordBanner
        title={keyword.keyword_title}
        direction={keyword.keyword_description}
        image={
          keyword.banner_image
            ? `${API}/uploads/blogs/${keyword.banner_image}`
            : ""
        }
      />

      {/* =====================================
          WELCOME SECTION
          ===================================== */}

      <WelcomeSection
        title={keyword.welcome_title}
        description={keyword.welcome_content}
        canHelpTitle={keyword.can_help}
        canHelpContent={keyword.can_help_content}
      />

      {/* =====================================
          DOCTORS SECTION
          ===================================== */}

      {keyword.doctors?.length > 0 && (
        <DoctorsSection
          doctors={keyword.doctors}
          API={API}
          teamTitle={keyword.team_title}
          teamContent={keyword.team_content}
        />
      )}

      {/* =====================================
          EXPERT CTA SECTION
          ===================================== */}

      <ExpertCTASection
        title={keyword.expert_title}
        content={keyword.expert_content}
      />

      {/* =====================================
          CONTENT SECTION
          ===================================== */}

      <ContentSection
        title={keyword.keyword_title}
        content={keyword.keyword_content}
      />

      {/* =====================================
          CTA SECTION
          ===================================== */}

      <CTASection
        title={keyword.cat_title}
        content={keyword.cat_content}
      />

      {/* =====================================
          FAQ SECTION
          ===================================== */}

      {keyword.faq?.length > 0 && (
        <FAQSection faqs={keyword.faq} />
      )}
    </>
  );
}

export default KeywordPage;