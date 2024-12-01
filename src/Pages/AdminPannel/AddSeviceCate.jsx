import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddSeviceCate() {
  const { id } = useParams();
  const { authorizationToken, API } = useAuth();
  const navigate = useNavigate();
  const URL = `${API}/api/adminv5/add-service-category`; // Corrected URL

  const [AddSeviceCateData, setAddSeviceCateData] = useState({
    title: "",
    slug: "",
    image: null,
    status: true,
    seoTags: "",
  });

  useEffect(() => {
    if (id) {
      fetchAddSeviceCateData();
    }
  }, [id]);

  const fetchAddSeviceCateData = async () => {
    try {
      const response = await fetch(
        `${API}/api/adminv5/add-service-category/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();

        setAddSeviceCateData(data.servicescategories);
      } else {
        toast.error("Failed to fetch service category data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSeviceCateInput = (e) => {
    const { name, value } = e.target;
    const modifiedValue =
      name === "slug"
        ? value
            .toLowerCase()
            .replace(/[^\w\s]/gi, "-")
            .replace(/\s+/g, "-")
        : name === "status"
        ? value === "true"
        : value;

    setAddSeviceCateData({
      ...AddSeviceCateData,
      [name]: modifiedValue,
    });

    if (name === "title") {
      setAddSeviceCateData((prevState) => ({
        ...prevState,
        slug: value
          .toLowerCase()
          .replace(/[^\w\s]/gi, "-")
          .replace(/\s+/g, "-"),
      }));
    }
  };

  const handleFileChange = (e) => {
    setAddSeviceCateData({
      ...AddSeviceCateData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", AddSeviceCateData.title);
      formData.append("slug", AddSeviceCateData.slug);
      formData.append("status", AddSeviceCateData.status);
      formData.append("image", AddSeviceCateData.image);
      formData.append("seoTags", AddSeviceCateData.seoTags); // Include seoTags in form data

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
          ? "AddSeviceCate updated successfully"
          : "AddSeviceCate added successfully";
        toast.success(message);
        resetForm();
        navigate("/manage-service-category");
      } else {
        toast.error(`Failed to ${id ? "update" : "add"} AddSeviceCate`);
      }
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${id ? "update" : "add"} AddSeviceCate`);
    }
  };

  const resetForm = () => {
    setAddSeviceCateData({
      title: "",
      slug: "",
      image: null,
      status: true,
      seoTags: "", // Reset seoTags field
    });
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
                    {id ? "Update service category" : "Add service category"}
                    <Link
                      to="/add-service-category"
                      className="btn btn-light ss"
                    >
                      View Sevice Category
                    </Link>
                  </h2>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="title" className="form-label">
                          Sevice Category's Name
                        </label>
                        <input
                          name="title"
                          autoComplete="off"
                          value={AddSeviceCateData.title}
                          onChange={handleAddSeviceCateInput}
                          id="title"
                          required
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="slug" className="form-label">
                          Sevice Category Slug
                        </label>
                        <input
                          name="slug"
                          autoComplete="off"
                          value={AddSeviceCateData.slug}
                          onChange={handleAddSeviceCateInput}
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
                          Sevice Category Image
                        </label>
                        <input
                          name="image"
                          autoComplete="off"
                          onChange={handleFileChange}
                          id="image"
                          type="file"
                          className="form-control"
                        />
                        {id && AddSeviceCateData.image && (
                          <div>
                            <img
                              src={`${API}/uploads/Service/${AddSeviceCateData.image}`}
                              width="200px"
                              height="auto"
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
                          value={AddSeviceCateData.status ? "true" : "false"}
                          onChange={handleAddSeviceCateInput}
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
                        <label htmlFor="seo_tags" className="form-label">
                          Seo Tags
                        </label>
                        <textarea
                          name="seoTags"
                          autoComplete="off"
                          value={AddSeviceCateData.seoTags}
                          onChange={handleAddSeviceCateInput}
                          id="seo_tags"
                          rows={12}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <button type="submit" className="btn btn-primary w-100">
                          {id ? "Update AddSeviceCate" : "Add AddSeviceCate"}
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

export default AddSeviceCate;
