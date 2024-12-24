import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoCatalog.css';

function VideoCatalog() {
  const [videoCollection, setVideoCollection] = useState([]);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    axios
      .get('http://localhost:5000/videos', {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => setVideoCollection(response.data))
      .catch((error) => {
        console.error('Failed to load videos:', error);
      });
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
          </div>
        ))
      ) : (
        <p>No videos available.</p>
      )}
    </div>
  );
}

export default VideoCatalog;
