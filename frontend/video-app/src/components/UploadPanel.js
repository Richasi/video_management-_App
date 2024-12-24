import axios from 'axios';
import React, { useState } from 'react';
import './UploadPanel.css';

const UploadPanel = () => {
  const [vidTitle, setVidTitle] = useState('');
  const [vidDesc, setVidDesc] = useState('');
  const [vidTags, setVidTags] = useState('');
  const [vidFile, setVidFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!vidFile) {
      setUploadError('Please select a video file to upload.');
      return;
    }

    const formPayload = new FormData();
    formPayload.append('title', vidTitle);
    formPayload.append('description', vidDesc);
    formPayload.append('tags', vidTags);
    formPayload.append('video', vidFile);

    try {
      const authToken = localStorage.getItem('userToken');
      const response = await axios.post(
        'https://video-app-backend-2tsp.onrender.com/upload',
        formPayload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log('Upload Success:', response.data);
      setUploadSuccess('Video uploaded successfully!');
      setVidTitle('');
      setVidDesc('');
      setVidTags('');
      setVidFile(null);
    } catch (err) {
      console.error('Upload Failed:', err.response || err.message);
      setUploadError('Failed to upload the video. Please try again.');
    }
  };

  return (
    <form onSubmit={handleUpload} className="upload-panel">
      <label>Video Title</label>
      <input
        type="text"
        value={vidTitle}
        onChange={(e) => setVidTitle(e.target.value)}
        required
      />

      <label>Video Description</label>
      <textarea
        value={vidDesc}
        onChange={(e) => setVidDesc(e.target.value)}
        required
      />

      <label>Tags (comma-separated)</label>
      <input
        type="text"
        value={vidTags}
        onChange={(e) => setVidTags(e.target.value)}
      />

      <label>Video File</label>
      <input
        type="file"
        onChange={(e) => setVidFile(e.target.files[0])}
        accept="video/*"
        required
      />

      <button type="submit">Submit</button>
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      {uploadSuccess && <p style={{ color: 'green' }}>{uploadSuccess}</p>}
    </form>
  );
};

export default UploadPanel;
