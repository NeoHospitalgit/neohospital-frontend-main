import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function AddFAQ() {
  const { id } = useParams();
  const { authorizationToken, API } = useAuth();
  const navigate = useNavigate();

  const URL = `${API}/api/adminv13/faqs`;

  const [faqData, setFaqData] = useState({
    question: "",
    answer: "",
    status: true,
    sortOrder: 0,
  });

  useEffect(() => {
    if (id) {
      fetchFAQData();
    }
  }, [id]);

  const fetchFAQData = async () => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setFaqData(data.faq);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch FAQ data");
    }
  };

  const handleFAQInput = (e) => {
    const { name, value } = e.target;

    setFaqData({
      ...faqData,
      [name]:
        name === "status"
          ? value === "true"
          : name === "sortOrder"
          ? Number(value)
          : value,
    });
  };

  const addFAQ = async () => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faqData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        resetForm();
        navigate("/manage-faq");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add FAQ");
    }
  };

  const updateFAQ = async () => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faqData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        resetForm();
        navigate("/manage-faq");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update FAQ");
    }
  };

  const submitFAQ = async (e) => {
    e.preventDefault();

    if (!faqData.question.trim()) {
      toast.error("Please enter FAQ question");
      return;
    }

    if (!faqData.answer.trim()) {
      toast.error("Please enter FAQ answer");
      return;
    }

    if (id) {
      await updateFAQ();
    } else {
      await addFAQ();
    }
  };

  const resetForm = () => {
    setFaqData({
      question: "",
      answer: "",
      status: true,
      sortOrder: 0,
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
                    {id ? "Update FAQ" : "Add FAQ"}

                    <Link
                      to="/manage-faq"
                      className="btn btn-light ss"
                    >
                      View FAQs
                    </Link>
                  </h2>

                  <form onSubmit={submitFAQ}>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <label
                          htmlFor="question"
                          className="form-label"
                        >
                          FAQ Question
                        </label>

                        <input
                          type="text"
                          name="question"
                          id="question"
                          autoComplete="off"
                          value={faqData.question}
                          onChange={handleFAQInput}
                          className="form-control"
                          placeholder="Enter FAQ question"
                          required
                        />
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-md-12">
                        <label
                          htmlFor="answer"
                          className="form-label"
                        >
                          FAQ Answer
                        </label>

                        <textarea
                          name="answer"
                          id="answer"
                          rows="6"
                          autoComplete="off"
                          value={faqData.answer}
                          onChange={handleFAQInput}
                          className="form-control"
                          placeholder="Enter FAQ answer"
                          required
                        />
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-md-6">
                        <label
                          htmlFor="sortOrder"
                          className="form-label"
                        >
                          Sort Order
                        </label>

                        <input
                          type="number"
                          name="sortOrder"
                          id="sortOrder"
                          value={faqData.sortOrder}
                          onChange={handleFAQInput}
                          className="form-control"
                          min="0"
                        />
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="status"
                          className="form-label"
                        >
                          FAQ Status
                        </label>

                        <select
                          name="status"
                          id="status"
                          value={faqData.status}
                          onChange={handleFAQInput}
                          className="form-select"
                        >
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-md-12">
                        <button
                          type="submit"
                          className="btn btn-primary w-100"
                        >
                          {id ? "Update FAQ" : "Add FAQ"}
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

export default AddFAQ;