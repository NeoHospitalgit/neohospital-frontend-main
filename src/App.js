import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./store/auth";
import "./App.css";

// Importing components
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

// manage page routes
import Login from "./Pages/manage/Login.jsx";
import Logout from "./Pages/manage/Logout.jsx";

// Importing other components
import NotFound from "./Pages/NotFound.jsx";
import DoctorDetails from "./Pages/MeetOurDoctor/DoctorDetails.jsx";
import Contact from "./Pages/ContactUS/Contact.jsx";
import Gallery from "./Pages/GalleryPage/Gallery.jsx";
import Career from "./Pages/CareerPage/Career.jsx";
import Footer from "./Pages/Footer.jsx";
import ScrollToTop from "./Pages/ScrollToTop.jsx";

// admin all routes
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
import AddSeviceCate from "./Pages/AdminPannel/AddSeviceCate.jsx";
import ManageServiceCategory from "./Pages/AdminPannel/ManageServiceCategory.jsx";

import AddHomeDoctors from "./Pages/AdminPannel/AddHomeDoctors.jsx";
import ManageHomeDoctors from "./Pages/AdminPannel/ManageHomeDoctors.jsx";

import DetailsDepartment from "./Pages/OurDepartment/DetailsDepartment.jsx";

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
          <Route
            path="/"
            // element={<Index />}
            element={isLoggedIn ? <Navigate to="/login" /> : <Index />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/specialities" element={<OurDepartment />} />
          <Route path="/doctors" element={<MeetOurDoctors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<OurBlog />} />
          <Route path="/services" element={<Service />} />
          <Route path="service/:service" element={<ServiceDetails />} />
          <Route
            path="service/:service/:servicedetail"
            element={<ServiceDetails />}
          />
          <Route
            path="/international-patient"
            element={<InternationPatient />}
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/career" element={<Career />} />
          <Route path="/blog/:blogs" element={<BlogDetails />} />
          <Route path="/:departid" element={<DetailsDepartment />} />
          <Route path="/treatment/:keywordspage" element={<KeywordsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/sitemap.xml" element={<Sitemap />} />
          <Route path="/doctor-details/:dr" element={<DoctorDetails />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-header" element={<AddHeader />} />
          <Route path="/add-header/:id" element={<AddHeader />} />
          <Route path="/manage-header" element={<ManageHeader />} />
          <Route path="/add-testimonials" element={<AddTestimonials />} />
          <Route path="/add-testimonials/:id" element={<AddTestimonials />} />
          <Route path="/manage-testimonials" element={<ManageTestimonials />} />
          <Route path="/add-seopages" element={<AddSeoPages />} />
          <Route path="/add-seopages/:id" element={<AddSeoPages />} />
          <Route path="/manage-seopages" element={<ManageSeoPages />} />
          <Route path="/add-blog" element={<Addblog />} />
          <Route path="/add-blog/:id" element={<Addblog />} />
          <Route path="/manage-blog" element={<Manageblog />} />
          <Route path="/add-specialities" element={<AddSpecialitiy />} />
          <Route path="/add-specialities/:id" element={<AddSpecialitiy />} />
          <Route path="/manage-specialities" element={<ManageSpecialitiy />} />
          <Route path="/add-doctors" element={<AddDoctor />} />
          <Route path="/add-doctors/:id" element={<AddDoctor />} />
          <Route path="/manage-doctors" element={<ManageDoctor />} />
          <Route path="/add-home-doctors" element={<AddHomeDoctors />} />
          <Route path="/add-home-doctors/:id" element={<AddHomeDoctors />} />
          <Route path="/manage-home-doctors" element={<ManageHomeDoctors />} />
          <Route path="/manage-service" element={<ManageServices />} />
          <Route path="/add-service" element={<AddService />} />
          <Route path="/add-service/:id" element={<AddService />} />
          <Route path="/add-service-category" element={<AddSeviceCate />} />
          <Route path="/add-service-category/:id" element={<AddSeviceCate />} />
          <Route
            path="/manage-service-category"
            element={<ManageServiceCategory />}
          />
        </Routes>
        {!isLoggedIn && <Footer />}
      </div>
    </Router>
  );
};

{
  /* {userRole === "seo" || userRole === "dev" ? ( */
}
{
  /* <ManageServiceCategory /> */
}
{
  /* ) : ( */
}
{
  /*     <Navigate to="/admin" /> */
}
{
  /*    )} */
}

export default App;
