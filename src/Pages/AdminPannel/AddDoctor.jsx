import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../store/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import List from "./List";
import JoditEditor from "jodit-react";

function AddDoctor() {
  const editor = useRef(null);
  const [contentEditor, setContentEditor] = useState("");

  const { id } = useParams();
  const { authorizationToken, API } = useAuth();
  const navigate = useNavigate();
  const URL = `${API}/api/adminv2/doctors`;

  const [DoctorData, setDoctorData] = useState({
    drTitle: "",
    drDepartment: "",
    drSlug: "",
    drImage: null,
    drQualification: "",
    drDetail: "",
    drTiming: "",
    drStatus: true,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchDoctor();
    }
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDoctorData(data.doctors);
        setContentEditor(data.doctors.drDetail);
      } else {
        throw new Error("Failed to fetch doctor");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch doctor");
    }
  };

  const handleQualificationChange = (newContent) => {
    setContentEditor(newContent);
    setDoctorData((prevState) => ({
      ...prevState,
      drDetail: newContent,
    }));
  };

  const handleDrFileChange = (e) => {
    setDoctorData({
      ...DoctorData,
      drImage: e.target.files[0],
    });
  };

  const handleDoctorInput = (e) => {
    const { name, value } = e.target;
    const modifiedValue =
      name === "drSlug"
        ? value
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-")
        : value;

    setDoctorData({
      ...DoctorData,
      [name]: modifiedValue,
    });

    if (name === "drTitle") {
      setDoctorData((prevState) => ({
        ...prevState,
        drSlug: value
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-"),
      }));
    }
  };

  const addDoctor = async () => {
    try {
      const formData = new FormData();
      Object.entries(DoctorData).forEach(([key, value]) => {
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
        toast.success("Doctor added successfully");
        resetForm();
        navigate("/manage-doctors");
      } else {
        throw new Error("Failed to add doctor");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add doctor");
    }
  };

  const updateDoctorData = async () => {
    try {
      const formData = new FormData();
      Object.entries(DoctorData).forEach(([key, value]) => {
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
        toast.success("Doctor updated successfully");
        navigate("/manage-doctors");
      } else {
        throw new Error("Failed to update Doctor data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update doctor data");
    }
  };

  const resetForm = () => {
    setDoctorData({
      drTitle: "",
      drDepartment: "",
      drSlug: "",
      drImage: null,
      drQualification: "",
      drDetail: "",
      drTiming: "",
      drStatus: true,
    });
  };

  const handleDoctors = async (e) => {
    e.preventDefault();
    if (id) {
      updateDoctorData();
    } else {
      addDoctor();
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API}/api/adminv1/view-category`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.category);
      } else if (response.status === 404) {
        setCategories([]);
        toast.info("No Speciality found");
      } else {
        throw new Error("Failed to fetch Speciality");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Speciality");
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
                    {id ? "Edit Doctor" : "Add Doctor"}
                    <Link to="/manage-doctors" className="btn btn-light ss">
                      View Doctors
                    </Link>
                  </h2>
                  <form onSubmit={handleDoctors} encType="multipart/form-data">
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="drDepartment" className="form-label">
                          Doctor's Department
                        </label>
                        <select
                          name="drDepartment"
                          id="drDepartment"
                          value={DoctorData.drDepartment}
                          onChange={handleDoctorInput}
                          className="form-control"
                          required
                        >
                          <option value="">Select Department</option>
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <option key={category._id} value={category.title}>
                                {category.title}
                              </option>
                            ))
                          ) : (
                            <option value="">No categories found</option>
                          )}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="drTitle" className="form-label">
                          Doctor's Name
                        </label>
                        <input
                          name="drTitle"
                          autoComplete="off"
                          value={DoctorData.drTitle}
                          onChange={handleDoctorInput}
                          id="drTitle"
                          required
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="drSlug" className="form-label">
                          Slug
                        </label>
                        <input
                          name="drSlug"
                          autoComplete="off"
                          value={DoctorData.drSlug}
                          onChange={handleDoctorInput}
                          id="drSlug"
                          required
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="drTiming" className="form-label">
                          Doctor's Timing
                        </label>
                        <input
                          name="drTiming"
                          autoComplete="off"
                          value={DoctorData.drTiming}
                          onChange={handleDoctorInput}
                          id="drTiming"
                          required
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="drImage" className="form-label">
                          Doctor's Image
                        </label>
                        <input
                          name="drImage"
                          autoComplete="off"
                          onChange={handleDrFileChange}
                          id="drImage"
                          type="file"
                          className="form-control"
                        />
                        {id && DoctorData.drImage && (
                          <div>
                            <img
                              src={`${API}/uploads/doctors/${DoctorData.drImage}`}
                              width="200px"
                              height="auto"
                              alt="DoctorData Image"
                            />
                          </div>
                        )}
                      </div>
                      {/* <div className="col-md-6">
                        <label htmlFor="drStatus" className="form-label">
                          Status
                        </label>
                        <select
                          name="drStatus"
                          value={DoctorData.drStatus ? "true" : "false"}
                          onChange={handleDoctorInput}
                          id="drStatus"
                          className="form-select"
                        >
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </select>
                      </div> */}
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="drQualification" className="form-label">
                          Doctor's Qualification
                        </label>
                        <input
                          name="drQualification"
                          autoComplete="off"
                          value={DoctorData.drQualification}
                          onChange={handleDoctorInput}
                          id="drQualification"
                          required
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <label htmlFor="drDetail" className="form-label">
                          Doctor's Details
                        </label>
                        <JoditEditor
                          ref={editor}
                          id="drDetail"
                          className="form-control"
                          autoComplete="off"
                          value={contentEditor}
                          name="drDetail"
                          onChange={handleQualificationChange}
                        />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <button type="submit" className="btn btn-primary w-100">
                          {id ? "Update Doctor" : "Add Doctor"}
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

export default AddDoctor;
