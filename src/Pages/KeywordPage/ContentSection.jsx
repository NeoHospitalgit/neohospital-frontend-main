import React from "react";
import parse from "html-react-parser";
import "./Keyword.css";

function ContentSection({ title, content }) {
  return (
    <section className="content-section">
      <div className="container">

        <div className="content-heading">

          <span className="content-tag">
            Comprehensive Healthcare
          </span>

          <h2>
            About {title}
          </h2>
        </div>

        <div className="content-box">

          {parse(content)}

        </div>

      </div>
    </section>
  );
}

export default ContentSection;
