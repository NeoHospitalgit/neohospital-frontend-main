import React from "react";
import Clincalcontent from "./ClinicalData";
import { Link } from "react-router-dom";
function ClinicalServiceslist() {
  return (
    <>
      <ul className="servicelist">
        {Clincalcontent.map((value) => {
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

export default ClinicalServiceslist;
