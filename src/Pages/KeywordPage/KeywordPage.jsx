import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useAuth } from "../../store/auth";
import KeywordBanner from "./KeywordBanner";
import WelcomeSection from "./WelcomeSection";
import DoctorsSection from "./DoctorsSection";
import ExpertCTASection from "./ExpertCTASection";
import ContentSection from "./ContentSection";
import WhyChooseSection from "./WhyChooseSection";
import CTASection from "./CTASection";
import FAQSection from "./FAQSection";
import "./Keyword.css";

function KeywordPage() {
  const { slug } = useParams();
  const { API } = useAuth();

  const [keyword, setKeyword] = useState(null);
  const [loading, setLoading] = useState(true);

  const getKeyword = async () => {
  try {
    console.log("Slug:", slug);

    const response = await fetch(
      `${API}/api/adminv11/keyword/${slug}`
    );

    const data = await response.json();

    console.log("API Response:", data);

    if (response.ok && data.success) {
      setKeyword(data.data);
    } else {
      setKeyword(null);
    }

    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};

  useEffect(() => {
    getKeyword();
  }, [slug]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        Loading...
      </div>
    );
  }

  if (!keyword) {
    return (
      <div className="container text-center py-5">
        <h2>Page Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{keyword.seo_title}</title>

        <meta
          name="description"
          content={keyword.meta_description}
        />

        <meta
          name="keywords"
          content={keyword.focus_keyword}
        />
      </Helmet>

     <KeywordBanner
        title={keyword.keyword_title}
        direction={keyword.keyword_description}
        image={
          keyword.banner_image
            ? `${API}/uploads/blogs/${keyword.banner_image}`
            : ""
        }
      />
    <WelcomeSection
      title={keyword.welcome_title}
      description={keyword.welcome_content}
      canHelpTitle={keyword.can_help}
      canHelpContent={keyword.can_help_content}
    />
    {keyword.doctors?.length > 0 && (
      <DoctorsSection
        doctors={keyword.doctors}
        API={API}
        teamTitle={keyword.team_title}
        teamContent={keyword.team_content}
      />
    )}
     <ExpertCTASection
    title={keyword.expert_title}
    content={keyword.expert_content}
/>

<ContentSection
  title={keyword.keyword_title}
  content={keyword.keyword_content}
/>


<CTASection
  title={keyword.cat_title}
  content={keyword.cat_content}
/>
     {keyword.faq?.length > 0 && (

    <FAQSection

        faqs={keyword.faq}

    />

)}
    </>
  );
}

export default KeywordPage;
