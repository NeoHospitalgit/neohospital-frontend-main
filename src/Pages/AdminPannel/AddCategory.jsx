import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const { id } = useParams();
  const { authorizationToken, API } = useAuth();
  const navigate = useNavigate();
  const URL = `${API}/api/adminv1/category`;

  const [categoryData, setCategoryData] = useState({
    title: "",
    slug: "",
    image: null,
    status: true,
  });

  useEffect(() => {
    if (id) {
      fetchCategoryData();
    }
  }, [id]);

  const fetchCategoryData = async () => {
    try {
      const response = await fetch(`${API}/api/adminv1/category/${id}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCategoryData(data.category);
      } else {
        toast.error("Failed to fetch category data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryInput = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setCategoryData({
      ...categoryData,
      image: e.target.files[0],
    });
  };
  const handleCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", categoryData.title);
    formData.append("slug", categoryData.slug);
    formData.append("status", categoryData.status);
    formData.append("image", categoryData.image);

    try {
      const method = id ? "PUT" : "POST";
      const response = await fetch(`${URL}/${id || ""}`, {
        method,
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });
      if (response.ok) {
        const message = id
          ? "Category updated successfully"
          : "Category added successfully";
        toast.success(message);
        setCategoryData({ title: "", slug: "", image: null, status: true });
        navigate("/manage-category");
      } else {
        toast.error("Failed to add/update category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add/update category");
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
                    {id ? "Update Category" : "Add Category"}
                    <Link to="/manage-category" className="btn btn-light ss">
                      View Category
                    </Link>
                  </h2>
                  <form onSubmit={handleCategory} encType="multipart/form-data">
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="title" className="form-label">
                          Category's Name
                        </label>
                        <input
                          name="title"
                          autoComplete="off"
                          value={categoryData.title}
                          onChange={handleCategoryInput}
                          id="title"
                          required
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="slug" className="form-label">
                          Category Slug
                        </label>
                        <input
                          name="slug"
                          autoComplete="off"
                          value={categoryData.slug}
                          onChange={handleCategoryInput}
                          id="slug"
                          required
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="image" className="form-label">
                          Category Image
                        </label>
                        <input
                          name="image"
                          autoComplete="off"
                          onChange={handleFileChange}
                          id="image"
                          type="file"
                          className="form-control"
                        />
                        {id ? (
                          <div>
                            <img
                              src={`${API}/uploads/categories/${categoryData.image}`}
                              alt="Category Image"
                              width="200px"
                              height="auto"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="status" className="form-label">
                          Status
                        </label>
                        <select
                          name="status"
                          value={categoryData.status ? "true" : "false"}
                          onChange={handleCategoryInput}
                          id="status"
                          className="form-select"
                        >
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <button type="submit" className="btn btn-primary w-100">
                          {id ? "Update Category" : "Add Category"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddCategory;
