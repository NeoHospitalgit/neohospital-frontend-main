import React, { useState } from "react";
import "./ProcedureSidebar.css";

function ProcedureSidebar() {

  const [search, setSearch] = useState("");

  const doctors = [
    {
      id: 1,
      image: "https://api.neohospital.com/uploads/doctors/drImage-1765014994822-867739272-drImage-1745319947556-710981232-dr.%20bharat%20nair.png",
      name: "Dr. BHARAT NAIR",
      designation: "GASTROSCIENCES",
      experience: "11+ years experience",
    },
    {
      id: 2,
      image: "https://api.neohospital.com/uploads/doctors/drImage-1780641403884-698459381.jpeg",
      name: "DR SANJAY KR. SHARMA",
      designation: "CARDIOLOGY",
      experience: "20+ years experience",
    },
    {
      id: 3,
      image: "https://api.neohospital.com/uploads/doctors/drImage-1780647492490-218653950.jpeg",
      name: "DR NEHA TYAGI",
      designation: "NEONATOLOGY & PEADIATRICS",
      experience: "7+ Years Experience",
    },
    {
      id: 4,
      image: "https://api.neohospital.com/uploads/doctors/drImage-1780643493850-528080449.png",
      name: "DR NIHARIKA SINGH",
      designation: "DENTAL",
      experience: "12+ Years Experience",
    },
    
  ];

  const blogs = [
    {
      id: 1,
      image: "https://api.neohospital.com/uploads/blogs/blog_image-1781173294550-704010669.jpg",
      title: "Everything About Knee Replacement Surgery",
      date: "12 Jan 2026",
    },
    {
      id: 2,
      image: "https://api.neohospital.com/uploads/blogs/blog_image-1781173294550-704010669.jpg",
      title: "Signs You Need Knee Replacement",
      date: "18 Jan 2026",
    },
    {
      id: 3,
      image: "https://api.neohospital.com/uploads/blogs/blog_image-1781173294550-704010669.jpg",
      title: "Recovery After Knee Surgery",
      date: "26 Jan 2026",
    },
  ];

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sticky-sidebar">

      {/* =========================
          CALLBACK FORM
      ========================== */}

      <div className="sidebar-card callback-card">

        <div className="sidebar-titless">

          <span>Need Help?</span>

          <h3>Get a Call Back from Our Health Advisor</h3>

          <p>
            Fill in your details and our healthcare expert will
            contact you shortly.
          </p>

        </div>

        <form className="callback-form">

          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              placeholder="Mobile Number"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
            />
          </div>

          <button
            type="submit"
            className="sidebar-btn"
          >
            Request Callback
          </button>

          <p className="privacy">
            We respect your privacy. Your information is safe with us.
          </p>

        </form>

      </div>

      {/* =========================
          EXPERT TEAM
      ========================== */}

      <div className="sidebar-card expert-card">

        <div className="sidebar-titless">

          <span>Doctors</span>

          <h3>Our Expert Team</h3>

        </div>

        <input
          type="text"
          className="doctor-search"
          placeholder="Search Doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="doctor-list">
                    {filteredDoctors.length > 0 ? (

            filteredDoctors.map((doctor) => (

              <div
                className="doctor-item"
                key={doctor.id}
              >

                <div className="doctor-imagess">

                  <img
                    src={doctor.image}
                    alt={doctor.name}
                  />

                </div>

                <div className="doctor-content">

                  <h4>{doctor.name}</h4>

                  <p>{doctor.designation}</p>

                  <span>{doctor.experience}</span>

                 

                </div>

              </div>

            ))

          ) : (

            <div className="no-doctor">

              <p>No doctor found.</p>

            </div>

          )}

        </div>

      </div>

      {/* =========================
              BLOGS
      ========================== */}

      <div className="sidebar-card blog-card">

        <div className="sidebar-titless">

          <span>Latest Updates</span>

          <h3>Health Blogs</h3>

        </div>

        <div className="blog-list">

          {blogs.map((blog) => (

            <div
              className="blog-item"
              key={blog.id}
            >

              <div className="blog-image">

                <img
                  src={blog.image}
                  alt={blog.title}
                />

              </div>

              <div className="blog-content">

                <h4>
                  {blog.title}
                </h4>

                <span>
                  {blog.date}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* =========================
          SECOND OPINION
      ========================== */}

      <div className="sidebar-card opinion-card">

        <div className="sidebar-titless">

          <span>Expert Advice</span>

          <h3>Get a Second Opinion</h3>

          <p>
            Share your medical details and receive an expert opinion
            from our experienced specialists.
          </p>

        </div>

        <form className="callback-form">

          <div className="form-group">

            <input
              type="text"
              placeholder="Your Name"
            />

          </div>

          <div className="form-group">

            <input
              type="tel"
              placeholder="Mobile Number"
            />

          </div>

          <div className="form-group">

            <input
              type="text"
              placeholder="Preferred Time to Call"
            />

          </div>

          <button
            type="submit"
            className="sidebar-btn"
          >
            Request Second Opinion
          </button>

          <p className="privacy">
            Your details remain confidential and secure.
          </p>

        </form>

      </div>
            {/* =========================
          CONTACT INFO (Optional)
      ========================== */}

      <div className="sidebar-card contact-cards">

        <div className="sidebar-titless">

          <span>Need Immediate Help?</span>

          <h3>Talk to Our Healthcare Expert</h3>

        </div>

        <ul className="contact-list">

          <li>
            📞 <a href="tel:+919999999999">+91 99999 99999</a>
          </li>

          <li>
            ✉️ <a href="mailto:info@hospital.com">
              info@hospital.com
            </a>
          </li>

          <li>
            📍 Neo Hospital, Noida
          </li>

        </ul>

      </div>

    </div>

  );

}

export default ProcedureSidebar;