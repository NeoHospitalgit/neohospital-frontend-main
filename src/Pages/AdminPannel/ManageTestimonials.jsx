import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function ManageTestimonials() {
  const [viewTestimonialsData, setViewTestimonialsData] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getViewTestimonialsData = async () => {
    try {
      const response = await fetch(`${API}/api/adminv7/view-testimonials`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setViewTestimonialsData(data.Testimonials);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTestimonialById = async (id) => {
    try {
      const response = await fetch(`${API}/api/adminv7/testimonials/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getViewTestimonialsData();
        toast.success("testimonials deleted successfully");
      } else {
        toast.error("Failed to delete testimonials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getViewTestimonialsData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you want to delete ?")) {
      deleteTestimonialById(id);
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
                    Manage Header
                    {/* <Link to="/add-Header" className="btn btn-light ss">
                      Add Header
                    </Link> */}
                  </h2>
                  <table className="table table-dark">
                    <thead>
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">Author Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewTestimonialsData.map((Testimonials, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{Testimonials.author}</td>
                          <td
                            style={{
                              color: Testimonials.status ? "green" : "red",
                              paddingTop: 20,
                            }}
                          >
                            {Testimonials.status ? "Active" : "Deactive"}
                          </td>
                          <td className="updatebtn">
                            <Link to={`/add-testimonials/${Testimonials._id}`}>
                              <i className="fa fa-edit text-light"></i>
                            </Link>
                          </td>
                          <td className="deletebtn">
                            <button
                              className="btn"
                              onClick={() => handleDelete(Testimonials._id)}
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

export default ManageTestimonials;
