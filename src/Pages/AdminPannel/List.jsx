import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../../Assets/index/logo.png";
import "./List.css";
import { useAuth } from "../../store/auth";

function List() {
  const [openMenu, setOpenMenu] = useState(null);
  const { isLoggedIn, userRole } = useAuth();

  const toggleSubMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="AdminList">
      <div>
        <div className="text-center">
          <img src={logo} alt="Logo" />
        </div>
        <ul>
          <li className={openMenu === null ? "active" : ""}>
            <Link to="/admin">Dashboard</Link>
          </li>

          <li
            onClick={() => toggleSubMenu("blog")}
            className={openMenu === "blog" ? "active" : ""}
          >
            <Link to="/add-blog">Blog</Link>
            <i className="fa fa-caret-down"></i>
          </li>
          {openMenu === "blog" && (
            <ol>
              <li>
                <Link to="/add-blog">Add Blog</Link>
              </li>
              <li>
                <Link to="/manage-blog">Manage Blog</Link>
              </li>
            </ol>
          )}

          <li
            onClick={() => toggleSubMenu("seopages")}
            className={openMenu === "seopages" ? "active" : ""}
          >
            <Link to="/add-seopages">Seo Pages</Link>
            <i className="fa fa-caret-down"></i>
          </li>
          {openMenu === "seopages" && (
            <ol>
              <li>
                <Link to="/add-seopages">Add Seo Pages</Link>
              </li>
              <li>
                <Link to="/manage-seopages">Manage Seo Pages</Link>
              </li>
            </ol>
          )}

          <li
            onClick={() => toggleSubMenu("header")}
            className={openMenu === "header" ? "active" : ""}
          >
            <Link to="/manage-header">Header</Link>
            <i className="fa fa-caret-down"></i>
          </li>
          {openMenu === "header" && (
            <ol>
              <li>
                <Link to="/manage-header">Manage Header</Link>
              </li>
              <li>
                <Link to="/add-testimonials">Add Testimonials</Link>
              </li>
              <li>
                <Link to="/manage-testimonials">Manage Testimonials</Link>
              </li>
            </ol>
          )}

          <li
            onClick={() => toggleSubMenu("speciality")}
            className={openMenu === "speciality" ? "active" : ""}
          >
            <Link to="/add-specialities">Speciality</Link>
            <i className="fa fa-caret-down"></i>
          </li>
          {openMenu === "speciality" && (
            <ol>
              <li>
                <Link to="/add-specialities">Add Speciality</Link>
              </li>
              <li>
                <Link to="/manage-specialities">Manage Speciality</Link>
              </li>
            </ol>
          )}

          <li
            onClick={() => toggleSubMenu("services")}
            className={openMenu === "services" ? "active" : ""}
          >
            <Link to="/add-service">Services</Link>
            <i className="fa fa-caret-down"></i>
          </li>
          {openMenu === "services" && (
            <ol>
              <li>
                <Link to="/add-service-category">Add Category Services</Link>
              </li>
              <li>
                <Link to="/manage-service-category">
                  Manage Services Category
                </Link>
              </li>
              <li>
                <Link to="/add-service">Add Services</Link>
              </li>
              <li>
                <Link to="/manage-service">Manage Services</Link>
              </li>
            </ol>
          )}

          <li
            onClick={() => toggleSubMenu("doctors")}
            className={openMenu === "doctors" ? "active" : ""}
          >
            <Link to="/add-doctors">Doctors</Link>
            <i className="fa fa-caret-down"></i>
          </li>
          {openMenu === "doctors" && (
            <ol>
              <li>
                <Link to="/add-doctors">Add Doctors</Link>
              </li>
              <li>
                <Link to="/add-home-doctors">Add Home Doctors</Link>
              </li>
              <li>
                <Link to="/manage-doctors">Manage Doctors</Link>
              </li>
            </ol>
          )}
        </ul>
      </div>
    </div>
  );
}

export default List;
