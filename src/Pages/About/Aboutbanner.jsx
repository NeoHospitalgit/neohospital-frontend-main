import React from "react";
import Aboutimage from "./Aboutimage";
function Aboutbanner() {
  return (
    <>
      <section className="aboutbanner">
        <div>
          <img
            src={Aboutimage.banner2}
            alt=""
            srcSet=""
            className="banner-img"
          />
        </div>
      </section>
    </>
  );
}

export default Aboutbanner;
