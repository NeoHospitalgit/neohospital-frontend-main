import React, { useEffect, useState } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function ManageFAQ() {
  const [viewFAQData, setViewFAQData] = useState([]);

  const { authorizationToken, API } = useAuth();

  const getViewFAQData = async () => {
    try {
      const response = await fetch(
        `${API}/api/adminv13/view-faqs`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setViewFAQData(data.faqs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch FAQs");
    }
  };

  const deleteFAQById = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/adminv13/faqs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        getViewFAQData();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete FAQ");
    }
  };

  useEffect(() => {
    getViewFAQData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you want to delete this FAQ?")) {
      deleteFAQById(id);
    }
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
                    Manage FAQs

                    <Link
                      to="/add-faq"
                      className="btn btn-light ss"
                    >
                      Add FAQ
                    </Link>
                  </h2>

                  <table className="table table-dark">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Question</th>
                        <th scope="col">Sort Order</th>
                        <th scope="col">Status</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>

                    <tbody>
                      {viewFAQData.map((faq, index) => (
                        <tr key={faq._id}>
                          <td>{index + 1}</td>

                          <td>{faq.question}</td>

                          <td>{faq.sortOrder}</td>

                          <td
                            style={{
                              color: faq.status
                                ? "green"
                                : "red",
                              paddingTop: 20,
                            }}
                          >
                            {faq.status
                              ? "Active"
                              : "Deactive"}
                          </td>

                          <td className="updatebtn">
                            <Link
                              to={`/add-faq/${faq._id}`}
                            >
                              <i className="fa fa-edit text-light"></i>
                            </Link>
                          </td>

                          <td className="deletebtn">
                            <button
                              className="btn"
                              onClick={() =>
                                handleDelete(faq._id)
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ManageFAQ;