import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function ManageCategory() {
  const [viewCategoriesData, setViewCategoriesData] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getViewCategoriesData = async () => {
    try {
      const response = await fetch(`${API}/api/adminv1/view-category`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setViewCategoriesData(data.category);
      } else if (response.status === 404) {
        setViewCategoriesData([]);
        toast.info("No Speciality found");
      } else {
        throw new Error("Failed to fetch Speciality data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategoryById = async (id) => {
    try {
      const response = await fetch(`${API}/api/adminv1/category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getViewCategoriesData();
        toast.success("Speciality deleted successfully");
      } else {
        toast.error("Failed to delete Speciality");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getViewCategoriesData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you want to delete ?")) {
      deleteCategoryById(id);
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
                    Manage Specialities
                    <Link to="/add-specialities" className="btn btn-light ss">
                      Add Speciality
                    </Link>
                  </h2>
                  {viewCategoriesData.length ? (
                    <table className="table table-dark">
                      <thead>
                        <tr>
                          <th scope="col">id</th>
                          <th scope="col">Category Name</th>
                          <th scope="col">Category Image</th>
                          <th scope="col">Status</th>
                          <th scope="col">Update</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewCategoriesData.map((category, index) => (
                          <tr key={index}>
                            <td className="ptd">{index + 1}</td>
                            <td className="ptd">{category.title}</td>
                            <td>
                              <img
                                src={`${API}/uploads/categories/${category.image}`}
                                width="50px"
                                height="auto"
                                alt="Category Image"
                              />
                            </td>
                            <td
                              style={{
                                color: category.status ? "green" : "red",
                                paddingTop: 20,
                              }}
                            >
                              {category.status ? "Active" : "Deactive"}
                            </td>
                            <td className="updatebtn pbtn">
                              <Link to={`/add-specialities/${category._id}`}>
                                <i className="fa fa-edit text-light"></i>
                              </Link>
                            </td>
                            <td className="deletebtn pbtn">
                              <button
                                className="btn"
                                onClick={() => handleDelete(category._id)}
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
                      No specialities found
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

export default ManageCategory;
