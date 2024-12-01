import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../store/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import List from "./List";
import JoditEditor from "jodit-react";
import AsyncSelect from "react-select/async";

function AddDoctor() {
  const editor = useRef(null);
  const [contentEditor, setContentEditor] = useState("");

  const { id } = useParams();
  const { authorizationToken, API } = useAuth();
  const navigate = useNavigate();
  const URL = `${API}/api/adminv2/doctors`;
  const UR2L = `${API}/api/adminv7/home-doctors`;

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

  const [allDoctor, setAllDoctor] = useState([]);

  useEffect(() => {
    fetchAllDoctor();
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

  const handleDoctorInput = (e) => {
    const { name, value } = e.target;
    setDoctorData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addDoctor = async () => {
    try {
      const response = await fetch(UR2L, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(DoctorData),
      });

      if (response.ok) {
        toast.success("Doctor added successfully");
        resetForm();
        navigate("/manage-home-doctors");
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
      const response = await fetch(`${UR2L}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(DoctorData),
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

  const fetchAllDoctor = async () => {
    try {
      const response = await fetch(`${API}/api/adminv2/view-doctors`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAllDoctor(data.doctors);
      } else if (response.status === 404) {
        setAllDoctor([]);
        toast.info("No Speciality found");
      } else {
        throw new Error("Failed to fetch Speciality");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Speciality");
    }
  };

  const loadOptions = async (inputValue) => {
    return allDoctor
      .filter((doctor) =>
        doctor.drTitle.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((doctor) => ({
        value: doctor._id,
        label: doctor.drTitle,
      }));
  };

  const handleDoctorSelect = async (selectedOption) => {
    try {
      const response = await fetch(`${URL}/${selectedOption.value}`, {
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
        throw new Error("Failed to fetch selected doctor data");
      }
    } catch (error) {
      console.error("Error fetching selected doctor data:", error);
      toast.error("Failed to fetch selected doctor data");
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
                        <label htmlFor="doctors" className="form-label">
                          Select Doctor Here
                        </label>
                        <AsyncSelect
                          cacheOptions
                          defaultOptions
                          loadOptions={loadOptions}
                          onChange={handleDoctorSelect}
                        />
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
                      <div className="col-md-6">
                        <label htmlFor="drImage" className="form-label">
                          Doctor's Image
                        </label>
                        <div>
                          <img
                            src={`${API}/uploads/doctors/${DoctorData.drImage}`}
                            width="150px"
                            height="150px"
                            alt="DoctorData Image"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-md-6">
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
                      </div>
                      <div className="col-md-6">
                        <input
                          name="drSlug"
                          autoComplete="off"
                          value={DoctorData.drSlug}
                          onChange={handleDoctorInput}
                          id="drSlug"
                          type="text"
                          placeholder="slug"
                          hidden
                          className="form-control"
                        />
                      </div>
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
                      <div className="col-md-6">
                        <label htmlFor="drDepartment" className="form-label">
                          Doctor's Departments
                        </label>
                        <input
                          name="drDepartment"
                          autoComplete="off"
                          value={DoctorData.drDepartment}
                          onChange={handleDoctorInput}
                          id="drDepartment"
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
