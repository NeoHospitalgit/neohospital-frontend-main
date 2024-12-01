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
        toast.success("Category deleted successfully");
      } else {
        toast.error("Failed to delete category");
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
                    Manage Category
                    <Link to="/add-category" className="btn btn-light ss">
                      Add Category
                    </Link>
                  </h2>
                  <table className="table table-dark">
                    <thead>
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewCategoriesData.map((category, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{category.title}</td>
                          <td className="updatebtn">
                            <Link to={`/add-category/${category._id}`}>
                              <i className="fa fa-edit text-light"></i>
                            </Link>
                          </td>
                          <td className="deletebtn">
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
