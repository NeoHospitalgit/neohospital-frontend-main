import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

function ManageKeywords() {
  const formatDate = (dateString) => {
    const keywordDate = new Date(dateString).toISOString().split("T")[0];
    return `${keywordDate}`;
  };

  const { id } = useParams();
  const { authorizationToken, API } = useAuth();
  const navigate = useNavigate();
const API_URL = `${API}/api/adminv11/keywords`;

  const [keywordData, setKeywordData] = useState({
    // =========================
    // Basic Information
    // =========================
    keyword_title: "",
    keyword_slug: "",
    keyword_description: "",

    // =========================
    // Welcome Section
    // =========================
    welcome_title: "",
    welcome_content: "",

    // =========================
    // Can Help Section
    // =========================
    can_help: "",
    can_help_content: "",

    // =========================
    // Team Section
    // =========================
    team_title: "",
    team_content: "",

    // =========================
    // Expert Section
    // =========================
    expert_title: "",
    expert_content: "",

    // =========================
    // Category Section
    // =========================
    cat_title: "",
    cat_content: "",

    // =========================
    // Department & Doctors
    // =========================
    department: "",
    doctors: [],

    // =========================
    // Banner
    // =========================
    banner_image: null,
    banner_imageALT: "",

    // =========================
    // Main Content
    // =========================
    keyword_content: "",

    // =========================
    // FAQ
    // =========================
    faq: [
      {
        question: "",
        answer: "",
      },
    ],

    // =========================
    // SEO
    // =========================
    seo_title: "",
    meta_description: "",
    focus_keyword: "",
    schema_markup: "",

    // =========================
    // Status
    // =========================
    keyword_addedBy: "",
    keyword_status: true,
  });
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    fetchDepartments();

    if (id) {
      fetchKeywordData();
    }
  }, [id]);

  const fetchKeywordData = async () => {
    try {
      const response = await fetch(
        `${API}/api/adminv11/keywords/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        const keyword = result.data;

        const departmentId =
          keyword.department?._id || keyword.department;

        // Edit mode me doctors load karo
        if (departmentId) {
          await fetchDoctors(departmentId);
        }

        setKeywordData({
          // =========================
          // Basic Information
          // =========================
          keyword_title: keyword.keyword_title || "",
          keyword_slug: keyword.keyword_slug || "",
          keyword_description: keyword.keyword_description || "",

          // =========================
          // Welcome Section
          // =========================
          welcome_title: keyword.welcome_title || "",
          welcome_content: keyword.welcome_content || "",

          // =========================
          // Can Help Section
          // =========================
          can_help: keyword.can_help || "",
          can_help_content: keyword.can_help_content || "",

          // =========================
          // Team Section
          // =========================
          team_title: keyword.team_title || "",
          team_content: keyword.team_content || "",

          // =========================
          // Expert Section
          // =========================
          expert_title: keyword.expert_title || "",
          expert_content: keyword.expert_content || "",

          // =========================
          // Category Section
          // =========================
          cat_title: keyword.cat_title || "",
          cat_content: keyword.cat_content || "",

          // =========================
          // Department
          // =========================
          department: departmentId || "",

          // =========================
          // Doctors
          // =========================
          doctors:
            keyword.doctors?.map((doctor) => doctor._id) || [],

          // =========================
          // Banner
          // =========================
          banner_image: keyword.banner_image || null,
          banner_imageALT: keyword.banner_imageALT || "",

          // =========================
          // Main Content
          // =========================
          keyword_content: keyword.keyword_content || "",

          // =========================
          // FAQ
          // =========================
          faq:
            keyword.faq && keyword.faq.length > 0
              ? keyword.faq
              : [
                  {
                    question: "",
                    answer: "",
                  },
                ],

          // =========================
          // SEO
          // =========================
          seo_title: keyword.seo_title || "",
          meta_description: keyword.meta_description || "",
          focus_keyword: keyword.focus_keyword || "",
          schema_markup: keyword.schema_markup || "",

          // =========================
          // Status
          // =========================
          keyword_addedBy: keyword.keyword_addedBy || "",
          keyword_status:
            keyword.keyword_status !== undefined
              ? keyword.keyword_status
              : true,
        });
      } else {
        const jsonResponse = await response.json();
        toast.error(jsonResponse.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch keyword");
    }
  };
  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${API}/api/adminv1/view-category`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setDepartments(data.category || []);
      } else {
        toast.error(data.message || "Department not found");
      }
    } catch (error) {
      console.error("Fetch Department Error:", error);
      toast.error("Failed to fetch departments");
    }
  };
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

    const data = await response.json();

    if (response.ok) {
      setDoctors(data.doctors);
    } else {
      setDoctors([]);
    }
  } catch (error) {
    console.log(error);
    setDoctors([]);
  }
  };
const handleKeywordInput = (e) => {
  const { name, value } = e.target;

  const transformedValue =
    name === "keyword_status"
      ? value === "true"
      : value;

  const modifiedValue =
    name === "keyword_slug"
      ? value
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-")
      : transformedValue;

  setKeywordData((prev) => ({
    ...prev,
    [name]: modifiedValue,
  }));

  // Auto Generate Slug
  if (name === "keyword_title") {
    setKeywordData((prev) => ({
      ...prev,
      keyword_title: value,
      keyword_slug: value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-"),
    }));
  }

  // Department Change
  if (name === "department") {
    fetchDoctors(value);

    setKeywordData((prev) => ({
      ...prev,
      department: value,
      doctors: [],
    }));
  }
};

const handleDoctorsChange = (e) => {
  const values = [...e.target.selectedOptions].map(
    (option) => option.value
  );

  setKeywordData({
    ...keywordData,
    doctors: values,
  });
};
const handleFileChange = (e) => {
  setKeywordData({
    ...keywordData,
    banner_image: e.target.files[0],
  });
};
const handleFaqChange = (index, field, value) => {
  const updatedFaq = [...keywordData.faq];
  updatedFaq[index][field] = value;

  setKeywordData({
    ...keywordData,
    faq: updatedFaq,
  });
};
const addFaq = () => {
  setKeywordData({
    ...keywordData,
    faq: [
      ...keywordData.faq,
      {
        question: "",
        answer: "",
      },
    ],
  });
};
const removeFaq = (index) => {
  const updatedFaq = [...keywordData.faq];
  updatedFaq.splice(index, 1);

  setKeywordData({
    ...keywordData,
    faq: updatedFaq,
  });
};
  const handleQualificationChange = (newContent) => {
    setKeywordData({
      ...keywordData,
      keyword_content: newContent,
    });
  };

const addKeyword = async () => {
  try {
    const formData = new FormData();

    // =========================
    // Basic Information
    // =========================
    formData.append("keyword_title", keywordData.keyword_title);
    formData.append("keyword_slug", keywordData.keyword_slug);
    formData.append("keyword_description", keywordData.keyword_description);

    // =========================
    // Welcome Section
    // =========================
    formData.append("welcome_title", keywordData.welcome_title);
    formData.append("welcome_content", keywordData.welcome_content);

    // =========================
    // Can Help Section
    // =========================
    formData.append("can_help", keywordData.can_help);
    formData.append("can_help_content", keywordData.can_help_content);

    // =========================
    // Team Section
    // =========================
    formData.append("team_title", keywordData.team_title);
    formData.append("team_content", keywordData.team_content);

    // =========================
    // Expert Section
    // =========================
    formData.append("expert_title", keywordData.expert_title);
    formData.append("expert_content", keywordData.expert_content);

    // =========================
    // Category Section
    // =========================
    formData.append("cat_title", keywordData.cat_title);
    formData.append("cat_content", keywordData.cat_content);

    // =========================
    // Department & Doctors
    // =========================
    formData.append("department", keywordData.department);
    formData.append("doctors", JSON.stringify(keywordData.doctors));

    // =========================
    // Banner
    // =========================
    if (keywordData.banner_image) {
      formData.append("banner_image", keywordData.banner_image);
    }

    formData.append("banner_imageALT", keywordData.banner_imageALT);

    // =========================
    // Main Content
    // =========================
    formData.append("keyword_content", keywordData.keyword_content);

    // =========================
    // FAQ
    // =========================
    formData.append("faq", JSON.stringify(keywordData.faq));

    // =========================
    // SEO
    // =========================
    formData.append("seo_title", keywordData.seo_title);
    formData.append("meta_description", keywordData.meta_description);
    formData.append("focus_keyword", keywordData.focus_keyword);
    formData.append("schema_markup", keywordData.schema_markup);

    // =========================
    // Status
    // =========================
    formData.append("keyword_addedBy", keywordData.keyword_addedBy);
    formData.append("keyword_status", keywordData.keyword_status);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
      },
      body: formData,
    });

    const jsonResponse = await response.json();

    if (response.ok) {
      toast.success(jsonResponse.message);
      resetForm();
      navigate("/list-keywords");
    } else {
      toast.error(jsonResponse.message);
    }
  } catch (error) {
    console.error("Add Keyword Error:", error);
    toast.error("Failed to add keyword");
  }
};

const resetForm = () => {
  setKeywordData({
    // =========================
    // Basic Information
    // =========================
    keyword_title: "",
    keyword_slug: "",
    keyword_description: "",

    // =========================
    // Welcome Section
    // =========================
    welcome_title: "",
    welcome_content: "",

    // =========================
    // Can Help Section
    // =========================
    can_help: "",
    can_help_content: "",

    // =========================
    // Team Section
    // =========================
    team_title: "",
    team_content: "",

    // =========================
    // Expert Section
    // =========================
    expert_title: "",
    expert_content: "",

    // =========================
    // Category Section
    // =========================
    cat_title: "",
    cat_content: "",

    // =========================
    // Department & Doctors
    // =========================
    department: "",
    doctors: [],

    // =========================
    // Banner
    // =========================
    banner_image: null,
    banner_imageALT: "",

    // =========================
    // Main Content
    // =========================
    keyword_content: "",

    // =========================
    // FAQ
    // =========================
    faq: [
      {
        question: "",
        answer: "",
      },
    ],

    // =========================
    // SEO
    // =========================
    seo_title: "",
    meta_description: "",
    focus_keyword: "",
    schema_markup: "",

    // =========================
    // Status
    // =========================
    keyword_addedBy: "",
    keyword_status: true,
  });
};
const updateKeyword = async () => {
  try {
    const formData = new FormData();

    // =========================
    // Basic Information
    // =========================
    formData.append("keyword_title", keywordData.keyword_title);
    formData.append("keyword_slug", keywordData.keyword_slug);
    formData.append("keyword_description", keywordData.keyword_description);

    // =========================
    // Welcome Section
    // =========================
    formData.append("welcome_title", keywordData.welcome_title);
    formData.append("welcome_content", keywordData.welcome_content);

    // =========================
    // Can Help Section
    // =========================
    formData.append("can_help", keywordData.can_help);
    formData.append("can_help_content", keywordData.can_help_content);

    // =========================
    // Team Section
    // =========================
    formData.append("team_title", keywordData.team_title);
    formData.append("team_content", keywordData.team_content);

    // =========================
    // Expert Section
    // =========================
    formData.append("expert_title", keywordData.expert_title);
    formData.append("expert_content", keywordData.expert_content);

    // =========================
    // Category Section
    // =========================
    formData.append("cat_title", keywordData.cat_title);
    formData.append("cat_content", keywordData.cat_content);

    // =========================
    // Department & Doctors
    // =========================
    formData.append("department", keywordData.department);
    formData.append("doctors", JSON.stringify(keywordData.doctors));

    // =========================
    // Banner
    // =========================
    if (keywordData.banner_image instanceof File) {
      formData.append("banner_image", keywordData.banner_image);
    }

    formData.append("banner_imageALT", keywordData.banner_imageALT);

    // =========================
    // Main Content
    // =========================
    formData.append("keyword_content", keywordData.keyword_content);

    // =========================
    // FAQ
    // =========================
    formData.append("faq", JSON.stringify(keywordData.faq));

    // =========================
    // SEO
    // =========================
    formData.append("seo_title", keywordData.seo_title);
    formData.append("meta_description", keywordData.meta_description);
    formData.append("focus_keyword", keywordData.focus_keyword);
    formData.append("schema_markup", keywordData.schema_markup);

    // =========================
    // Status
    // =========================
    formData.append("keyword_addedBy", keywordData.keyword_addedBy);
    formData.append("keyword_status", keywordData.keyword_status);

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: authorizationToken,
      },
      body: formData,
    });

    const jsonResponse = await response.json();

    if (response.ok) {
      toast.success(jsonResponse.message);
      resetForm();
      navigate("/list-keywords");
    } else {
      toast.error(jsonResponse.message);
    }
  } catch (error) {
    console.error("Update Keyword Error:", error);
    toast.error("Failed to update keyword");
  }
};

const handleKeyword = (e) => {
  e.preventDefault();
  id ? updateKeyword() : addKeyword();
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
                    <h2>Add Keyword</h2>
                    <form onSubmit={handleKeyword} encType="multipart/form-data">
                      {/* Basic Information */}
                     {/* ===================== Basic Information ===================== */}
                        <h5 className="mb-3 border-bottom pb-2">Basic Information</h5>

                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Keyword Title</label>
                            <input
                              type="text"
                              className="form-control"
                              name="keyword_title"
                              value={keywordData.keyword_title}
                              onChange={handleKeywordInput}
                              placeholder="Enter Keyword Title"
                            />
                          </div>

                          <div className="col-md-6 mb-3">
                            <label className="form-label">Keyword Slug</label>
                            <input
                              type="text"
                              className="form-control"
                              name="keyword_slug"
                              value={keywordData.keyword_slug}
                              onChange={handleKeywordInput}
                              placeholder="Enter Keyword Slug"
                            />
                          </div>

                          <div className="col-md-12 mb-3">
                            <label className="form-label">Short Description</label>
                            <textarea
                              className="form-control"
                              rows="3"
                              name="keyword_description"
                              value={keywordData.keyword_description}
                              onChange={handleKeywordInput}
                              placeholder="Short Description"
                            />
                          </div>
                        </div>


                        {/* ===================== Banner ===================== */}

                        <h5 className="mb-3 mt-4 border-bottom pb-2">
                          Banner
                        </h5>

                        <div className="row">

                          <div className="col-md-6 mb-3">

                            <label className="form-label">
                              Banner Image
                            </label>

                            <input
                              type="file"
                              className="form-control"
                              name="banner_image"
                              accept=".jpg,.jpeg,.png,.webp"
                              onChange={handleFileChange}
                            />

                            {id && keywordData.banner_image && (
                              <div className="mt-2">
                                <img
                                  src={
                                  keywordData.banner_image instanceof File
                                    ? URL.createObjectURL(keywordData.banner_image)
                                    : `${API}/uploads/blogs/${keywordData.banner_image}`
                                }
                                  alt="Banner"
                                  width="200"
                                  className="img-thumbnail"
                                />
                              </div>
                            )}

                          </div>

                          <div className="col-md-6 mb-3">

                            <label className="form-label">
                              Banner Image ALT
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              name="banner_imageALT"
                              value={keywordData.banner_imageALT}
                              onChange={handleKeywordInput}
                              placeholder="Enter Banner Image ALT"
                            />

                          </div>

                        </div>

                        {/* ===================== Welcome Section ===================== */}

                        <h5 className="mb-3 mt-4 border-bottom pb-2">
                          Welcome Section
                        </h5>

                        <div className="row">

                          <div className="col-md-12 mb-3">
                            <label className="form-label">Welcome Title</label>
                            <input
                              type="text"
                              className="form-control"
                              name="welcome_title"
                              value={keywordData.welcome_title}
                              onChange={handleKeywordInput}
                              placeholder="Enter Welcome Title"
                            />
                          </div>

                          <div className="col-md-12 mb-3">
                            <label className="form-label">Welcome Content</label>

                            <JoditEditor
                              value={keywordData.welcome_content}
                              onChange={(value) =>
                                setKeywordData({
                                  ...keywordData,
                                  welcome_content: value,
                                })
                              }
                            />
                          </div>

                        </div>

                        {/* ===================== Can Help Section ===================== */}

                        <h5 className="mb-3 mt-4 border-bottom pb-2">
                          Can Help Section
                        </h5>

                        <div className="row">

                          <div className="col-md-12 mb-3">
                            <label className="form-label">Can Help Title</label>
                            <input
                              type="text"
                              className="form-control"
                              name="can_help"
                              value={keywordData.can_help}
                              onChange={handleKeywordInput}
                              placeholder="Enter Can Help Title"
                            />
                          </div>

                          <div className="col-md-12 mb-3">
                            <label className="form-label">Can Help Content</label>

                            <JoditEditor
                              value={keywordData.can_help_content}
                              onChange={(value) =>
                                setKeywordData({
                                  ...keywordData,
                                  can_help_content: value,
                                })
                              }
                            />
                          </div>

                        </div>

                        {/* ===================== Department ===================== */}

                        <h5 className="mb-3 mt-4 border-bottom pb-2">
                          Department & Doctors
                        </h5>

                        <div className="row">

                          <div className="col-md-6 mb-3">
                            <label className="form-label">Department</label>

                            <select
                              className="form-control"
                              name="department"
                              value={keywordData.department}
                              onChange={handleKeywordInput}
                            >
                              <option value="">Select Department</option>

                              {departments.map((item) => (
                                <option key={item._id} value={item._id}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-md-6 mb-3">
                            <label className="form-label">Doctors</label>

                            <select
                              multiple
                              className="form-control"
                              name="doctors"
                              value={keywordData.doctors}
                              onChange={handleDoctorsChange}
                            >
                              {doctors.map((item) => (
                                <option key={item._id} value={item._id}>
                                  {item.drTitle}
                                </option>
                              ))}
                            </select>
                          </div>

                        </div>

                       {/* ===================== Team Section ===================== */}

<h5 className="mb-3 mt-4 border-bottom pb-2">
  Team Section
</h5>

<div className="row">

  <div className="col-md-12 mb-3">
    <label className="form-label">Team Title</label>

    <input
      type="text"
      className="form-control"
      name="team_title"
      value={keywordData.team_title}
      onChange={handleKeywordInput}
      placeholder="Enter Team Title"
    />
  </div>

  <div className="col-md-12 mb-3">
    <label className="form-label">Team Content</label>

    <JoditEditor
      value={keywordData.team_content}
      onChange={(value) =>
        setKeywordData({
          ...keywordData,
          team_content: value,
        })
      }
    />
  </div>

</div>

{/* ===================== Expert Section ===================== */}

<h5 className="mb-3 mt-4 border-bottom pb-2">
  Expert Section
</h5>

<div className="row">

  <div className="col-md-12 mb-3">
    <label className="form-label">Expert Title</label>

    <input
      type="text"
      className="form-control"
      name="expert_title"
      value={keywordData.expert_title}
      onChange={handleKeywordInput}
      placeholder="Enter Expert Title"
    />
  </div>

  <div className="col-md-12 mb-3">
    <label className="form-label">Expert Content</label>

    <JoditEditor
      value={keywordData.expert_content}
      onChange={(value) =>
        setKeywordData({
          ...keywordData,
          expert_content: value,
        })
      }
    />
  </div>

</div>

{/* ===================== Category Section ===================== */}

<h5 className="mb-3 mt-4 border-bottom pb-2">
  Category Section
</h5>

<div className="row">

  <div className="col-md-12 mb-3">
    <label className="form-label">Category Title</label>

    <input
      type="text"
      className="form-control"
      name="cat_title"
      value={keywordData.cat_title}
      onChange={handleKeywordInput}
      placeholder="Enter Category Title"
    />
  </div>

  <div className="col-md-12 mb-3">
    <label className="form-label">Category Content</label>

    <JoditEditor
      value={keywordData.cat_content}
      onChange={(value) =>
        setKeywordData({
          ...keywordData,
          cat_content: value,
        })
      }
    />
  </div>

</div>

{/* ===================== Main Page Content ===================== */}

<h5 className="mb-3 mt-4 border-bottom pb-2">
  Main Page Content
</h5>

<div className="mb-4">

  <JoditEditor
    value={keywordData.keyword_content}
    onChange={(value) =>
      setKeywordData({
        ...keywordData,
        keyword_content: value,
      })
    }
  />

</div>
{/* ===================== SEO Details ===================== */}

<h5 className="mb-3 mt-4 border-bottom pb-2">
  SEO Details
</h5>

<div className="row">

  <div className="col-md-12 mb-3">
    <label className="form-label">SEO Title</label>

    <input
      type="text"
      className="form-control"
      name="seo_title"
      value={keywordData.seo_title}
      onChange={handleKeywordInput}
      placeholder="Enter SEO Title"
    />
  </div>

  <div className="col-md-12 mb-3">
    <label className="form-label">Meta Description</label>

    <textarea
      rows="4"
      className="form-control"
      name="meta_description"
      value={keywordData.meta_description}
      onChange={handleKeywordInput}
      placeholder="Enter Meta Description"
    />
  </div>

  <div className="col-md-6 mb-3">
    <label className="form-label">Focus Keyword</label>

    <input
      type="text"
      className="form-control"
      name="focus_keyword"
      value={keywordData.focus_keyword}
      onChange={handleKeywordInput}
      placeholder="Enter Focus Keyword"
    />
  </div>

  <div className="col-md-6 mb-3">
    <label className="form-label">Schema Markup</label>

    <textarea
      rows="4"
      className="form-control"
      name="schema_markup"
      value={keywordData.schema_markup}
      onChange={handleKeywordInput}
      placeholder="Paste JSON-LD Schema Markup"
    />
  </div>

</div>

{/* ===================== FAQ ===================== */}

<h5 className="mb-3 mt-4 border-bottom pb-2">
  FAQ
</h5>

{keywordData.faq.map((item, index) => (
  <div className="card p-3 mb-3" key={index}>

    <div className="mb-3">
      <label className="form-label">
        Question {index + 1}
      </label>

      <input
        type="text"
        className="form-control"
        value={item.question}
        onChange={(e) =>
          handleFaqChange(index, "question", e.target.value)
        }
        placeholder="Enter FAQ Question"
      />
    </div>

    <div className="mb-3">
      <label className="form-label">
        Answer
      </label>

      <textarea
        rows="4"
        className="form-control"
        value={item.answer}
        onChange={(e) =>
          handleFaqChange(index, "answer", e.target.value)
        }
        placeholder="Enter FAQ Answer"
      />
    </div>

    <div className="d-flex gap-2">

      {keywordData.faq.length > 1 && (
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => removeFaq(index)}
        >
          Remove
        </button>
      )}

      {index === keywordData.faq.length - 1 && (
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={addFaq}
        >
          + Add FAQ
        </button>
      )}

    </div>

  </div>
))}

{/* ===================== Status ===================== */}

<h5 className="mb-3 mt-4 border-bottom pb-2">
  Settings
</h5>

<div className="row">

  <div className="col-md-6 mb-3">
    <label className="form-label">
      Status
    </label>

    <select
      className="form-control"
      name="keyword_status"
      value={keywordData.keyword_status}
      onChange={handleKeywordInput}
    >
      <option value={true}>Active</option>
      <option value={false}>Inactive</option>
    </select>
  </div>

  <div className="col-md-6 mb-3">
    <label className="form-label">
      Added By
    </label>

    <input
      type="text"
      className="form-control"
      name="keyword_addedBy"
      value={keywordData.keyword_addedBy}
      onChange={handleKeywordInput}
      placeholder="Enter User Name"
    />
  </div>

</div>

<div className="mt-4">

  <button
    type="submit"
    className="btn btn-primary w-100"
  >
    {id ? "Update Keyword" : "Add Keyword"}
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

export default ManageKeywords;
