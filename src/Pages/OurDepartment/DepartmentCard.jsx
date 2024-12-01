import React from "react";
import "./departmentcard.css";
import { Link } from "react-router-dom";

function DepartmentCard(props) {
  return (
    <div className="aligncard">
      <a class="card1">
        <div key={props.id} className="card"></div>
        <img src={props.blogimage} alt={props.title} className="img-fluid" />
        <h3>{props.title}</h3>
        <p>{props.departmentcontent}</p>
        <div className="text-center">
          <button className="text-btn">
            <Link to={`https://www.neohospital.com/${props.departmentslug}`}>
              Read More
            </Link>
          </button>
        </div>
        <div class="go-corner">
          <div class="go-arrow">→</div>
        </div>
      </a>
    </div>
  );
}

export default DepartmentCard;
