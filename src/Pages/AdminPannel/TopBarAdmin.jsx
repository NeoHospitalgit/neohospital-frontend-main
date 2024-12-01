import React from "react";
import { Link } from "react-router-dom";

function TopBarAdmin() {
  return (
    <section className="topbaradmin">
      <div className="flex">
        <div className="flex-end">
          <Link className="btn btn-outline-light" to="/logout">
            LOGOUT
          </Link>
        </div>
      </div>
    </section>
  );
}

export default TopBarAdmin;
