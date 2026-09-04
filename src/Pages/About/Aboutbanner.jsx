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
           width="1920" height="600" />
        </div>
      </section>
    </>
  );
}

export default Aboutbanner;
