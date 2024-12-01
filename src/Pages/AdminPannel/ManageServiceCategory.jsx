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
      const response = await fetch(
        `${API}/api/adminv5/manage-service-category`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setViewCategoriesData(data.servicescategories);
      } else if (response.status === 404) {
        setViewCategoriesData([]);
        toast.info("No Service Category found");
      } else {
        throw new Error("Failed to fetch Service Category data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategoryById = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/adminv5/add-service-category/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.ok) {
        getViewCategoriesData();
        toast.success("Service Category deleted successfully");
      } else {
        toast.error("Failed to delete Service Category");
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
      <main>
        <TopBarAdmin />
        <div className="container-fluid">
          <div className="row">
            <div class="col-md-3 adminleft">
              <div>
                <List />
              </div>
            </div>
            <div className="col-md-9 adminright">
              <div className="addblog">
                <div className="addblogform">
                  <h2>Manage Service Category</h2>
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
                        {viewCategoriesData.map((servicescategories, index) => (
                          <tr key={index}>
                            <td className="ptd">{index + 1}</td>
                            <td className="ptd">{servicescategories.title}</td>
                            <td>
                              <img
                                src={`${API}/uploads/Service/${servicescategories.image}`}
                                width="50px"
                                height="auto"
                                alt="servicescategories Image"
                              />
                            </td>
                            <td
                              style={{
                                color: servicescategories.status
                                  ? "green"
                                  : "red",
                                paddingTop: 20,
                              }}
                            >
                              {servicescategories.status
                                ? "Active"
                                : "Deactive"}
                            </td>
                            <td className="updatebtn pbtn">
                              <Link
                                to={`/add-service-category/${servicescategories._id}`}
                              >
                                <i className="fa fa-edit text-light"></i>
                              </Link>
                            </td>
                            <td className="deletebtn pbtn">
                              <button
                                className="btn"
                                onClick={() =>
                                  handleDelete(servicescategories._id)
                                }
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
