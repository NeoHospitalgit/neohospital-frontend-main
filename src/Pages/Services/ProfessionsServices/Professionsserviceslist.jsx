import React from "react";
import Professionscontent from "./Professionscontent";
import { Link } from "react-router-dom";
function Professionsserviceslist() {
  return (
    <>
      <ul className="servicelist">
        {Professionscontent.map((value) => {
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

export default Professionsserviceslist;
