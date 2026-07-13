import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useAuth } from "../../store/auth";
import KeywordBanner from "./KeywordBanner";
import WelcomeSection from "./WelcomeSection";
import DoctorsSection from "./DoctorsSection";
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
        image={`${API}/uploads/blogs/${keyword.banner_image}`}
      />
      <WelcomeSection
        title={keyword.keyword_title}
        description={keyword.keyword_description}
      />
     {keyword.doctors?.length > 0 && (

    <DoctorsSection

        doctors={keyword.doctors}

        API={API}

    />

)}
     

<ContentSection
  title={keyword.keyword_title}
  content={keyword.keyword_content}
/>

<WhyChooseSection />
<CTASection />

     {keyword.faq?.length > 0 && (

    <FAQSection

        faqs={keyword.faq}

    />

)}
    </>
  );
}

export default KeywordPage;