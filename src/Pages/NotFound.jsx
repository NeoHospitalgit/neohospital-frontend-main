import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function NotFound() {
  const deployedURL = window.location.href;
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found | NEO Hospital";

    let robotsTag = document.querySelector('meta[name="robots"]');

    if (!robotsTag) {
      robotsTag = document.createElement("meta");
      robotsTag.setAttribute("name", "robots");
      document.head.appendChild(robotsTag);
    }

    robotsTag.setAttribute("content", "noindex, nofollow");

    return () => {
      robotsTag.remove();
    };
  }, []);

  const notFoundStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    textAlign: "center",
  };

  return (
    <div style={notFoundStyle}>
      <h1>Page Not Found</h1>

      <p>
        The requested URL <strong>{deployedURL}</strong> was not found on this
        server.
      </p>

      <p>
        The requested URL <strong>{location.pathname}</strong> was not found on
        this server.
      </p>
    </div>
  );
}

export default NotFound;
