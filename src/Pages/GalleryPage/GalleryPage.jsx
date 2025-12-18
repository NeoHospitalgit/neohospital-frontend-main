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
    "https://youtu.be/i3tBPgnEi4A?si=_ydw3hvuPN6XrUUO",
    "https://youtu.be/Uei1g_MQSE0?si=ka4fPgyoXIcDx0-m",
    "https://youtu.be/2e5PAF9nZXs?si=A5PVNa7qIAggsXXc",
    "https://youtu.be/0sStYe1r-sI?si=dcItLUh_AhjZ1duV",
    "https://youtu.be/vlQaKlRplts?si=b0BpLQUq8lwHBAQn",
  ];

  useEffect(() => {
    setContent(activeTab === "photos" ? photos : videos);
  }, [activeTab]);

  return (
    <section className="gallery-section-wrapper">
      <div className="gallery-main-container">
        <h1 className="gallery-page-heading">
          <span className="gallery-heading-text">Gallery</span>
        </h1>

        <div className="gallery-tab-navigation">
          <button
            className={`gallery-nav-btn ${activeTab === "photos" ? "gallery-nav-btn-active" : ""}`}
            onClick={() => setActiveTab("photos")}
          >
            Photos
          </button>
          <button
            className={`gallery-nav-btn ${activeTab === "videos" ? "gallery-nav-btn-active" : ""}`}
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </button>
        </div>

        <div className={`gallery-media-grid gallery-media-grid-${activeTab}`}>
          {content.map((item, index) => (
            <div className="gallery-card" key={index}>
              {activeTab === "photos" ? (
                <img
                  src={item}
                  alt={`Photo ${index + 1}`}
                  className="gallery-photo-img"
                  onClick={() => setLightboxImage(item)}
                />
              ) : (
                <iframe
                  src={item}
                  title={`Video ${index + 1}`}
                  className="gallery-video-frame"
                  allowFullScreen
                ></iframe>
              )}
              <p className="gallery-card-caption">
                {activeTab === "photos" ? `Photo ${index + 1}` : `Video ${index + 1}`}
              </p>
            </div>
          ))}
        </div>

        {lightboxImage && (
          <div className="gallery-lightbox-overlay" onClick={() => setLightboxImage(null)}>
            <button className="gallery-lightbox-close" onClick={() => setLightboxImage(null)}>
              ✕
            </button>
            <img src={lightboxImage} alt="Full View" className="gallery-lightbox-img" />
          </div>
        )}
      </div>
    </section>
  );
}

export default GalleryPage;
