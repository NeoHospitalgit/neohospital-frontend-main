import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import List from "./List";

function AddBioMedicalReport() {
  const { id } = useParams();
  const { authorizationToken, API } = useAuth();
  const navigate = useNavigate();

  // ✅ Correct API
  const URL = `${API}/api/adminv10/add-bio-medical-report`;

  const [formData, setFormData] = useState({
    reporttitle: "",
    hospital: "",
    image: null,
  });

  // ================= FETCH =================
  useEffect(() => {
    if (id) fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const res = await fetch(`${URL}/${id}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();

      // ✅ FIX: correct key (biomedical)
      setFormData({
        reporttitle: data.biomedical?.reporttitle || "",
        hospital: data.biomedical?.hospital || "",
        image: data.biomedical?.image || null,
      });
    } catch (err) {
      console.error("FETCH ERROR:", err);
      toast.error("Failed to fetch report");
    }
  };

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= FILE =================
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image" && !(value instanceof File)) return;
        sendData.append(key, value);
      });

      const res = await fetch(id ? `${URL}/${id}` : URL, {
        method: id ? "PUT" : "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: sendData,
      });

      if (!res.ok) throw new Error("Submit failed");

      toast.success(id ? "Report updated" : "Report added");

      resetForm();
      navigate("/manage-medical-report");
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
      toast.error("Something went wrong");
    }
  };

  // ================= RESET =================
  const resetForm = () => {
    setFormData({
      reporttitle: "",
      hospital: "",
      image: null,
    });
  };

  return (
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
                  {id ? "Edit Report" : "Add Report"}
                  <Link to="/manage-medical-report" className="btn btn-light ms-3">
                    View Reports
                  </Link>
                </h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data">

                  {/* TITLE + HOSPITAL */}
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <label className="form-label">Report Title</label>
                      <input
                        type="text"
                        name="reporttitle"
                        value={formData.reporttitle}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Report Title"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Hospital Name</label>
                      <input
                        type="text"
                        name="hospital"
                        value={formData.hospital}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Hospital Name"
                        required
                      />
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <label className="form-label">Report Image</label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="form-control"
                      />

                      {/* ✅ FIXED IMAGE PATH */}
                      {id && formData.image && typeof formData.image === "string" && (
                        <img
                          src={`${API}/uploads/report/${formData.image}`}
                          width="200"
                          alt="preview"
                          className="mt-2"
                        />
                      )}
                    </div>
                  </div>

                  {/* SUBMIT */}
                  <div className="row mt-4">
                    <div className="col-md-12 text-center">
                      <button className="btn btn-primary w-100">
                        {id ? "Update Report" : "Add Report"}
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
  );
}

export default AddBioMedicalReport;