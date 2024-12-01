import React from "react";
import Diagnosticcontent from "./DiagnosticData";
import { Link } from "react-router-dom";
function DiagnosticServiceslist() {
  return (
    <>
      <ul className="servicelist">
        {Diagnosticcontent.map((value) => {
          return (
            <>
              <li>
                <div>
                  <i className="fa fa-angle-double-right mx-2"></i>
                  {
                    /* {value.service} */
                    <Link to={`/diagnostic/${encodeURIComponent(value.slug)}`}>
                      {value.service}
                    </Link>
                  }
                </div>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

export default DiagnosticServiceslist;
