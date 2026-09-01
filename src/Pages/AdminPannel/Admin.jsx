import React, { useEffect, useState } from "react";
import List from "./List";
import "./List.css";
import TopBarAdmin from "./TopBarAdmin";
import { useAuth } from "../../store/auth";

function Admin() {
  const { API } = useAuth();

  const [counts, setCounts] = useState({
    blogActive: 0,
    blogDeactive: 0,
    specialityActive: 0,
    specialityDeactive: 0,
    doctorActive: 0,
    doctorDeactive: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!API) return;

    const fetchDashboardCounts = async () => {
      try {
        setLoading(true);

        const [blogRes, specialityRes, doctorRes] =
          await Promise.all([
            fetch(`${API}/api/blogs/view-blogs`),
            fetch(`${API}/api/categories/view-category`),
            fetch(`${API}/api/doctors/view-doctors`),
          ]);

        const blogData = await blogRes.json();
        const specialityData = await specialityRes.json();
        const doctorData = await doctorRes.json();

        // Blogs
        const blogs = Array.isArray(blogData?.Blog)
          ? blogData.Blog
          : Array.isArray(blogData?.blogs)
          ? blogData.blogs
          : Array.isArray(blogData?.data)
          ? blogData.data
          : Array.isArray(blogData)
          ? blogData
          : [];

        // Specialities
        const specialities = Array.isArray(
          specialityData?.category
        )
          ? specialityData.category
          : Array.isArray(specialityData?.categories)
          ? specialityData.categories
          : Array.isArray(specialityData?.data)
          ? specialityData.data
          : Array.isArray(specialityData)
          ? specialityData
          : [];

        // Doctors
        const doctors = Array.isArray(doctorData?.doctors)
          ? doctorData.doctors
          : Array.isArray(doctorData?.Doctor)
          ? doctorData.Doctor
          : Array.isArray(doctorData?.data)
          ? doctorData.data
          : Array.isArray(doctorData)
          ? doctorData
          : [];

        setCounts({
          blogActive: blogs.filter(
            (item) => item?.blog_status === true
          ).length,

          blogDeactive: blogs.filter(
            (item) => item?.blog_status !== true
          ).length,

          specialityActive: specialities.filter(
            (item) =>
              item?.status === true ||
              item?.category_status === true ||
              item?.active === true
          ).length,

          specialityDeactive: specialities.filter(
            (item) =>
              item?.status !== true &&
              item?.category_status !== true &&
              item?.active !== true
          ).length,

          doctorActive: doctors.filter(
            (item) =>
              item?.status === true ||
              item?.doctor_status === true ||
              item?.active === true
          ).length,

          doctorDeactive: doctors.filter(
            (item) =>
              item?.status !== true &&
              item?.doctor_status !== true &&
              item?.active !== true
          ).length,
        });
      } catch (error) {
        console.error("Dashboard count error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardCounts();
  }, [API]);

  return (
    <>
      <TopBarAdmin />

      <section>
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-3 adminleft">
              <div>
                <List />
              </div>
            </div>

            <div className="col-md-9">
              <div className="row">

                {/* BLOG */}
                <div className="col-md-4">
                  <div className="BlogDetails border border-primary m-4 text-center">
                    <h4>
                      Blog Active :{" "}
                      <span>
                        {loading ? "..." : counts.blogActive}
                      </span>
                    </h4>

                    <h4 className="text-danger">
                      Blog Deactive :{" "}
                      <span>
                        {loading ? "..." : counts.blogDeactive}
                      </span>
                    </h4>
                  </div>
                </div>

                {/* SPECIALITIES */}
                <div className="col-md-4">
                  <div className="BlogDetails border border-primary m-4 text-center">
                    <h4>
                      Specialities Active :{" "}
                      <span>
                        {loading
                          ? "..."
                          : counts.specialityActive}
                      </span>
                    </h4>

                    <h4 className="text-danger">
                      Specialities Deactive :{" "}
                      <span>
                        {loading
                          ? "..."
                          : counts.specialityDeactive}
                      </span>
                    </h4>
                  </div>
                </div>

                {/* DOCTORS */}
                <div className="col-md-4">
                  <div className="BlogDetails border border-primary m-4 text-center">
                    <h4>
                      Doctors Active :{" "}
                      <span>
                        {loading ? "..." : counts.doctorDeactive}
                      </span>
                    </h4>

                    <h4 className="text-danger">
                      Doctors Deactive :{" "}
                      <span>
                        {loading
                          ? "..."
                          : counts.doctorActive}
                      </span>
                    </h4>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="SpecialtyDetails"></div>
                </div>

                <div className="col-md-4">
                  <div className="ServiceDetails"></div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Admin;
