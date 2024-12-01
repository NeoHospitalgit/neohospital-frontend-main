import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function Manageblog() {
  const [viewblogsData, setViewblogsData] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getViewblogsData = async () => {
    try {
      const response = await fetch(`${API}/api/adminv3/view-blogs`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setViewblogsData(data.Blog);
      } else if (response.status === 404) {
        setViewblogsData([]);
        toast.info("No blogs found");
      } else {
        throw new Error("Failed to fetch blogs data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlogById = async (id) => {
    try {
      const response = await fetch(`${API}/api/adminv3/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getViewblogsData();
        toast.success("blogs deleted successfully");
      } else {
        toast.error("Failed to delete blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getViewblogsData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you want to delete ?")) {
      deleteBlogById(id);
    }
  };

  return (
    <>
      <TopBarAdmin />
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 adminleft">
              <List />
            </div>
            <div className="col-md-9 adminright">
              <div className="addblog">
                <div className="addblogform">
                  <h2>
                    Manage Blogs
                    <Link to="/add-blog" className="btn btn-light ss">
                      Add blogs
                    </Link>
                  </h2>
                  {viewblogsData.length ? (
                    <table className="table table-dark">
                      <thead>
                        <tr>
                          <th scope="col">id</th>
                          <th scope="col">Blog Name</th>
                          <th scope="col">Blog Image</th>
                          <th scope="col">Status</th>
                          <th scope="col">Update</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewblogsData.map((blog, index) => (
                          <tr key={index}>
                            <td className="ptd">{index + 1}</td>
                            <td className="ptd">{blog.blog_title}</td>
                            <td>
                              <img
                                src={`${API}/uploads/blogs/${blog.blog_image}`}
                                width="50px"
                                height="auto"
                                alt="blog Image"
                              />
                            </td>
                            <td
                              style={{
                                color: blog.blog_status ? "green" : "red",
                                paddingTop: 20,
                              }}
                            >
                              {blog.blog_status ? "Active" : "Deactive"}
                            </td>
                            <td className="updatebtn pbtn">
                              <Link to={`/add-blog/${blog._id}`}>
                                <i className="fa fa-edit text-light"></i>
                              </Link>
                            </td>
                            <td className="deletebtn pbtn">
                              <button
                                className="btn"
                                onClick={() => handleDelete(blog._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <h3 className="text-danger text-center py-5">
                      No Blogs found
                    </h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Manageblog;
