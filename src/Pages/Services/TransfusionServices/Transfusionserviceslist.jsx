import React from "react";
import Transfusioncontent from "./Transfusioncontent";
import { Link } from "react-router-dom";
function Transfusionserviceslist() {
  return (
    <>
      <ul className="servicelist">
        {Transfusioncontent.map((value) => {
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

export default Transfusionserviceslist;
