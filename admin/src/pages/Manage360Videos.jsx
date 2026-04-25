import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Manage360Videos() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoName, setVideoName] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Fetch videos on component mount
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.getAllVideos360();
      if (response.success) {
        setVideos(response.data || []);
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to load videos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (500MB limit)
      if (file.size > 500 * 1024 * 1024) {
        setError('File size exceeds 500MB limit');
        return;
      }
      setVideoFile(file);
      setError('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile || !videoName.trim()) {
      setError('Please provide both video file and name');
      return;
    }
    
    try {
      setUploading(true);
      setError('');
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('title', videoName.trim());
      
      // Upload to backend
      const response = await api.uploadVideo360(formData);
      
      if (response.success) {
        // Refresh videos list
        await fetchVideos();
        setVideoName('');
        setVideoFile(null);
        e.target.reset();
        setError('');
        alert('Video uploaded successfully!');
      }
    } catch (err) {
      console.error('Error uploading video:', err);
      setError(err.message || 'Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="page">
      <h2>Manage 360° Videos</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Upload New 360° Video</h3>
        {error && (
          <div style={{ 
            padding: '0.75rem', 
            marginBottom: '1rem', 
            backgroundColor: '#fee', 
            color: '#c33', 
            borderRadius: '4px',
            border: '1px solid #fcc'
          }}>
            {error}
          </div>
        )}
        <form onSubmit={handleUpload}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Video Name:</label>
            <input
              type="text"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
              placeholder="Enter video name"
              required
              disabled={uploading}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Select 360° Video File:</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              required
              disabled={uploading}
              style={{ marginTop: '0.5rem' }}
            />
            {videoFile && (
              <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
                Selected: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            )}
          </div>
          <button 
            type="submit"
            disabled={uploading || !videoFile || !videoName.trim()}
            style={{
              backgroundColor: uploading ? '#ccc' : '#4CAF50',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: uploading ? 'not-allowed' : 'pointer',
              opacity: uploading ? 0.6 : 1
            }}
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>Uploaded 360° Videos</h3>
          <button 
            onClick={fetchVideos}
            disabled={loading}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              backgroundColor: '#f5f5f5'
            }}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        {loading ? (
          <p>Loading videos...</p>
        ) : videos.length === 0 ? (
          <p>No videos uploaded yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {videos.map(video => (
              <div key={video._id || video.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}>
                <video 
                  controls 
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h4 style={{ margin: '0.5rem 0' }}>{video.name}</h4>
                <p style={{ fontSize: '0.8rem', color: '#666' }}>
                  Uploaded: {new Date(video.uploadedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
