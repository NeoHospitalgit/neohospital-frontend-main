import React, { useState, useEffect } from "react";
import "./GalleryPage.css";

function GalleryPage() {
  const [activeTab, setActiveTab] = useState("photos");
  const [content, setContent] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);

 
  const photos = Array.from({ length: 23 }, (_, i) => `images/${i + 1}.jpg`);

  const videos = [
       "https://www.youtube.com/embed/i3tBPgnEi4A",
    "https://www.youtube.com/embed/Uei1g_MQSE0",
    "https://www.youtube.com/embed/2e5PAF9nZXs",
    "https://www.youtube.com/embed/0sStYe1r-sI",
    "https://www.youtube.com/embed/vlQaKlRplts",
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
