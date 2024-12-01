import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddHeader() {
  const { id } = useParams();
  const { authorizationToken, API } = useAuth();
  const navigate = useNavigate();
  const URL = `${API}/api/adminv4/header`;

  const [headerData, setHeaderData] = useState({
    page: "",
    tagdata: "",
    status: true,
  });

  useEffect(() => {
    if (id) {
      fetchHeaderData();
    }
  }, [id]);

  const fetchHeaderData = async () => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const { header } = await response.json();
        setHeaderData(header);
      } else {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch header data");
    }
  };

  const handleHeaderInput = (e) => {
    const { name, value } = e.target;
    setHeaderData({
      ...headerData,
      [name]: value,
    });
  };

  const addHeader = async () => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(headerData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.success(message);
        resetForm();
        navigate("/manage-header");
      } else {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add header");
    }
  };

  const updateHeader = async () => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(headerData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.success(message);
        resetForm();
        navigate("/manage-header");
      } else {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update header");
    }
  };

  const submitHeader = async (e) => {
    e.preventDefault();
    id ? updateHeader() : addHeader();
  };

  const resetForm = () => {
    setHeaderData({
      page: "",
      tagdata: "",
      status: true,
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
                    {id ? "Update Header" : "Add Header"}
                    <Link to="/manage-header" className="btn btn-light ss">
                      View Header
                    </Link>
                  </h2>
                  <form onSubmit={submitHeader}>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="page" className="form-label">
                          Header's page
                        </label>
                        <select
                          name="page"
                          id="page"
                          value={headerData.page}
                          onChange={handleHeaderInput}
                          className="form-control"
                          required
                        >
                          <option value="">Select Page Name</option>
                          <option value="home">Home</option>
                          <option value="about">About</option>
                          <option value="specialities">Specialities</option>
                          <option value="doctors">Doctors</option>
                          <option value="services">Services</option>
                          <option value="contact">Contact</option>
                          <option value="blog">Blog</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="tagdata" className="form-label">
                          Header's Tag Data
                        </label>
                        <textarea
                          name="tagdata"
                          autoComplete="off"
                          value={headerData.tagdata}
                          onChange={handleHeaderInput}
                          id="tagdata"
                          rows="9"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="status" className="form-label">
                          Header's Status
                        </label>
                        <select
                          name="status"
                          value={headerData.status}
                          onChange={handleHeaderInput}
                          id="status"
                          className="form-select"
                        >
                          <option value={true}>Active</option>
                          <option value={false}>Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <button type="submit" className="btn btn-primary w-100">
                          {id ? "Update Header" : "Add Header"}
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

export default AddHeader;
