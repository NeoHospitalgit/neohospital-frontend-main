import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css";

const routeLabels = {
  about: "About Us",
  blog: "Blog",
  career: "Careers",
  contact: "Contact",
  doctors: "Doctors",
  faq: "FAQs",
  gallery: "Gallery",
  "international-patient": "International Patients",
  procedures: "Procedures",
  "privacy-policy": "Privacy Policy",
  services: "Patient Services",
  specialities: "Specialities",
  "terms-and-conditions": "Terms and Conditions",
  treatment: "Treatments",
};

const hiddenRoutePrefixes = [
  "admin",
  "add-",
  "manage-",
  "list-",
  "appointments",
  "login",
  "logout",
];

const formatLabel = (segment) => {
  const normalized = segment.toLowerCase();
  return (
    routeLabels[normalized] ||
    decodeURIComponent(segment)
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
};

const getBreadcrumbs = (pathname) => {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [{ name: "Home", path: "/" }];

  if (!segments.length) return breadcrumbs;

  const route = segments[0].toLowerCase();
  let firstPageSegment = 0;

  if (route === "service") {
    breadcrumbs.push({ name: "Patient Services", path: "/services" });
    firstPageSegment = 1;
  } else if (route === "blog") {
    breadcrumbs.push({ name: "Blog", path: "/blog" });
    firstPageSegment = 1;
  } else if (route === "doctor-details" || route === "doctor") {
    breadcrumbs.push({ name: "Doctors", path: "/doctors" });
    firstPageSegment = 1;
  } else if (route === "treatment") {
    breadcrumbs.push({ name: "Specialities", path: "/specialities" });
    firstPageSegment = 1;
  } else if (route === "procedures" && segments.length > 1) {
    breadcrumbs.push({ name: "Procedures", path: "/procedures" });
    firstPageSegment = 1;
  } else if (segments.length === 1 && !routeLabels[route]) {
    breadcrumbs.push({ name: "Specialities", path: "/specialities" });
    firstPageSegment = 0;
  }

  for (let index = firstPageSegment; index < segments.length; index += 1) {
    breadcrumbs.push({
      name: formatLabel(segments[index]),
      path: `/${segments.slice(0, index + 1).join("/")}`,
    });
  }

  return breadcrumbs;
};

function Breadcrumbs() {
  const { pathname } = useLocation();
  const firstSegment = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  const isProcedureDetail = /^\/procedures\/[^/]+\/?$/i.test(pathname);
  const breadcrumbs = getBreadcrumbs(pathname);

  useEffect(() => {
    if (
      pathname === "/" ||
      (firstSegment &&
        hiddenRoutePrefixes.some((prefix) => firstSegment.startsWith(prefix)))
    ) {
      return undefined;
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: getBreadcrumbs(pathname).map((breadcrumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: breadcrumb.name,
        item: new URL(breadcrumb.path, window.location.origin).href,
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.breadcrumbSchema = "true";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => script.remove();
  }, [pathname, firstSegment]);

  if (
    pathname === "/" ||
    isProcedureDetail ||
    (firstSegment &&
      hiddenRoutePrefixes.some((prefix) => firstSegment.startsWith(prefix)))
  ) {
    return null;
  }

  return (
    <>
      <nav className="page-breadcrumb" aria-label="Breadcrumb">
        <ol>
          {breadcrumbs.map((breadcrumb, index) => {
            const isCurrent = index === breadcrumbs.length - 1;

            return (
              <li key={breadcrumb.path}>
                {isCurrent ? (
                  <span aria-current="page">{breadcrumb.name}</span>
                ) : (
                  <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;