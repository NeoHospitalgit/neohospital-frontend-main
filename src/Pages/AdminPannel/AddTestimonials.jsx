import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddTestimonials() {
  const { id } = useParams();
  const { authorizationToken, API } = useAuth();
  const navigate = useNavigate();
  const URL = `${API}/api/adminv7/testimonials`;

  const [TestimonialsData, setTestimonialsData] = useState({
    text: "",
    testurl: "",
    author: "",
    status: true,
  });

  useEffect(() => {
    if (id) {
      fetchTestimonialsData();
    }
  }, [id]);

  const fetchTestimonialsData = async () => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const { Testimonials } = await response.json();
        setTestimonialsData(Testimonials);
      } else {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Testimonials data");
    }
  };

  const handleTestimonialsInput = (e) => {
    const { name, value } = e.target;
    setTestimonialsData({
      ...TestimonialsData,
      [name]: value,
    });
  };

  const addTestimonials = async () => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(TestimonialsData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.success(message);
        resetForm();
        navigate("/manage-testimonials");
      } else {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add Testimonials");
    }
  };

  const updateTestimonials = async () => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(TestimonialsData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.success(message);
        resetForm();
        navigate("/manage-testimonials");
      } else {
        const jsonResponse = await response.json();
        const message = jsonResponse.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Testimonials");
    }
  };

  const submitTestimonials = async (e) => {
    e.preventDefault();
    id ? updateTestimonials() : addTestimonials();
  };

  const resetForm = () => {
    setTestimonialsData({
      text: "",
      testurl: "",
      author: "",
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
                    {id ? "Update Testimonials" : "Add Testimonials"}
                    <Link
                      to="/manage-Testimonials"
                      className="btn btn-light ss"
                    >
                      View Testimonials
                    </Link>
                  </h2>
                  <form onSubmit={submitTestimonials}>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="text" className="form-label">
                          Testimonial's Text
                        </label>
                        <textarea
                          name="text"
                          autoComplete="off"
                          value={TestimonialsData.text}
                          onChange={handleTestimonialsInput}
                          id="text"
                          rows="3"
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="testurl" className="form-label">
                          Testimonials's URL
                        </label>
                        <textarea
                          name="testurl"
                          autoComplete="off"
                          value={TestimonialsData.testurl}
                          onChange={handleTestimonialsInput}
                          id="testurl"
                          rows="3"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="author" className="form-label">
                          Testimonial's Author
                        </label>
                        <input
                          name="author"
                          autoComplete="off"
                          value={TestimonialsData.author}
                          onChange={handleTestimonialsInput}
                          id="author"
                          required
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="status" className="form-label">
                          Testimonial's Status
                        </label>
                        <select
                          name="status"
                          value={TestimonialsData.status}
                          onChange={handleTestimonialsInput}
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
                          {id ? "Update Testimonials" : "Add Testimonials"}
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

export default AddTestimonials;
