import React from "react";
import "./socialmedia.css";
function Social() {
  return (
    <div id="fixed-social" style={{ display: "none" }}>
      <div>
        <a
          href="https://www.facebook.com/neohospitalinnoida"
          className="fixed-facebook"
          target="_blank"
        >
          <i className="fa fa-facebook"></i> <span>Facebook</span>
        </a>
      </div>
      <div>
        <a href="https://twitter.com/neo_hospital" className="fixed-twitter text-light" target="_blank">
          <i class="fa-brands fa-x-twitter"></i> <span>Twitter</span>
        </a>
      </div>
      {/* <div>
        <a href="#" className="fixed-gplus" target="_blank">
          <i className="fa fa-google"></i> <span>Google+</span>
        </a>
      </div> */}
      <div>
        <a
          href="https://www.linkedin.com/company/neohospitalnoida/"
          className="fixed-linkedin"
          target="_blank"
        >
          <i className="fa fa-linkedin"></i> <span>LinkedIn</span>
        </a>
      </div>
      <div>
        <a
          href="https://www.instagram.com/neohospitalnoida/"
          className="fixed-instagrem"
          target="_blank"
        >
          <i className="fa fa-instagram"></i> <span>Instagram</span>
        </a>
      </div>
    </div>
  );
}

export default Social;
