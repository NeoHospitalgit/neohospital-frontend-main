import React from "react";
import "./OurBlog.css";
import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
function BlogAll() {
  const [Neoblog, setNeoblog] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.neohospital.com/api/adminv3/view-blogs"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const sortedBlogs = data.Blog.sort(
          (a, b) => new Date(b.blog_date) - new Date(a.blog_date)
        );
        setNeoblog(sortedBlogs);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="row">
        {Neoblog.map((value, index) => {
          return (
            <div className="col-md-3" key={index}>
              <div>
                <BlogCard
                  blogimage={`https://api.neohospital.com/uploads/blogs/${value.blog_image}`}
                  title={value.blog_title}
                  description={value.blog_content}
                  blogslug={value.blog_slug}
                  author={value.blog_auther}
                  blogdate={value.blog_date}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default BlogAll;
