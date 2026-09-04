import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function ListKeywordPage() {
  const [keywordsData, setKeywordsData] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getKeywords = async () => {
    try {
      const response = await fetch(`${API}/api/adminv11/keywords`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setKeywordsData(data.data);
      } else {
        setKeywordsData([]);
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error("Failed to fetch keywords");
    }
  };

  const deleteKeyword = async (id) => {
    try {
      const response = await fetch(`${API}/api/adminv11/keywords/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        getKeywords();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getKeywords();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete this keyword?")) {
      deleteKeyword(id);
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
                    Manage Keywords

                    <Link
                      to="/add-keywords"
                      className="btn btn-light ss"
                    >
                      Add Keyword
                    </Link>
                  </h2>

                  {keywordsData.length > 0 ? (
                   <table className="table table-dark table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Keyword Title</th>
                      <th>Department</th>
                      <th>Banner</th>
                      <th>Status</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {keywordsData.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>

                        <td>{item.keyword_title}</td>

                        <td>
                          {item.department ? item.department.title : "-"}
                        </td>

                        <td>
                          {item.banner_image ? (
                            <img
                              src={`${API}/uploads/blogs/${item.banner_image}`}
                              alt={item.banner_imageALT}
                              width="60"
                             height="400" />
                          ) : (
                            "-"
                          )}
                        </td>

                        <td
                          style={{
                            color: item.keyword_status ? "lime" : "red",
                          }}
                        >
                          {item.keyword_status ? "Active" : "Inactive"}
                        </td>

                        <td>
                          <Link to={`/add-keyword/${item._id}`}>
                            <i className="fa fa-edit text-light"></i>
                          </Link>
                        </td>

                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(item._id)}
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
                      No Keywords Found
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

export default ListKeywordPage;