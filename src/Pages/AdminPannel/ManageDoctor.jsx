import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function ManageDoctor() {
  const [viewDoctorsData, setViewDoctorsData] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getViewDoctorsData = async () => {
    try {
      const response = await fetch(`${API}/api/adminv2/view-doctors`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setViewDoctorsData(data.doctors);
      } else if (response.status === 404) {
        setViewDoctorsData([]);
        toast.info("No Doctor found");
      } else {
        throw new Error("Failed to fetch doctor data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch doctor data");
    }
  };

  useEffect(() => {
    getViewDoctorsData();
  }, []);

  const deleteDoctorById = async (id) => {
    try {
      const response = await fetch(`${API}/api/adminv2/doctors/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getViewDoctorsData();
        toast.success("Doctor deleted successfully");
      } else {
        toast.error("Failed to delete doctor");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete doctor");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteDoctorById(id);
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
                    Manage Doctor
                    <Link to="/add-doctors" className="btn btn-light ss">
                      Add Doctor
                    </Link>
                  </h2>
                  {viewDoctorsData.length ? (
                    <table className="table table-dark">
                      <thead>
                        <tr>
                          <th scope="col">id</th>
                          <th scope="col">Doctor Name</th>
                          <th scope="col">Department</th>
                          <th scope="col">Timing</th>
                          <th scope="col">Image</th>
                          <th scope="col">Update</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewDoctorsData.map((doctor, index) => (
                          <tr key={doctor._id}>
                            <td className="ptd">{index + 1}</td>
                            <td className="ptd">{doctor.drTitle}</td>
                            <td className="ptd">{doctor.drDepartment}</td>
                            <td className="ptd">{doctor.drTiming}</td>
                            <td>
                              <img
                                src={`${API}/uploads/doctors/${doctor.drImage}`}
                                width="50px"
                                height="auto"
                                alt="Category Image"
                              />
                            </td>

                            <td className="updatebtn pbtn">
                              <Link to={`/add-doctors/${doctor._id}`}>
                                <i className="fa fa-edit text-light"></i>
                              </Link>
                            </td>
                            <td className="deletebtn pbtn">
                              <button
                                className="btn"
                                onClick={() => handleDelete(doctor._id)}
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
                      No Doctor found
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

export default ManageDoctor;
