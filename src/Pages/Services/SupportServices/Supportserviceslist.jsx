import React from "react";
import Supportcontent from "./Supportcontent";
import { Link } from "react-router-dom";
function Supportserviceslist() {
  return (
    <>
      <ul className="servicelist">
        {Supportcontent.map((value) => {
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

export default Supportserviceslist;
