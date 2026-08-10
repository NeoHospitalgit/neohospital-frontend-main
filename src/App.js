import React from "react";
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
import KeywordsPage from "./Pages/KeywordsPage.jsx";
import Index from "./Pages/Home/Home.jsx";
import About from "./Pages/About/About.jsx";
import OurDepartment from "./Pages/OurDepartment/OurDepartment.jsx";
import MeetOurDoctors from "./Pages/MeetOurDoctor/MeetOurDoctor.jsx";
import InternationPatient from "./Pages/InternationPatient/OurInternationPatient.jsx";
import OurBlog from "./Pages/OurBlog/OurBlog.jsx";
import Service from "./Pages/Services/OurService.jsx";
import ServiceDetails from "./Pages/Services/servicedetails.jsx";
import BlogDetails from "./Pages/OurBlog/BlogDetails.jsx";
import Sitemap from "./Pages/sitemap";
import CorporatePolicies from "./Pages/Corporate/CorporatePolicies.jsx";
import BioMedicalReport from "./Pages/BioMedical/BioMedicalReport.jsx";
import ManageBioReports from "./Pages/AdminPannel/ManageBioReports.jsx";

import Login from "./Pages/manage/Login.jsx";
import Logout from "./Pages/manage/Logout.jsx";

import NotFound from "./Pages/NotFound.jsx";
import DoctorDetails from "./Pages/MeetOurDoctor/DoctorDetails.jsx";
import Contact from "./Pages/ContactUS/Contact.jsx";
import Gallery from "./Pages/GalleryPage/Gallery.jsx";
import Career from "./Pages/CareerPage/Career.jsx";
import Footer from "./Pages/Footer.jsx";
import ScrollToTop from "./Pages/ScrollToTop.jsx";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage/PrivacyPolicyPage.jsx";
import TermsPage from "./Pages/TermsPage/TermsPage.jsx";
import KeywordPage from "./Pages/KeywordPage/KeywordPage.jsx";
import ProcedurePage from "./Pages/Procedures/ProcedurePage.jsx";
import ProceduresMain from "./Pages/Procedures/ProceduresMain.jsx";

// Admin
import Admin from "./Pages/AdminPannel/Admin.jsx";
import AddHeader from "./Pages/AdminPannel/AddHeader.jsx";
import ManageHeader from "./Pages/AdminPannel/ManageHeader.jsx";
import AddTestimonials from "./Pages/AdminPannel/AddTestimonials.jsx";
import ManageTestimonials from "./Pages/AdminPannel/ManageTestimonials.jsx";
import AddSeoPages from "./Pages/AdminPannel/AddSeoPages.jsx";
import ManageSeoPages from "./Pages/AdminPannel/ManageSeoPages.jsx";
import Addblog from "./Pages/AdminPannel/Addblog.jsx";
import Manageblog from "./Pages/AdminPannel/Manageblog.jsx";
import AddSpecialitiy from "./Pages/AdminPannel/AddSpeciality.jsx";
import ManageSpecialitiy from "./Pages/AdminPannel/ManageSpeciality.jsx";
import AddDoctor from "./Pages/AdminPannel/AddDoctor.jsx";
import ManageDoctor from "./Pages/AdminPannel/ManageDoctor.jsx";
import ManageServices from "./Pages/AdminPannel/ManageService.jsx";
import AddService from "./Pages/AdminPannel/AddService.jsx";
import AddBioMedicalReport from "./Pages/AdminPannel/AddBioMedicalReport.jsx";
import AddSeviceCate from "./Pages/AdminPannel/AddSeviceCate.jsx";
import ManageServiceCategory from "./Pages/AdminPannel/ManageServiceCategory.jsx";
import AddHomeDoctors from "./Pages/AdminPannel/AddHomeDoctors.jsx";
import ManageHomeDoctors from "./Pages/AdminPannel/ManageHomeDoctors.jsx";
import DetailsDepartment from "./Pages/OurDepartment/DetailsDepartment.jsx";
import ManageAppointments from "./Pages/AdminPannel/ManageAppointments.jsx";
import ManageKeywords from "./Pages/AdminPannel/ManageKeywords.jsx";
import ListKeywordPage from "./Pages/AdminPannel/ListKeywordPage.jsx";

import ManageProcedures from "./Pages/AdminPannel/ManageProcedures.jsx";
import ListProcedures from "./Pages/AdminPannel/ListProcedures.jsx";
const App = () => {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {!isLoggedIn && <Header />}
        <ScrollToTop />

        <Routes>
          <Route path="*" element={<NotFound />} />

          {/* ✅ FIXED HOME ROUTE */}
          <Route
            path="/"
            element={!isLoggedIn ? <Index /> : <Navigate to="/admin" />}
          />

          <Route path="/about" element={<About />} />
          <Route path="/specialities" element={<OurDepartment />} />
          <Route path="/doctors" element={<MeetOurDoctors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<OurBlog />} />
          <Route path="/services" element={<Service />} />
          <Route path="/corporate-policies" element={<CorporatePolicies />} />
          <Route path="/bio-medical-report" element={<BioMedicalReport />} />
          <Route path="service/:service" element={<ServiceDetails />} />
          <Route path="service/:service/:servicedetail" element={<ServiceDetails />} />
          <Route path="/international-patient" element={<InternationPatient />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/career" element={<Career />} />
          <Route path="/blog/:blogs" element={<BlogDetails />} />
          <Route path="/:departid" element={<DetailsDepartment />} />
          <Route path="/treatment/:keywordspage" element={<KeywordsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/sitemap.xml" element={<Sitemap />} />
          <Route path="/doctor-details/:dr" element={<DoctorDetails />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/doctor/:slug" element={<KeywordPage />}/>
          <Route path="/procedures" element={<ProceduresMain />} />
          <Route path="/procedures/:slug" element={<ProcedurePage />} />

          {/* ✅ PROTECTED ADMIN ROUTES */}
          <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/add-header" element={isLoggedIn ? <AddHeader /> : <Navigate to="/login" />} />
          <Route path="/add-header/:id" element={isLoggedIn ? <AddHeader /> : <Navigate to="/login" />} />
          <Route path="/manage-header" element={isLoggedIn ? <ManageHeader /> : <Navigate to="/login" />} />
          <Route path="/add-testimonials" element={isLoggedIn ? <AddTestimonials /> : <Navigate to="/login" />} />
          <Route path="/add-testimonials/:id" element={isLoggedIn ? <AddTestimonials /> : <Navigate to="/login" />} />
          <Route path="/manage-testimonials" element={isLoggedIn ? <ManageTestimonials /> : <Navigate to="/login" />} />
          <Route path="/add-seopages" element={isLoggedIn ? <AddSeoPages /> : <Navigate to="/login" />} />
          <Route path="/add-seopages/:id" element={isLoggedIn ? <AddSeoPages /> : <Navigate to="/login" />} />
          <Route path="/manage-seopages" element={isLoggedIn ? <ManageSeoPages /> : <Navigate to="/login" />} />
          <Route path="/add-blog" element={isLoggedIn ? <Addblog /> : <Navigate to="/login" />} />
          <Route path="/add-blog/:id" element={isLoggedIn ? <Addblog /> : <Navigate to="/login" />} />
          <Route path="/manage-blog" element={isLoggedIn ? <Manageblog /> : <Navigate to="/login" />} />
          <Route path="/add-specialities" element={isLoggedIn ? <AddSpecialitiy /> : <Navigate to="/login" />} />
          <Route path="/add-specialities/:id" element={isLoggedIn ? <AddSpecialitiy /> : <Navigate to="/login" />} />
          <Route path="/manage-specialities" element={isLoggedIn ? <ManageSpecialitiy /> : <Navigate to="/login" />} />
          <Route path="/add-doctors" element={isLoggedIn ? <AddDoctor /> : <Navigate to="/login" />} />
          <Route path="/add-doctors/:id" element={isLoggedIn ? <AddDoctor /> : <Navigate to="/login" />} />
          <Route path="/manage-doctors" element={isLoggedIn ? <ManageDoctor /> : <Navigate to="/login" />} />
          <Route path="/add-home-doctors" element={isLoggedIn ? <AddHomeDoctors /> : <Navigate to="/login" />} />
          <Route path="/add-home-doctors/:id" element={isLoggedIn ? <AddHomeDoctors /> : <Navigate to="/login" />} />
          <Route path="/manage-home-doctors" element={isLoggedIn ? <ManageHomeDoctors /> : <Navigate to="/login" />} />
          <Route path="/manage-service" element={isLoggedIn ? <ManageServices /> : <Navigate to="/login" />} />
          <Route path="/add-service" element={isLoggedIn ? <AddService /> : <Navigate to="/login" />} />
          <Route path="/add-service/:id" element={isLoggedIn ? <AddService /> : <Navigate to="/login" />} />
          <Route path="/add-service-category" element={isLoggedIn ? <AddSeviceCate /> : <Navigate to="/login" />} />
          <Route path="/add-service-category/:id" element={isLoggedIn ? <AddSeviceCate /> : <Navigate to="/login" />} />
          <Route path="/manage-service-category" element={isLoggedIn ? <ManageServiceCategory /> : <Navigate to="/login" />} />
          <Route path="/add-bio-medical-report" element={isLoggedIn ? <AddBioMedicalReport /> : <Navigate to="/login" />} />
          <Route path="/add-bio-medical-report/:id" element={isLoggedIn ? <AddBioMedicalReport /> : <Navigate to="/login" />} />
          <Route path="/manage-medical-report" element={isLoggedIn ? <ManageBioReports /> : <Navigate to="/login" />} />
          <Route path="/appointments"  element={isLoggedIn ? <ManageAppointments /> : <Navigate to="/login" />} />
           <Route path="/add-keywords"  element={isLoggedIn ? <ManageKeywords /> : <Navigate to="/login" />} />
           <Route path="/list-keywords"  element={isLoggedIn ? <ListKeywordPage /> : <Navigate to="/login" />} />
           <Route path="/add-keyword/:id" element={isLoggedIn ? <ManageKeywords /> : <Navigate to="/login" />}/>
           
           <Route path="/add-procedures"  element={isLoggedIn ? <ManageProcedures /> : <Navigate to="/login" />} />
           <Route path="/list-procedures"  element={isLoggedIn ? <ListProcedures/> : <Navigate to="/login" />} />
           <Route path="/add-procedures/:id" element={isLoggedIn ? <ManageProcedures /> : <Navigate to="/login" />}/>
           
        </Routes>

        {!isLoggedIn && <Footer />}
      </div>
    </Router>
  );
};

export default App;
