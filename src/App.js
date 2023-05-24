import React, { useState, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');
  const [response, setResponse] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setLink('');
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('link', link);

    try {
      const response = await axios.post('http://your-server-endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Image Captioning</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image:</label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          {image && (
            <button type="button" className="btn btn-danger mt-2" onClick={handleRemoveImage}>
              Remove Image
            </button>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="link" className="form-label">Link:</label>
          <input
            type="text"
            className="form-control"
            id="link"
            value={link}
            onChange={handleLinkChange}
            disabled={image !== null}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!image && !link}>
          Submit
        </button>
      </form>

      {response && (
        <div className="mt-4">
          <h2 className="mb-3">Caption: {response.caption}</h2>
          <img src={response.imageUrl} alt="Uploaded" className="img-fluid" />
        </div>
      )}
    </div>
  );
}

export default App;
