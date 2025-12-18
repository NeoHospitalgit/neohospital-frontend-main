import React, { useState, useEffect } from "react";
import "./GalleryPage.css";
import "./Gallery.css";

function GalleryPage() {
  const [activeTab, setActiveTab] = useState("photos"); // State to manage active tab
  const [content, setContent] = useState([]); // State to manage content (photos or videos)
  const [lightboxImage, setLightboxImage] = useState(null); // For displaying the clicked image in a lightbox

  // Define photo and video URLs
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
    // Shuffle content upon page reload
    const shuffledPhotos = shuffleArray(photos);
    const shuffledVideos = shuffleArray(videos);
    setContent(activeTab === "photos" ? shuffledPhotos : shuffledVideos);
  }, [activeTab]);

  // Function to shuffle array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <section id="GalleryPage">
      <div className="container">
        <h1 className="about-title">
          <span>Gallery</span>
        </h1>
        {/* Tab Buttons */}
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
        {/* Content Grid */}
        <div className={`content-grid ${activeTab === "photos" ? "photos" : "videos"}`}>
          {content.map((item, index) => (
            <div className="content-item" key={index}>
              {activeTab === "photos" ? (
                <img
                  src={item}
                  className="gallery-image"
                  alt={`Gallery ${index}`}
                  onClick={() => setLightboxImage(item)} /* Open image in lightbox */
                />
              ) : (
                <iframe
                  src={item}
                  title={`Video ${index}`}
                  className="video-embed"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          ))}
        </div>
        {/* Lightbox */}
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
