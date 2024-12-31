// UploadPanel.js
import React, { useState } from 'react';
import axios from 'axios';

function UploadPanel() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setVideoPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('video', file);

    try {
      const token = localStorage.getItem('userToken');
      await axios.post('http://localhost:5000/upload', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Video uploaded successfully!');
      setTitle('');
      setDescription('');
      setTags('');
      setFile(null);
      setVideoPreview(null);
    } catch (err) {
      console.error('Failed to upload video:', err);
      alert('Failed to upload video. Please try again.');
    }
  };

  return (
    <form onSubmit={handleUpload} className="upload-form">
      <h2>Upload Video</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        required
      />

      {videoPreview && (
        <div style={{ marginTop: '20px' }}>
          <h3>Video Preview</h3>
          <video width="400" controls>
            <source src={videoPreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <button type="submit" style={{ marginTop: '20px' }}>Upload</button>
    </form>
  );
}

export default UploadPanel;
