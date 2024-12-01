import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function ManageService() {
  const [viewService, setViewserviceData] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getViewService = async () => {
    try {
      const response = await fetch(`${API}/api/adminv6/manage-service`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setViewserviceData(data.services);
      } else if (response.status === 404) {
        setViewserviceData([]);
        toast.info("No Service found");
      } else {
        throw new Error("Failed to fetch Service data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Service data");
    }
  };

  const deletById = async (id) => {
    try {
      const response = await fetch(`${API}/api/adminv6/add-service/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getViewService();
        toast.success("Service deleted successfully");
      } else {
        throw new Error("Failed to delete Service");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete Service");
    }
  };

  useEffect(() => {
    getViewService();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deletById(id);
    }
  };

  return (
    <>
      <main>
        <TopBarAdmin />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 adminleft">
              <div>
                <List />
              </div>
            </div>
            <div className="col-md-9 adminright">
              <div className="addblog">
                <div className="addblogform">
                  <h2>Manage Service</h2>
                  {viewService.length ? (
                    <table className="table table-dark">
                      <thead>
                        <tr>
                          <th scope="col">id</th>
                          <th scope="col">Service Name</th>
                          <th scope="col">Category Name</th>
                          <th scope="col">Image</th>
                          <th scope="col">Status</th>
                          <th scope="col">Update</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewService.map((service, index) => (
                          <tr key={index}>
                            <td className="ptd">{index + 1}</td>
                            <td className="ptd">{service.serviceTitle}</td>
                            <td className="ptd">{service.serviceCat}</td>
                            <td>
                              <img
                                src={`${API}/uploads/Service/${service.image}`}
                                width="50px"
                                height="auto"
                                alt="Service Image"
                              />
                            </td>
                            <td
                              style={{
                                color: service.status ? "green" : "red",
                                paddingTop: 20,
                              }}
                            >
                              {service.status ? "Active" : "Deactive"}
                            </td>
                            <td className="updatebtn pbtn">
                              <Link to={`/add-service/${service._id}`}>
                                <i className="fa fa-edit text-light"></i>
                              </Link>
                            </td>
                            <td className="deletebtn pbtn">
                              <button
                                className="btn"
                                onClick={() => handleDelete(service._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <h3 className="text-danger text-center py-5">
                      No services found
                    </h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ManageService;
