import React from "react";
import List from "./List";
import "./List.css";
import TopBarAdmin from "./TopBarAdmin";
function Admin() {
  return (
    <>
      <TopBarAdmin />
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 adminleft">
              <div>
                <List />
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-4">
                  <div className="BlogDetails  border border-primary m-4 text-center">
                    <h4>
                      Blog Active : <span>21</span>
                    </h4>
                    <h4 className="text-danger">
                      Blog Deactive : <span>3</span>
                    </h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="BlogDetails  border border-primary m-4 text-center">
                    <h4>
                      Specialities Active : <span>21</span>
                    </h4>
                    <h4 className="text-danger">
                      Specialities Deactive : <span>3</span>
                    </h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="BlogDetails  border border-primary m-4 text-center">
                    <h4>
                      Doctors Active : <span>21</span>
                    </h4>
                    <h4 className="text-danger">
                      Doctors Deactive : <span>3</span>
                    </h4>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="SpecialtyDetails"></div>
                </div>
                <div className="col-md-4">
                  <div className="ServiceDetails"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Admin;
