import React from "react";
import Pharmacycontent from "./Pharmacycontent";
import { Link } from "react-router-dom";
function Pharmacyserviceslist() {
  return (
    <>
      <ul className="servicelist">
        {Pharmacycontent.map((value) => {
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

export default Pharmacyserviceslist;
