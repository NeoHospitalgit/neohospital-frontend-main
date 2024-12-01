import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddSeoPages() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { authorizationToken, API } = useAuth();
  const URL = `${API}/api/adminv8/seopages`;

  const [seoPagesData, setSeoPagesData] = useState({
    pageurl: "",
    seotags: "",
    status: true,
  });

  useEffect(() => {
    if (id) {
      fetchSeoPagesData();
    }
  }, [id]);

  const fetchSeoPagesData = async () => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const { seopages } = await response.json();
        setSeoPagesData(seopages);
        console.log(seopages);
      } else {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch SeoPages data");
    }
  };

  const handleSeoPagesInput = (e) => {
    const { name, value } = e.target;
    const modifiedValue =
      name === "pageurl"
        ? value
            .toLowerCase()
            .replace(/[^\w\s]/gi, "-")
            .replace(/\s+/g, "-")
        : value;

    setSeoPagesData({
      ...seoPagesData,
      [name]: modifiedValue,
    });
  };

  const submitSeoPages = async (e) => {
    e.preventDefault();
    try {
      const response = id
        ? await fetch(`${URL}/${id}`, {
            method: "PUT",
            headers: {
              Authorization: authorizationToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(seoPagesData),
          })
        : await fetch(URL, {
            method: "POST",
            headers: {
              Authorization: authorizationToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(seoPagesData),
          });

      if (response.ok) {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.success(message);
        resetForm();
        navigate("/manage-seopages");
      } else {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error(id ? "Failed to update SeoPages" : "Failed to add SeoPages");
    }
  };

  const resetForm = () => {
    setSeoPagesData({
      pageurl: "",
      seotags: "",
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
                    {id ? "Update SeoPages" : "Add SeoPages"}
                    <Link to="/manage-SeoPages" className="btn btn-light ss">
                      View SeoPages
                    </Link>
                  </h2>
                  <form onSubmit={submitSeoPages}>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="pageurl" className="form-label">
                          Seo Pages URL
                        </label>
                        <input
                          name="pageurl"
                          autoComplete="off"
                          value={seoPagesData.pageurl}
                          onChange={handleSeoPagesInput}
                          id="pageurl"
                          required
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="status" className="form-label">
                          Seo Pages Status
                        </label>
                        <select
                          name="status"
                          value={seoPagesData.status}
                          onChange={handleSeoPagesInput}
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
                        <label htmlFor="seotags" className="form-label">
                          Seo Pages Tags
                        </label>
                        <textarea
                          name="seotags"
                          autoComplete="off"
                          value={seoPagesData.seotags}
                          onChange={handleSeoPagesInput}
                          id="seotags"
                          rows="9"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <button type="submit" className="btn btn-primary w-100">
                          {id ? "Update SeoPages" : "Add SeoPages"}
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

export default AddSeoPages;
