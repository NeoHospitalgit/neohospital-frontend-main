import React, { useState, useEffect } from "react";
import "./GalleryPage.css";

function GalleryPage() {
  const [activeTab, setActiveTab] = useState("photos");
  const [content, setContent] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);

  const photos = [
    "https://i.ibb.co/nqQn9Rpn/2.jpg",
    "https://i.ibb.co/5g8jrYr7/3.jpg",
    "https://i.ibb.co/3yWwX90c/4.jpg",
    "https://i.ibb.co/bRKGWtX8/5.jpg",
    "https://i.ibb.co/xqRCH2Hh/6.jpg",
    "https://i.ibb.co/ZnWsQ70/8.jpg",
    "https://i.ibb.co/YB6cYsmv/9.jpg",
    "https://i.ibb.co/1fkCSfPQ/10.jpg",
    "https://i.ibb.co/d44SGb9N/photo-6204191537839672558-y.jpg",
  ];

  const videos = [
    "https://www.youtube.com/embed/Cy76kcBlaoM?si=R7TrnuH_AfQyQ4Q4",
    "https://www.youtube.com/embed/Cy76kcBlaoM?si=R7TrnuH_AfQyQ4Q4",
    "https://www.youtube.com/embed/Cy76kcBlaoM?si=R7TrnuH_AfQyQ4Q4",
    "https://www.youtube.com/embed/Cy76kcBlaoM?si=R7TrnuH_AfQyQ4Q4",
  ];

  useEffect(() => {
    setContent(activeTab === "photos" ? photos : videos);
  }, [activeTab]);

  return (
    <section id="GalleryPage">
      <div className="container">
        <h1 className="about-title">
          <span>Gallery</span>
        </h1>
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "photos" ? "active" : ""}`}
            onClick={() => setActiveTab("photos")}
          >
            Photos
          </button>
          <button
            className={`tab-button ${activeTab === "videos" ? "active" : ""}`}
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </button>
        </div>
        <div className={`content-grid ${activeTab}`}>
          {content.map((item, index) => (
            <div className="content-item" key={index}>
              {activeTab === "photos" ? (
                <img
                  src={item}
                  alt={`Photo ${index + 1}`}
                  className="gallery-image"
                  onClick={() => setLightboxImage(item)}
                />
              ) : (
                <iframe
                  src={item}
                  title={`Video ${index + 1}`}
                  className="video-embed"
                ></iframe>
              )}
              <p className="media-title">{activeTab === "photos" ? `Photo ${index + 1}` : `Video ${index + 1}`}</p>
            </div>
          ))}
        </div>
        {lightboxImage && (
          <div className="lightbox" onClick={() => setLightboxImage(null)}>
            <img src={lightboxImage} alt="Full View" className="lightbox-image" />
          </div>
        )}
      </div>
    </section>
  );
}

export default GalleryPage;
