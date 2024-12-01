import React, { useState, useEffect } from "react";
import "./GalleryPage.css";
import "./Gallery.css";

function GalleryPage() {
  const [activeTab, setActiveTab] = useState("photos"); // State to manage active tab
  const [content, setContent] = useState([]); // State to manage content (photos or videos)

  // Define photo and video URLs
  const photos = [
    "https://picsum.photos/400/200",
    "https://picsum.photos/400/200",
    "https://picsum.photos/400/200",
    "https://picsum.photos/400/200",
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
      <div className="container pd">
        <h3 className="about-title">
          <span>Gallery</span>
        </h3>
      </div>
      <div className="container pd1">
        <div className="row">
          <div className="col-lg-6 d-flex justify-content-center">
            <button
              type="button"
              className={`btn-trans btn-trans ${
                activeTab === "photos" ? "activebtn" : ""
              } w-100`}
              onClick={() => setActiveTab("photos")}
            >
              Photos
            </button>
          </div>
          <div className="col-lg-6 d-flex justify-content-center">
            <button
              type="button"
              className={`btn-trans w-100 ${
                activeTab === "videos" ? "activebtn" : ""
              }`}
              onClick={() => setActiveTab("videos")}
            >
              Videos
            </button>
          </div>
        </div>
      </div>

      <div
        className={`container ${
          activeTab === "photos" ? "photo active" : "video active"
        } pd1`}
      >
        <div className="row">
          {content.map((item, index) => (
            <div
              key={index}
              className="col-lg-4 d-flex justify-content-center"
              style={{ minHeight: "210px" }} // Set a fixed height for video containers
            >
              {activeTab === "photos" ? (
                <div className="d-flex flex-column">
                  <img src={item} className="img-fluid" alt="Gallery" />
                  <p className="text-center mrgcolor">Title</p>
                </div>
              ) : (
                <div key={index} className="d-flex flex-column ">
                  <iframe
                    width="100%"
                    height="auto"
                    src={item}
                    title="YouTube video player"
                    frameBorder="1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GalleryPage;
