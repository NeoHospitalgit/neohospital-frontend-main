import React from "react";
import { Link } from "react-router-dom";
import "./departmentcard.css";

function DepartmentCard({ id, blogimage, title, departmentcontent, departmentslug }) {
  return (
    <div className="aligncard">
      <Link
        to={`https://www.neohospital.com/${departmentslug}`}
        className="card1"
        aria-label={`Learn more about ${title}`}
      >
        <img
          src={blogimage}
          alt={title}
          className="departmentcards-img"
        />
        <h3>{title}</h3>
        <p>{departmentcontent}</p>
        <div className="text-center">
          <span className="text-btn">Read More</span>
        </div>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </Link>
    </div>
  );
}

export default DepartmentCard;
