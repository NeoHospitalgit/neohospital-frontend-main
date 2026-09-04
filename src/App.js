import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./store/auth";
import "./App.css";

// Components
import Header from "./Pages/Header.jsx";
import Footer from "./Pages/Footer.jsx";
import ScrollToTop from "./Pages/ScrollToTop.jsx";

// Public Pages
const KeywordsPage = lazy(() => import("./Pages/KeywordsPage.jsx"));
const Index = lazy(() => import("./Pages/Home/Home.jsx"));
const About = lazy(() => import("./Pages/About/About.jsx"));
const OurDepartment = lazy(
  () => import("./Pages/OurDepartment/OurDepartment.jsx")
);
const MeetOurDoctors = lazy(
  () => import("./Pages/MeetOurDoctor/MeetOurDoctor.jsx")
);
const InternationPatient = lazy(
  () =>
    import(
      "./Pages/InternationPatient/OurInternationPatient.jsx"
    )
);
const OurBlog = lazy(() => import("./Pages/OurBlog/OurBlog.jsx"));
const Service = lazy(() => import("./Pages/Services/OurService.jsx"));
const ServiceDetails = lazy(
  () => import("./Pages/Services/servicedetails.jsx")
);
const BlogDetails = lazy(
  () => import("./Pages/OurBlog/BlogDetails.jsx")
);
const CorporatePolicies = lazy(
  () => import("./Pages/Corporate/CorporatePolicies.jsx")
);
const BioMedicalReport = lazy(
  () => import("./Pages/BioMedical/BioMedicalReport.jsx")
);

const Login = lazy(() => import("./Pages/manage/Login.jsx"));
const Logout = lazy(() => import("./Pages/manage/Logout.jsx"));

const NotFound = lazy(() => import("./Pages/NotFound.jsx"));
const DoctorDetails = lazy(
  () => import("./Pages/MeetOurDoctor/DoctorDetails.jsx")
);
const Contact = lazy(() => import("./Pages/ContactUS/Contact.jsx"));
const Gallery = lazy(() => import("./Pages/GalleryPage/Gallery.jsx"));
const Career = lazy(() => import("./Pages/CareerPage/Career.jsx"));

const PrivacyPolicyPage = lazy(
  () =>
    import(
      "./Pages/PrivacyPolicyPage/PrivacyPolicyPage.jsx"
    )
);
const TermsPage = lazy(
  () => import("./Pages/TermsPage/TermsPage.jsx")
);
const KeywordPage = lazy(
  () => import("./Pages/KeywordPage/KeywordPage.jsx")
);
const ProcedurePage = lazy(
  () => import("./Pages/Procedures/ProcedurePage.jsx")
);
const ProceduresMain = lazy(
  () => import("./Pages/Procedures/ProceduresMain.jsx")
);

// Admin Pages
const Admin = lazy(() => import("./Pages/AdminPannel/Admin.jsx"));
const AddHeader = lazy(
  () => import("./Pages/AdminPannel/AddHeader.jsx")
);
const ManageHeader = lazy(
  () => import("./Pages/AdminPannel/ManageHeader.jsx")
);
const AddTestimonials = lazy(
  () => import("./Pages/AdminPannel/AddTestimonials.jsx")
);
const ManageTestimonials = lazy(
  () => import("./Pages/AdminPannel/ManageTestimonials.jsx")
);
const AddSeoPages = lazy(
  () => import("./Pages/AdminPannel/AddSeoPages.jsx")
);
const ManageSeoPages = lazy(
  () => import("./Pages/AdminPannel/ManageSeoPages.jsx")
);
const Addblog = lazy(
  () => import("./Pages/AdminPannel/Addblog.jsx")
);
const Manageblog = lazy(
  () => import("./Pages/AdminPannel/Manageblog.jsx")
);
const AddSpecialitiy = lazy(
  () => import("./Pages/AdminPannel/AddSpeciality.jsx")
);
const ManageSpecialitiy = lazy(
  () => import("./Pages/AdminPannel/ManageSpeciality.jsx")
);
const AddDoctor = lazy(
  () => import("./Pages/AdminPannel/AddDoctor.jsx")
);
const ManageDoctor = lazy(
  () => import("./Pages/AdminPannel/ManageDoctor.jsx")
);
const ManageServices = lazy(
  () => import("./Pages/AdminPannel/ManageService.jsx")
);
const AddService = lazy(
  () => import("./Pages/AdminPannel/AddService.jsx")
);
const AddBioMedicalReport = lazy(
  () =>
    import(
      "./Pages/AdminPannel/AddBioMedicalReport.jsx"
    )
);
const AddSeviceCate = lazy(
  () => import("./Pages/AdminPannel/AddSeviceCate.jsx")
);
const ManageServiceCategory = lazy(
  () =>
    import(
      "./Pages/AdminPannel/ManageServiceCategory.jsx"
    )
);
const AddHomeDoctors = lazy(
  () => import("./Pages/AdminPannel/AddHomeDoctors.jsx")
);
const ManageHomeDoctors = lazy(
  () => import("./Pages/AdminPannel/ManageHomeDoctors.jsx")
);
const DetailsDepartment = lazy(
  () =>
    import(
      "./Pages/OurDepartment/DetailsDepartment.jsx"
    )
);
const ManageAppointments = lazy(
  () => import("./Pages/AdminPannel/ManageAppointments.jsx")
);
const ManageKeywords = lazy(
  () => import("./Pages/AdminPannel/ManageKeywords.jsx")
);
const ListKeywordPage = lazy(
  () => import("./Pages/AdminPannel/ListKeywordPage.jsx")
);
const ManageProcedures = lazy(
  () => import("./Pages/AdminPannel/ManageProcedures.jsx")
);
const ListProcedures = lazy(
  () => import("./Pages/AdminPannel/ListProcedures.jsx")
);
const ManageBioReports = lazy(
  () =>
    import(
      "./Pages/AdminPannel/ManageBioReports.jsx"
    )
);

const App = () => {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {!isLoggedIn && <Header />}

        <ScrollToTop />

        <Suspense fallback={null}>
          <Routes>
            {/* Fallback */}
            <Route
              path="*"
              element={<NotFound />}
            />

            {/* Public Routes */}
            <Route
              path="/"
              element={
                !isLoggedIn ? (
                  <Index />
                ) : (
                  <Navigate to="/admin" />
                )
              }
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/specialities"
              element={<OurDepartment />}
            />

            <Route
              path="/doctors"
              element={<MeetOurDoctors />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/blog"
              element={<OurBlog />}
            />

            <Route
              path="/services"
              element={<Service />}
            />

            <Route
              path="/corporate-policies"
              element={<CorporatePolicies />}
            />

            <Route
              path="/bio-medical-report"
              element={<BioMedicalReport />}
            />

            <Route
              path="service/:service"
              element={<ServiceDetails />}
            />

            <Route
              path="service/:service/:servicedetail"
              element={<ServiceDetails />}
            />

            <Route
              path="/international-patient"
              element={<InternationPatient />}
            />

            <Route
              path="/gallery"
              element={<Gallery />}
            />

            <Route
              path="/career"
              element={<Career />}
            />

            <Route
              path="/blog/:blogs"
              element={<BlogDetails />}
            />

            <Route
              path="/:departid"
              element={<DetailsDepartment />}
            />

            <Route
              path="/treatment/:keywordspage"
              element={<KeywordsPage />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/logout"
              element={<Logout />}
            />

            <Route
              path="/doctor-details/:dr"
              element={<DoctorDetails />}
            />

            <Route
              path="/privacy-policy"
              element={<PrivacyPolicyPage />}
            />

            <Route
              path="/terms-and-conditions"
              element={<TermsPage />}
            />

            <Route
              path="/doctor/:slug"
              element={<KeywordPage />}
            />

            <Route
              path="/procedures"
              element={<ProceduresMain />}
            />

            <Route
              path="/procedures/:slug"
              element={<ProcedurePage />}
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                isLoggedIn ? (
                  <Admin />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-header"
              element={
                isLoggedIn ? (
                  <AddHeader />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-header/:id"
              element={
                isLoggedIn ? (
                  <AddHeader />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/manage-header"
              element={
                isLoggedIn ? (
                  <ManageHeader />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-testimonials"
              element={
                isLoggedIn ? (
                  <AddTestimonials />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-testimonials/:id"
              element={
                isLoggedIn ? (
                  <AddTestimonials />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/manage-testimonials"
              element={
                isLoggedIn ? (
                  <ManageTestimonials />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-seopages"
              element={
                isLoggedIn ? (
                  <AddSeoPages />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-seopages/:id"
              element={
                isLoggedIn ? (
                  <AddSeoPages />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/manage-seopages"
              element={
                isLoggedIn ? (
                  <ManageSeoPages />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-blog"
              element={
                isLoggedIn ? (
                  <Addblog />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-blog/:id"
              element={
                isLoggedIn ? (
                  <Addblog />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/manage-blog"
              element={
                isLoggedIn ? (
                  <Manageblog />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-specialities"
              element={
                isLoggedIn ? (
                  <AddSpecialitiy />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

          <Route
          path="/add-specialities/:id"
          element={
            isLoggedIn ? (
              <AddSpecialitiy />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

            <Route
              path="/manage-specialities"
              element={
                isLoggedIn ? (
                  <ManageSpecialitiy />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-doctors"
              element={
                isLoggedIn ? (
                  <AddDoctor />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-doctors/:id"
              element={
                isLoggedIn ? (
                  <AddDoctor />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/manage-doctors"
              element={
                isLoggedIn ? (
                  <ManageDoctor />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-home-doctors"
              element={
                isLoggedIn ? (
                  <AddHomeDoctors />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-home-doctors/:id"
              element={
                isLoggedIn ? (
                  <AddHomeDoctors />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/manage-home-doctors"
              element={
                isLoggedIn ? (
                  <ManageHomeDoctors />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/manage-service"
              element={
                isLoggedIn ? (
                  <ManageServices />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-service"
              element={
                isLoggedIn ? (
                  <AddService />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-service/:id"
              element={
                isLoggedIn ? (
                  <AddService />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-service-category"
              element={
                isLoggedIn ? (
                  <AddSeviceCate />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-service-category/:id"
              element={
                isLoggedIn ? (
                  <AddSeviceCate />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/manage-service-category"
              element={
                isLoggedIn ? (
                  <ManageServiceCategory />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-bio-medical-report"
              element={
                isLoggedIn ? (
                  <AddBioMedicalReport />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-bio-medical-report/:id"
              element={
                isLoggedIn ? (
                  <AddBioMedicalReport />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/manage-medical-report"
              element={
                isLoggedIn ? (
                  <ManageBioReports />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/appointments"
              element={
                isLoggedIn ? (
                  <ManageAppointments />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-keywords"
              element={
                isLoggedIn ? (
                  <ManageKeywords />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/list-keywords"
              element={
                isLoggedIn ? (
                  <ListKeywordPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-keyword/:id"
              element={
                isLoggedIn ? (
                  <ManageKeywords />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-procedures"
              element={
                isLoggedIn ? (
                  <ManageProcedures />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/list-procedures"
              element={
                isLoggedIn ? (
                  <ListProcedures />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/add-procedures/:id"
              element={
                isLoggedIn ? (
                  <ManageProcedures />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Suspense>

        {!isLoggedIn && <Footer />}
      </div>
    </Router>
  );
};

export default App;

