import React, { useState, useEffect } from "react";
import "./GalleryPage.css";

function GalleryPage() {
  const [activeTab, setActiveTab] = useState("photos");
  const [content, setContent] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);

  const photos = [
    "https://international-violet-ioun74jkgs-a34xpd4k81.edgeone.dev/2.jpg",
    "https://img.sanishtech.com/u/b52d67078cce2c428b80bc12d9d54ecc.jpg",
    "https://img.sanishtech.com/u/dff14989125b0cd75b0dba1ce05533c0.jpg",
    "https://img.sanishtech.com/u/9ccd02c25b7799b5cddc69066f00e12a.jpg",
    "https://img.sanishtech.com/u/7a0005a81493704186ae280f1fe25387.jpg",
    "https://img.sanishtech.com/u/7a3c648a498f0ce8fd2cd1f8c92c4cfb.jpg",
    "https://img.sanishtech.com/u/05f4eccc5c1e94d59f421993d54246e3.jpg",
    "https://img.sanishtech.com/u/280177d80ef91b932036714b4d0be493.jpg",
    "https://img.sanishtech.com/u/f8c4c64378d627ad851e37e086803518.jpg",
  ];

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
