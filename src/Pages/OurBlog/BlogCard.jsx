import React from "react";
import "./OurBlog.css";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function BlogCard(props) {
  const dateObject = new Date(
    props.blogdate
  );

  const day =
    dateObject.getDate();

  const month =
    dateObject.getMonth() + 1;

  const year =
    dateObject.getFullYear();

  const formattedDate =
    `${day}-${month}-${year}`;

  return (
    <div className="card-container">

      <div className="card-image">
        <img
          src={props.blogimage}
          className="img-fluid"
          alt={
            props.title ||
            "NEO Hospital Blog"
          }
          loading="lazy"
        />
      </div>

      <div className="card-body">

        <span className="card-badge card-badge-blue">
          Blog
        </span>

        <h2>
          {props.title}
        </h2>

        <div className="Readmore">
          <Link
            to={`/blog/${props.blogslug}`}
          >
            Read More{" "}
            <i className="fa fa-angle-double-right"></i>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default BlogCard;