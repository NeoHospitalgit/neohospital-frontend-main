import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function ManageSeoPages() {
  const [viewSeoPages, setViewSeoPages] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getViewSeoPages = async () => {
    try {
      const response = await fetch(`${API}/api/adminv8/view-seopages`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setViewSeoPages(data.seopages);
        console.log(data.seopages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteseopagesById = async (id) => {
    try {
      const response = await fetch(`${API}/api/adminv8/seopages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getViewSeoPages();
        toast.success("seopages deleted successfully");
      } else {
        toast.error("Failed to delete seopages");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getViewSeoPages();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you want to delete ?")) {
      deleteseopagesById(id);
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
                        <th scope="col">Page URL</th>
                        <th scope="col">Status</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewSeoPages.map((SeoPageData, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{SeoPageData.pageurl}</td>
                          <td
                            style={{
                              color: SeoPageData.status ? "green" : "red",
                              paddingTop: 20,
                            }}
                          >
                            {SeoPageData.status ? "Active" : "Deactive"}
                          </td>
                          <td className="updatebtn">
                            <Link to={`/add-seopages/${SeoPageData._id}`}>
                              <i className="fa fa-edit text-light"></i>
                            </Link>
                          </td>
                          <td className="deletebtn">
                            <button
                              className="btn"
                              onClick={() => handleDelete(SeoPageData._id)}
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

export default ManageSeoPages;
