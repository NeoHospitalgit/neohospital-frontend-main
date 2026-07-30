import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

function ManageProcedures() {
  const formatDate = (dateString) => {
    const procedureDate = new Date(dateString).toISOString().split("T")[0];
    return `${procedureDate}`;
  };

 
      const { id } = useParams();
      const navigate = useNavigate();

      const { authorizationToken, API } = useAuth();

      const API_URL = `${API}/api/adminv12/procedures`;

      const [proceduresData, setProceduresData] = useState({

        // Basic Information
        procedures_title: "",
        procedures_slug: "",
        procedures_description: "",

        // Department
        department: "",
        doctors: [],

        cat_title: "",
        cat_content: "",
        // Main Content
        procedures_content: "",

        // FAQ
        faq: [
          {
            question: "",
            answer: "",
          },
        ],

        // SEO
        seo_title: "",
        meta_description: "",
        focus_procedures: "",
        schema_markup: "",

        // Status
        procedures_status: true,
        procedures_addedBy: "",

      });

      const [departments, setDepartments] = useState([]);
      const [doctors, setDoctors] = useState([]);

      useEffect(() => {

        fetchDepartments();

        if (id) {
          fetchProcedureData();
        }

      }, [id]);

  // =======================
// Fetch Single Procedure
// =======================
const fetchProcedureData = async () => {
  try {

    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
      },
    });

    const result = await response.json();

    if (response.ok) {

      const procedure = result.data;

      const departmentId =
        procedure.department?._id || procedure.department || "";

      if (departmentId) {
        await fetchDoctors(departmentId);
      }

      setProceduresData({

        procedures_title:
          procedure.procedures_title || "",

        procedures_slug:
          procedure.procedures_slug || "",

        procedures_description:
          procedure.procedures_description || "",

        department:
          departmentId,

        doctors:
          procedure.doctors
            ? procedure.doctors.map((doc) => doc._id)
            : [],
       cat_title: procedure.cat_title || "",
cat_content: procedure.cat_content || "",
        procedures_content:
          procedure.procedures_content || "",

        faq:
          procedure.faq && procedure.faq.length
            ? procedure.faq
            : [
                {
                  question: "",
                  answer: "",
                },
              ],

        seo_title:
          procedure.seo_title || "",

        meta_description:
          procedure.meta_description || "",

        focus_procedures:
          procedure.focus_procedures || "",

        schema_markup:
          procedure.schema_markup || "",

        procedures_status:
          procedure.procedures_status !== undefined
            ? procedure.procedures_status
            : true,

        procedures_addedBy:
          procedure.procedures_addedBy || "",

      });

    } else {

      toast.error(result.message);

    }

  } catch (error) {

    console.log(error);
    toast.error("Failed to fetch procedure.");

  }
};

// =======================
// Fetch Departments
// =======================
const fetchDepartments = async () => {

  try {

    const response = await fetch(
      `${API}/api/adminv1/view-category`,
      {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      }
    );

    const result = await response.json();

    if (response.ok) {

      setDepartments(result.category || []);

    } else {

      toast.error(result.message);

    }

  } catch (error) {

    console.log(error);
    toast.error("Failed to fetch departments.");

  }

};
// =======================
// Fetch Doctors
// =======================
const fetchDoctors = async (departmentId) => {

  try {

    const response = await fetch(
      `${API}/api/adminv2/department/${departmentId}`,
      {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      }
    );

    const result = await response.json();

    if (response.ok) {

      setDoctors(result.doctors || []);

    } else {

      setDoctors([]);

    }

  } catch (error) {

    console.log(error);
    setDoctors([]);

  }

};
// =======================
// Handle Input
// =======================
const handleProcedureInput = (e) => {

  const { name, value } = e.target;

  let updatedValue = value;

  // Boolean Status
  if (name === "procedures_status") {
    updatedValue = value === "true";
  }

  // Auto Slug
  if (name === "procedures_title") {

    const slug = value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setProceduresData((prev) => ({
      ...prev,
      procedures_title: value,
      procedures_slug: slug,
    }));

    return;
  }

  // Manual Slug
  if (name === "procedures_slug") {

    updatedValue = value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  // Department Change
  if (name === "department") {

    fetchDoctors(value);

    setProceduresData((prev) => ({
      ...prev,
      department: value,
      doctors: [],
    }));

    return;
  }

  setProceduresData((prev) => ({
    ...prev,
    [name]: updatedValue,
  }));

};

// =======================
// Handle Doctors
// =======================
const handleDoctorsChange = (e) => {

  const selectedDoctors = Array.from(
    e.target.selectedOptions,
    (option) => option.value
  );

  setProceduresData((prev) => ({
    ...prev,
    doctors: selectedDoctors,
  }));

};
// =======================
// Handle FAQ Change
// =======================
const handleFaqChange = (index, field, value) => {

  const updatedFaq = [...proceduresData.faq];

  updatedFaq[index][field] = value;

  setProceduresData((prev) => ({
    ...prev,
    faq: updatedFaq,
  }));

};



// =======================
// Add FAQ
// =======================
const addFaq = () => {

  setProceduresData((prev) => ({
    ...prev,
    faq: [
      ...prev.faq,
      {
        question: "",
        answer: "",
      },
    ],
  }));

};



// =======================
// Remove FAQ
// =======================
const removeFaq = (index) => {

  const updatedFaq = [...proceduresData.faq];

  updatedFaq.splice(index, 1);

  setProceduresData((prev) => ({
    ...prev,
    faq: updatedFaq,
  }));

};



// =======================
// Handle Jodit Content
// =======================
const handleContentChange = (content) => {

  setProceduresData((prev) => ({
    ...prev,
    procedures_content: content,
  }));

};
// =======================
// Add Procedure
// =======================
const addProcedure = async () => {

  try {

    const response = await fetch(API_URL, {

      method: "POST",

      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(proceduresData),

    });

    const result = await response.json();

    if (response.ok) {

      toast.success(result.message);

      resetForm();

      navigate("/list-procedures");

    } else {

      toast.error(result.message);

    }

  } catch (error) {

    console.log(error);

    toast.error("Failed to add procedure.");

  }

};



// =======================
// Update Procedure
// =======================
const updateProcedure = async () => {

  try {

    const response = await fetch(`${API_URL}/${id}`, {

      method: "PUT",

      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(proceduresData),

    });

    const result = await response.json();

    if (response.ok) {

      toast.success(result.message);

      resetForm();

      navigate("/list-procedures");

    } else {

      toast.error(result.message);

    }

  } catch (error) {

    console.log(error);

    toast.error("Failed to update procedure.");

  }

};



// =======================
// Reset Form
// =======================
const resetForm = () => {

  setProceduresData({

    procedures_title: "",
    procedures_slug: "",
    procedures_description: "",

    department: "",
    doctors: [],

     cat_title: "",
      cat_content: "",
    procedures_content: "",

    faq: [
      {
        question: "",
        answer: "",
      },
    ],

    seo_title: "",
    meta_description: "",
    focus_procedures: "",
    schema_markup: "",

    procedures_status: true,
    procedures_addedBy: "",

  });

  setDoctors([]);

};

const handleCatContentChange = (value) => {
  setProceduresData((prev) => ({
    ...prev,
    cat_content: value,
  }));
};

// =======================
// Submit Form
// =======================
const handleProcedure = (e) => {

  e.preventDefault();

  if (id) {

    updateProcedure();

  } else {

    addProcedure();

  }

};

  return (
    <>
      <TopBarAdmin />
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 adminleft">
              <div>
                <List />
              </div>
            </div>
            <div className="col-md-9 adminright">
              <div className="addblog">
                <div>
                  <div className="addblogform">
                    <h2>{id ? "Update Procedure" : "Add Procedure"}</h2>
                    
                    <form onSubmit={handleProcedure}>

                      {/* =========================
                          Basic Information
                      ========================== */}

                      <h5 className="border-bottom pb-2 mb-4">
                        Basic Information
                      </h5>

                      <div className="row">

                        <div className="col-md-6 mb-3">

                          <label className="form-label">
                            Procedure Title
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            name="procedures_title"
                            value={proceduresData.procedures_title}
                            onChange={handleProcedureInput}
                            placeholder="Enter Procedure Title"
                            required
                          />

                        </div>

                        <div className="col-md-6 mb-3">

                          <label className="form-label">
                            Procedure Slug
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            name="procedures_slug"
                            value={proceduresData.procedures_slug}
                            onChange={handleProcedureInput}
                            placeholder="Enter Procedure Slug"
                            required
                          />

                        </div>

                        <div className="col-md-12 mb-4">

                          <label className="form-label">
                            Short Description
                          </label>

                          <textarea
                            rows="4"
                            className="form-control"
                            name="procedures_description"
                            value={proceduresData.procedures_description}
                            onChange={handleProcedureInput}
                            placeholder="Enter Short Description"
                          />

                        </div>

                      </div>

                      {/* =========================
                          Department
                      ========================== */}

                      <h5 className="border-bottom pb-2 mb-4">
                        Department & Doctors
                      </h5>

                      <div className="row">

                        <div className="col-md-6 mb-4">

                          <label className="form-label">
                            Department
                          </label>

                          <select
                            className="form-control"
                            name="department"
                            value={proceduresData.department}
                            onChange={handleProcedureInput}
                          >

                            <option value="">
                              Select Department
                            </option>

                            {departments.map((department) => (

                              <option
                                key={department._id}
                                value={department._id}
                              >
                                {department.title}
                              </option>

                            ))}

                          </select>

                        </div>

                        <div className="col-md-6 mb-4">

                          <label className="form-label">
                            Doctors
                          </label>

                          <select
                            multiple
                            className="form-control"
                            value={proceduresData.doctors}
                            onChange={handleDoctorsChange}
                            style={{ minHeight: "220px" }}
                          >

                            {doctors.map((doctor) => (

                              <option
                                key={doctor._id}
                                value={doctor._id}
                              >
                                {doctor.drTitle}
                              </option>

                            ))}

                          </select>

                          <small className="text-muted">
                            Hold CTRL (Windows) or CMD (Mac) to select multiple doctors.
                          </small>

                        </div>

                      </div>
                      {/* ===================== Category Section ===================== */}

                      <h5 className="mb-3 mt-4 border-bottom pb-2">
                        CTA Section
                      </h5>

                      <div className="row">

                        <div className="col-md-12 mb-3">
                          <label className="form-label">CTA Title</label>

                          <input
                            type="text"
                            className="form-control"
                            name="cat_title"
                            value={proceduresData.cat_title}
                            onChange={handleProcedureInput}
                            placeholder="Enter Category Title"
                          />
                        </div>

                        <div className="col-md-12 mb-3">
                          <label className="form-label">CTA Content</label>

                        <JoditEditor
                          value={proceduresData.cat_content}
                          onBlur={handleCatContentChange}
                        />
                        </div>

                      </div>

                      {/* =========================
                          Procedure Content
                      ========================== */}

                      <h5 className="border-bottom pb-2 mb-4">
                        Procedure Content
                      </h5>

                      <div className="mb-5">

                        <JoditEditor
                          value={proceduresData.procedures_content}
                          onChange={handleContentChange}
                        />

                      </div>
                                      {/* =========================
                          SEO Details
                      ========================== */}

                      <h5 className="border-bottom pb-2 mb-4">
                        SEO Details
                      </h5>

                      <div className="row">

                        <div className="col-md-12 mb-3">

                          <label className="form-label">
                            SEO Title
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            name="seo_title"
                            value={proceduresData.seo_title}
                            onChange={handleProcedureInput}
                            placeholder="Enter SEO Title"
                          />

                        </div>

                        <div className="col-md-12 mb-3">

                          <label className="form-label">
                            Meta Description
                          </label>

                          <textarea
                            rows="4"
                            className="form-control"
                            name="meta_description"
                            value={proceduresData.meta_description}
                            onChange={handleProcedureInput}
                            placeholder="Enter Meta Description"
                          />

                        </div>

                        <div className="col-md-6 mb-3">

                          <label className="form-label">
                            Focus Procedure
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            name="focus_procedures"
                            value={proceduresData.focus_procedures}
                            onChange={handleProcedureInput}
                            placeholder="Focus Procedure"
                          />

                        </div>

                        <div className="col-md-6 mb-3">

                          <label className="form-label">
                            Schema Markup
                          </label>

                          <textarea
                            rows="4"
                            className="form-control"
                            name="schema_markup"
                            value={proceduresData.schema_markup}
                            onChange={handleProcedureInput}
                            placeholder="Paste JSON-LD Schema"
                          />

                        </div>

                      </div>

                      {/* =========================
                          FAQ
                      ========================== */}

                      <h5 className="border-bottom pb-2 mb-4 mt-5">
                        FAQ
                      </h5>

                      {proceduresData.faq.map((item, index) => (

                        <div
                          className="card border mb-4"
                          key={index}
                        >

                          <div className="card-body">

                            <div className="mb-3">

                              <label className="form-label">
                                {/* Question {index + 1} */}
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                placeholder="Question"
                                value={item.question}
                                onChange={(e) =>
                                  handleFaqChange(
                                    index,
                                    "question",
                                    e.target.value
                                  )
                                }
                              />

                            </div>

                            <div className="mb-3">

                              <label className="form-label">
                                {/* Answer */}
                              </label>

                              <textarea
                                rows="4"
                                placeholder="Answer"
                                className="form-control"
                                value={item.answer}
                                onChange={(e) =>
                                  handleFaqChange(
                                    index,
                                    "answer",
                                    e.target.value
                                  )
                                }
                              />

                            </div>

                            <div className="d-flex gap-2">

                              {proceduresData.faq.length > 1 && (

                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => removeFaq(index)}
                                >
                                  Remove
                                </button>

                              )}

                              {index === proceduresData.faq.length - 1 && (

                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={addFaq}
                                >
                                  + Add FAQ
                                </button>

                              )}

                            </div>

                          </div>

                        </div>

                      ))}

                      {/* =========================
                          Settings
                      ========================== */}

                      <h5 className="border-bottom pb-2 mb-4 mt-5">
                        Settings
                      </h5>

                      <div className="row">

                        <div className="col-md-6 mb-3">

                          <label className="form-label">
                            Status
                          </label>

                          <select
                            className="form-control"
                            name="procedures_status"
                            value={String(proceduresData.procedures_status)}
                            onChange={handleProcedureInput}
                          >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </select>

                        </div>

                        <div className="col-md-6 mb-3">

                          <label className="form-label">
                            Added By
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            name="procedures_addedBy"
                            value={proceduresData.procedures_addedBy}
                            onChange={handleProcedureInput}
                            placeholder="Enter User Name"
                          />

                        </div>

                      </div>

                      <hr />

                      <div className="text-end mt-4">

                        <button
                          type="button"
                          className="btn btn-secondary me-2"
                          onClick={() => navigate("/list-procedures")}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          {id ? "Update Procedure" : "Add Procedure"}
                        </button>

                      </div>

                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ManageProcedures;
