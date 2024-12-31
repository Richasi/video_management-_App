// VideoCatalog.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoCatalog.css';

function VideoCatalog() {
  const [videoCollection, setVideoCollection] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:5000/videos', {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setVideoCollection(response.data);
      } catch (error) {
        console.error('Failed to load videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="video-catalog-container">
      <h2>All Uploaded Videos</h2>
      {videoCollection.length > 0 ? (
        videoCollection.map((vid) => (
          <div key={vid._id} className="video-item">
            <h3>{vid.title}</h3>
            <p>{vid.description}</p>
            <p>Tags: {vid.tags.join(', ')}</p>
            <video controls width="400">
              <source src={`http://localhost:5000/uploads/${vid.fileName}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))
      ) : (
        <p>No videos available.</p>
      )}
    </div>
  );
}

export default VideoCatalog;