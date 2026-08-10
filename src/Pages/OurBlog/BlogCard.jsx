import React from "react";
import "./OurBlog.css";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
function BlogCard(props) {
  const words = parse(props.description);
  // const truncatedDescription = words.slice(0, 60);
  // Create a new Date object from the props.date string
  const dateObject = new Date(props.blogdate);

  // Extract day, month, and year from the date object
  const day = dateObject.getDate();
  // Months are zero-based in JavaScript, so we add 1 to get the correct month
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();

  // Format the date in "d-m-y" format
  const formattedDate = `${day}-${month}-${year}`;
  return (
    <>
      <div className="card-container">
        <div className="card-image">
          <img src={props.blogimage} className="img-fluid" alt={props.title} />
        </div>
        <div className="card-body">
          <span className="card-badge card-badge-blue">Blog</span>
          <h2>{props.title}</h2>
          {/* Displaying truncated description */}
          {/* <p className="card-subtitle">{truncatedDescription}</p> */}
          <div className="Readmore">
            <Link to={`/blog/${props.blogslug}`}>
              Read More <i className="fa fa-angle-double-right"> </i>
            </Link>
          </div>
{/*           <div className="card-author">
            <div className="author-info">
              <h6 className="author-name">{props.author}</h6>
            </div>
            <div className="author-info">
             <h6 className="author-name">{formattedDate}</h6> 
            </div>
          </div>  */}
        </div>
      </div>
    </>
  );
}
export default BlogCard;
