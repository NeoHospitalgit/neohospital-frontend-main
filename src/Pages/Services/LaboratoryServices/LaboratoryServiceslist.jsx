import React from "react";
import Laboratorycontent from "./LaboratoryData";
import { Link } from "react-router-dom";
function LaboratoryServiceslist() {
  return (
    <>
      <ul className="servicelist">
        {Laboratorycontent.map((value) => {
          return (
            <>
              <li>
                <Link to="#">
                  <i className="fa fa-angle-double-right mx-2"></i>
                  {value.service}
                </Link>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

export default LaboratoryServiceslist;
