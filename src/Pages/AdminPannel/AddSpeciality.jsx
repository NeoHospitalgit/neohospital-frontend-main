import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

function AddCategory() {
  const { id } = useParams();
  const { authorizationToken, API } = useAuth();
  const navigate = useNavigate();
  const URL = `${API}/api/adminv1/category`;

  const [categoryData, setCategoryData] = useState({
    title: "",
    slug: "",
    seo_tag: "",
    image: null,
    status: true,
    content: "", // Add content field to state
  });

  useEffect(() => {
    if (id) {
      fetchCategoryData();
    }
  }, [id]);

  const fetchCategoryData = async () => {
    try {
      const response = await fetch(`${API}/api/adminv1/category/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCategoryData(data.category);
      } else {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch category data");
    }
  };

  const handleCategoryInput = (e) => {
    const { name, value } = e.target;
    const transformedValue = name === "status" ? value === "true" : value;
    const modifiedValue =
      name === "slug"
        ? value
            .toLowerCase()
            .replace(/[^\w\s]/gi, "") // Remove special characters
            .replace(/\s+/g, "-") // Replace whitespace with hyphen
        : transformedValue;

    setCategoryData({
      ...categoryData,
      [name]: modifiedValue,
    });

    if (name === "title") {
      setCategoryData((prevState) => ({
        ...prevState,
        slug: value
          .toLowerCase()
          .replace(/[^\w\s]/gi, "") // Remove special characters
          .replace(/\s+/g, "-"), // Replace whitespace with hyphen
      }));
    }
  };

  const handleFileChange = (e) => {
    setCategoryData({
      ...categoryData,
      image: e.target.files[0],
    });
  };

  const handleSpecChange = (newContent) => {
    setCategoryData({
      ...categoryData,
      content: newContent,
    });
  };

  const addCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("title", categoryData.title);
      formData.append("slug", categoryData.slug);
      formData.append("status", categoryData.status);
      formData.append("seo_tag", categoryData.seo_tag);
      formData.append("image", categoryData.image);
      formData.append("content", categoryData.content); // Include content in form data

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.success(message);
        resetForm();
        navigate("/manage-specialities");
      } else {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category");
    }
  };

  const updateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("title", categoryData.title);
      formData.append("slug", categoryData.slug);
      formData.append("status", categoryData.status);
      formData.append("seo_tag", categoryData.seo_tag);
      formData.append("image", categoryData.image);
      formData.append("content", categoryData.content); // Include content in form data

      const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.success(message);
        resetForm();
        navigate("/manage-specialities");
      } else {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category");
    }
  };

  const resetForm = () => {
    setCategoryData({
      title: "",
      seo_tag: "",
      slug: "",
      image: null,
      status: true,
      content: "", // Reset content field
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    id ? updateCategory() : addCategory();
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
                    {id ? "Update Specialities" : "Add Specialities"}
                    <Link
                      to="/manage-specialities"
                      className="btn btn-light ss"
                    >
                      View Category
                    </Link>
                  </h2>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                          accept=".jpg,.jpeg,.png,.webp"
                          className="form-control"
                        />
                        {id && categoryData.image && (
                          <div>
                            <img
                              src={`${API}/uploads/categories/${categoryData.image}`}
                              width="200px"
                              height="auto"
                              alt="Category Image"
                            />
                          </div>
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
                        <label htmlFor="seo_tag" className="form-label">
                          Seo Tags
                        </label>
                        <textarea
                          name="seo_tag"
                          autoComplete="off"
                          value={categoryData.seo_tag}
                          onChange={handleCategoryInput}
                          id="seo_tag"
                          rows="9"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-md-12">
                        <label htmlFor="content" className="form-label">
                          Specility Content
                        </label>
                        <JoditEditor
                          ref={null}
                          id="content"
                          className="form-control"
                          autoComplete="off"
                          value={categoryData.content}
                          name="content"
                          onChange={handleSpecChange}
                        />
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
