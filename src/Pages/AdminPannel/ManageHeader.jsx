import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function ManageHeader() {
  const [viewHeaderData, setViewHeaderData] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getViewHeaderData = async () => {
    try {
      const response = await fetch(`${API}/api/adminv4/view-header`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setViewHeaderData(data.header);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHeaderById = async (id) => {
    try {
      const response = await fetch(`${API}/api/adminv4/header/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getViewHeaderData();
        toast.success("Header deleted successfully");
      } else {
        toast.error("Failed to delete Header");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getViewHeaderData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you want to delete ?")) {
      deleteHeaderById(id);
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
                        <th scope="col">Header Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewHeaderData.map((Header, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{Header.page}</td>
                          <td
                            style={{
                              color: Header.status ? "green" : "red",
                              paddingTop: 20,
                            }}
                          >
                            {Header.status ? "Active" : "Deactive"}
                          </td>
                          <td className="updatebtn">
                            <Link to={`/add-Header/${Header._id}`}>
                              <i className="fa fa-edit text-light"></i>
                            </Link>
                          </td>
                          <td className="deletebtn">
                            <button
                              className="btn"
                              onClick={() => handleDelete(Header._id)}
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

export default ManageHeader;
