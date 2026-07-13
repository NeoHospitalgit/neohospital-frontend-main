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
  const URL = `${API}/api/adminv11/keywords`;

  const [keywordData, setKeywordData] = useState({
    keyword_title: "",
    keyword_slug: "",
    keyword_description: "",

    department: "",
    doctors: [],

    banner_image: null,
    banner_imageALT: "",

    keyword_content: "",

    faq: [
      {
        question: "",
        answer: "",
      },
    ],

    seo_title: "",
    meta_description: "",
    focus_keyword: "",

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
     const departmentId = keyword.department?._id || keyword.department;

      // Edit mode me department ke doctors load karo
      if (departmentId) {
        await fetchDoctors(departmentId);
      }

      setKeywordData({
        keyword_title: keyword.keyword_title || "",
        keyword_slug: keyword.keyword_slug || "",
        keyword_description: keyword.keyword_description || "",

        // Department ID
        department: keyword.department?._id || keyword.department || "",

        // Doctors Array of IDs
        doctors:
          keyword.doctors?.map((doctor) => doctor._id) || [],

        banner_image: keyword.banner_image || null,
        banner_imageALT: keyword.banner_imageALT || "",

        keyword_content: keyword.keyword_content || "",

        faq: keyword.faq || [
          {
            question: "",
            answer: "",
          },
        ],

        seo_title: keyword.seo_title || "",
        meta_description: keyword.meta_description || "",
        focus_keyword: keyword.focus_keyword || "",

        keyword_addedBy: keyword.keyword_addedBy || "",

        keyword_status: keyword.keyword_status,
      });

    } else {
      const jsonResponse = await response.json();
      toast.error(jsonResponse.message);
    }
  } catch (error) {
    console.log(error);
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

    formData.append("keyword_title", keywordData.keyword_title);
    formData.append("keyword_slug", keywordData.keyword_slug);
    formData.append("keyword_description", keywordData.keyword_description);

    formData.append("department", keywordData.department);
    formData.append("doctors", JSON.stringify(keywordData.doctors));

    formData.append("banner_image", keywordData.banner_image);
    formData.append("banner_imageALT", keywordData.banner_imageALT);

    formData.append("keyword_content", keywordData.keyword_content);
    formData.append(
      "faq",
      JSON.stringify(keywordData.faq)
    );
    formData.append("seo_title", keywordData.seo_title);
    formData.append("meta_description", keywordData.meta_description);
    formData.append("focus_keyword", keywordData.focus_keyword);

    formData.append("keyword_addedBy", keywordData.keyword_addedBy);
    formData.append("keyword_status", keywordData.keyword_status);

    const response = await fetch(URL, {
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
    console.error(error);
    toast.error("Failed to add keyword");
  }
};

const resetForm = () => {
  setKeywordData({
    keyword_title: "",
    keyword_slug: "",
    keyword_description: "",

    department: "",
    doctors: [],

    banner_image: null,
    banner_imageALT: "",

    keyword_content: "",
    faq: [
          {
            question: "",
            answer: "",
          },
        ],

    seo_title: "",
    meta_description: "",
    focus_keyword: "",

    keyword_addedBy: "",
    keyword_status: true,
  });
};
  const updateKeyword = async () => {
  try {
    const formData = new FormData();

    formData.append("keyword_title", keywordData.keyword_title);
    formData.append("keyword_slug", keywordData.keyword_slug);
    formData.append("keyword_description", keywordData.keyword_description);

    formData.append("department", keywordData.department);
    formData.append("doctors", JSON.stringify(keywordData.doctors));

    formData.append("banner_image", keywordData.banner_image);
    formData.append("banner_imageALT", keywordData.banner_imageALT);

    formData.append("keyword_content", keywordData.keyword_content);

    formData.append(
      "faq",
      JSON.stringify(keywordData.faq)
    );
    formData.append("seo_title", keywordData.seo_title);
    formData.append("meta_description", keywordData.meta_description);
    formData.append("focus_keyword", keywordData.focus_keyword);

    formData.append("keyword_addedBy", keywordData.keyword_addedBy);
    formData.append("keyword_status", keywordData.keyword_status);

    const response = await fetch(`${URL}/${id}`, {
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
    console.error(error);
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
                          <label className="form-label">Slug</label>
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
                            placeholder="Short introduction about this page..."
                          />
                        </div>
                      </div>
                      {/* Department */}
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
                            placeholder="Department"
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

                        {/* Banner */}
                        <h5 className="mb-3 mt-4 border-bottom pb-2">
                          Banner
                        </h5>

                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Banner Image</label>
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
                                      typeof keywordData.banner_image === "string"
                                        ? `${API}/uploads/blogs/${keywordData.banner_image}`
                                        : URL.createObjectURL(keywordData.banner_image)
                                    }
                                    alt="Banner"
                                    width="180"
                                    className="img-thumbnail"
                                  />
                                </div>
                              )}
                          </div>

                          <div className="col-md-6 mb-3">
                            <label className="form-label">Image ALT</label>

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

                        {/* SEO */}
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
                            />
                          </div>

                          <div className="col-md-12 mb-3">
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
                        </div>
                    {/* FAQ */}
                    <h5 className="mb-3 mt-4 border-bottom pb-2">
                      FAQ
                    </h5>

                    {keywordData.faq.map((item, index) => (
                      <div className="card p-3 mb-3" key={index}>
                        <div className="row">
                          <div className="col-md-12 mb-3">
                            

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter FAQ Question"
                              value={item.question}
                              onChange={(e) =>
                                handleFaqChange(index, "question", e.target.value)
                              }
                            />
                          </div>

                          <div className="col-md-12 mb-3">
                      

                            <textarea
                              rows="4"
                              className="form-control"
                              placeholder="Enter FAQ Answer"
                              value={item.answer}
                              onChange={(e) =>
                                handleFaqChange(index, "answer", e.target.value)
                              }
                            />
                          </div>

                          <div className="col-md-12">
                            {keywordData.faq.length > 1 && (
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => removeFaq(index)}
                              >
                                Remove FAQ
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="btn btn-success mb-4"
                      onClick={addFaq}
                    >
                      + Add FAQ
                    </button>
                        {/* Content */}
                        <h5 className="mb-3 mt-4 border-bottom pb-2">
                          Page Content
                        </h5>

                                              <JoditEditor
                          value={keywordData.keyword_content}
                          onChange={handleQualificationChange}
                        />
                        {/* Status */}
                        <div className="row mt-4">
                          <div className="col-md-6">
                            <label className="form-label">Status</label>

                            <select
                              className="form-control"
                              name="keyword_status"
                              value={keywordData.keyword_status}
                              onChange={handleKeywordInput}
                            >
                             <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Added By</label>

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
                          <button className="btn btn-primary w-100">
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
