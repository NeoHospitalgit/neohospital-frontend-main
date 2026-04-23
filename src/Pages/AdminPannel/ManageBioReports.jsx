import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function ManageBioReports() {
  const [reports, setReports] = useState([]);
  const { authorizationToken, API } = useAuth();

  // ================= GET ALL =================
  const getAllReports = async () => {
    try {
      const response = await fetch(
        `${API}/api/adminv10/manage-medical-report`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setReports(data.biomedical || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch reports");
    }
  };

  // ================= DELETE =================
  const deleteReportById = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/adminv10/add-bio-medical-report/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        getAllReports();
        toast.success("Report deleted successfully");
      } else {
        toast.error("Failed to delete report");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReports();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      deleteReportById(id);
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
                    Manage Bio Medical Reports
                    <Link to="/add-bio-medical-report" className="btn btn-light ms-3">
                      Add Report
                    </Link>
                  </h2>

                  <table className="table table-dark">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Report Title</th>
                        <th>Hospital</th>
                        <th>File</th>
                        <th>Status</th>
                        <th>Update</th>
                        <th>Delete</th>
                      </tr>
                    </thead>

                    <tbody>
                      {reports.length > 0 ? (
                        reports.map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>

                            <td>{item.reporttitle}</td>

                            <td>{item.hospital}</td>

                            <td>
                              {item.image && (
                                <>
                                  {/* Image */}
                                  {item.image.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                                    <img
                                      src={`${API}/uploads/report/${item.image}`}
                                      width="60"
                                      alt="report"
                                    />
                                  ) : (
                                    /* PDF */
                                    <a
                                      href={`${API}/uploads/report/${item.image}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="btn btn-sm btn-info"
                                    >
                                      View PDF
                                    </a>
                                  )}
                                </>
                              )}
                            </td>

                            <td
                              style={{
                                color: item.status ? "green" : "red",
                              }}
                            >
                              {item.status ? "Active" : "Inactive"}
                            </td>

                            <td>
                              <Link to={`/add-bio-medical-report/${item._id}`}>
                                <i className="fa fa-edit text-light"></i>
                              </Link>
                            </td>

                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No reports found
                          </td>
                        </tr>
                      )}
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

export default ManageBioReports;