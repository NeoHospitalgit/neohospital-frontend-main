import React from "react";
import "./BlogCard.css";
import { Link } from "react-router-dom";

function BlogCard(props) {
  const dateObject = props.blogdate ? new Date(props.blogdate) : null;
  const formattedDate =
    dateObject && !Number.isNaN(dateObject.getTime())
      ? dateObject.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "";

  const title = props.title || "NEO Hospital Blog";
  const image = props.blogimage || "";
  const description = String(props.description || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <article className="neo-blog-card">
      <Link
        to={`/blog/${props.blogslug}`}
        className="neo-blog-card-image-link"
        aria-label={`Read ${title}`}
      >
        <div className="neo-blog-card-image">
          {image ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="neo-blog-card-image-placeholder">
              <i className="fa fa-file-text-o"></i>
            </div>
          )}
        </div>
      </Link>

      <div className="neo-blog-card-content">
        <div className="neo-blog-card-meta">
          <span className="neo-blog-card-badge">HEALTH BLOG</span>
          {formattedDate && (
            <span className="neo-blog-card-date">
              <i className="fa fa-calendar-o"></i>
              {formattedDate}
            </span>
          )}
        </div>

        <h2 className="neo-blog-card-title">
          <Link to={`/blog/${props.blogslug}`}>{title}</Link>
        </h2>

        {description && (
          <p className="neo-blog-card-description">{description}</p>
        )}

        <div className="neo-blog-card-footer">
          <span className="neo-blog-card-author">
            {props.author || "NEO Hospital"}
          </span>

          <Link
            to={`/blog/${props.blogslug}`}
            className="neo-blog-read-more"
          >
            Read More
            <i className="fa fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
