import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../store/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import List from "./List";
import JoditEditor from "jodit-react";

function AddService() {
  const editor = useRef(null);
  const [contentEditor, setContentEditor] = useState("");

  const { id } = useParams();
  const { authorizationToken, API } = useAuth();
  const navigate = useNavigate();
  const URL = `${API}/api/adminv6/add-service`;

  const [ServiceData, setServiceData] = useState({
    serviceTitle: "",
    serviceCat: "",
    slug: "",
    image: null,
    serviceDetail: "",
    serviceSeoTags: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchService();
    }
  }, [id]);

  const fetchService = async ()  => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setServiceData(data.service);
        setContentEditor(data.service.serviceDetail);
      } else {
        throw new Error("Failed to fetch Service");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Service");
    }
  };

  const handleQualificationChange = (newContent) => {
    setContentEditor(newContent);
    setServiceData((prevState) => ({
      ...prevState,
      serviceDetail: newContent,
    }));
  };

  const handleDrFileChange = (e) => {
    setServiceData({
      ...ServiceData,
      image: e.target.files[0],
    });
  };

  const handleServiceInput = (e) => {
    const { name, value } = e.target;
    const modifiedValue =
      name === "slug"
        ? value
            .toLowerCase()
            .replace(/[^\w\s]/gi, "-")
            .replace(/\s+/g, "-")
        : value;

    setServiceData({
      ...ServiceData,
      [name]: modifiedValue,
    });

    if (name === "serviceTitle") {
      setServiceData((prevState) => ({
        ...prevState,
        slug: value
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-"),
      }));
    }
  };

  const AddService = async () => {
    try {
      const formData = new FormData();
      Object.entries(ServiceData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Service added successfully");
        resetForm();
        navigate("/add-service");
      } else {
        throw new Error("Failed to add Service");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add Service");
    }
  };

  const updateService = async () => {
    try {
      const formData = new FormData();
      Object.entries(ServiceData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Service updated successfully");
        resetForm();
        navigate("/manage-service");
      } else {
        throw new Error("Failed to update Service");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Service");
    }
  };

  const resetForm = () => {
    setServiceData({
      serviceTitle: "",
      serviceCat: "",
      slug: "",
      image: null,
      serviceDetail: "",
      serviceSeoTags: "",
    });
  };

  const handleServices = async (e) => {
    e.preventDefault();
    if (id) {
      updateService();
    } else {
      AddService();
    }
  };

  const fetchCategories = async () => {
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
        setCategories(data.servicescategories);
      } else if (response.status === 404) {
        setCategories([]);
        toast.info("No Service serviceCat found");
      } else {
        throw new Error("Failed to fetch Service serviceCat");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Service serviceCat");
    }
  };

  return (
    <>
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
                    {id ? "Edit service" : "Add service"}
                    <Link to="/manage-service" className="btn btn-light ss">
                      View services
                    </Link>
                  </h2>
                  <form onSubmit={handleServices} encType="multipart/form-data">
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="serviceCat" className="form-label">
                          Service's Department
                        </label>
                        <select
                          name="serviceCat"
                          id="serviceCat"
                          value={ServiceData.serviceCat}
                          onChange={handleServiceInput}
                          className="form-control"
                          required
                        >
                          <option value="">Select Service Department</option>
                          {categories.length > 0 ? (
                            categories.map((serviceCat) => (
                              <option
                                key={serviceCat._id}
                                value={serviceCat.slug} // Changed value to serviceCat title
                              >
                                {serviceCat.title}
                              </option>
                            ))
                          ) : (
                            <option value="">No departments found</option>
                          )}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="serviceTitle" className="form-label">
                          Service's Title
                        </label>
                        <input
                          name="serviceTitle"
                          autoComplete="off"
                          value={ServiceData.serviceTitle}
                          onChange={handleServiceInput}
                          id="serviceTitle"
                          required
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="slug" className="form-label">
                          Service's Slug
                        </label>
                        <input
                          name="slug"
                          autoComplete="off"
                          value={ServiceData.slug}
                          onChange={handleServiceInput}
                          id="slug"
                          required
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="image" className="form-label">
                          Service's Image
                        </label>
                        <input
                          name="image"
                          autoComplete="off"
                          onChange={handleDrFileChange}
                          id="image"
                          type="file"
                          className="form-control"
                        />
                        {id && ServiceData.image && (
                          <div>
                            <img
                              src={`${API}/uploads/Service/${ServiceData.image}`}
                              width="200px"
                              height="auto"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-md-12">
                        <label htmlFor="serviceSeoTags" className="form-label">
                          SEO Tags
                        </label>
                        <textarea
                          name="serviceSeoTags"
                          autoComplete="off"
                          value={ServiceData.serviceSeoTags}
                          onChange={handleServiceInput}
                          id="serviceSeoTags"
                          rows={4}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <label htmlFor="serviceDetail" className="form-label">
                          Service's Detail
                        </label>
                        <JoditEditor
                          ref={editor}
                          value={contentEditor}
                          tabIndex={1}
                          onChange={handleQualificationChange}
                        />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <button type="submit" className="btn btn-primary w-100">
                          {id ? "Update Service" : "Add Service"}
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

export default AddService;
