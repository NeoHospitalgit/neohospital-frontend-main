import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function ListProcedures() {
  const [proceduresData, setProceduresData] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getProcedures = async () => {
    try {
      const response = await fetch(`${API}/api/adminv12/view-procedures`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProceduresData(data.data);
      } else {
        setProceduresData([]);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch keywords");
    }
  };

  const deleteProcedures = async (id) => {
    try {
      const response = await fetch(`${API}/api/adminv12/procedures/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        getProcedures();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProcedures();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete this Procedures?")) {
      deleteProcedures(id);
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
                    Manage Procedures

                    <Link
                      to="/add-procedures"
                      className="btn btn-light ss"
                    >
                      Add Procedures
                    </Link>
                  </h2>

                  {proceduresData.length > 0 ? (
                   <table className="table table-dark table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Procedures Title</th>
                      <th>Department</th>
                      <th>Banner</th>
                      <th>Status</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {proceduresData.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>

                        <td>{item.procedures_title}</td>

                        <td>
                          {item.department ? item.department.title : "-"}
                        </td>

                        <td>
                        -
                        </td>

                        <td
                          style={{
                            color: item.procedures_status ? "lime" : "red",
                          }}
                        >
                          {item.procedures_status ? "Active" : "Inactive"}
                        </td>

                        <td>
                          <Link to={`/add-procedures/${item._id}`}>
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
                    ))}
                  </tbody>
                </table>
                  ) : (
                    <h3 className="text-danger text-center py-5">
                      No procedures Found
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

export default ListProcedures;