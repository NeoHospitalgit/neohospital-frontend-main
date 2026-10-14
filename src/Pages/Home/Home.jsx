import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import Hero from "./Hero";
import Info from "./Info";
import BookAppointment from "./BookAppointment";
import { Helmet } from "react-helmet";
import { useAuth } from "../../store/auth";

const Doctors = lazy(() => import("./Doctors"));
const Testimonialfile = lazy(() => import("./Testimonialfile"));
const Blogs = lazy(() => import("./Blogs"));

function DeferredSection({ component: Component, name }) {
  const sectionRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: "150px 0px" });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="home-deferred-section"
      data-deferred-section={name}
    >
      {isNearViewport && (
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      )}
    </div>
  );
}

function Home() {
  const [seoTags, setSeoTags] = useState(null);
  const { API } = useAuth();

  useEffect(() => {
    if (!API) return;
    let cancelled = false;

    const fetchSeo = async () => {
      try {
        const response = await fetch(
          `${API}/api/header/view-header`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch header data");
        }

        const data = await response.json();

        const homeSeo = data?.header?.find(
          (item) =>
            String(item?.page || "").trim().toLowerCase() === "home"
        );

        if (homeSeo?.tagdata) {
          const { default: parse } = await import("html-react-parser");
          const correctedHomeSeo = homeSeo.tagdata.replace(
            /(<script\b(?=[^>]*\btype\s*=\s*["']application\/ld\+json["'])[^>]*>)([\s\S]*?)(<\/script>)/gi,
            (script, openingTag, schema, closingTag) => {
              if (!/"@type"\s*:\s*"Hospital"/i.test(schema)) {
                return script;
              }

              return `${openingTag}${schema.replace(
                /("telephone"\s*:\s*)"[^"]*"/i,
                '$1"+91-120-4880088"'
              )}${closingTag}`;
            }
          );
          if (!cancelled) setSeoTags(parse(correctedHomeSeo));
        } else if (!cancelled) {
          setSeoTags(null);
        }
      } catch (err) {
        console.error("Home SEO Error:", err);
      }
    };

    fetchSeo();

    return () => {
      cancelled = true;
    };
  }, [API]);

  return (
    <div className="home-section">

      {/* Dynamic Home SEO */}
      {seoTags && <Helmet>{seoTags}</Helmet>}

      <Hero />

      <Info />

      <BookAppointment />

      <DeferredSection component={Doctors} name="doctors" />

      <DeferredSection component={Testimonialfile} name="testimonialfile" />

      <DeferredSection component={Blogs} name="blogs" />

    </div>
  );
}

export default Home;