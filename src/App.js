import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [fileName, setFileName] = useState('');

  // 📌 Gửi yêu cầu tải video
  const handleDownload = async () => {
    if (!videoUrl.trim()) {
      alert("Vui lòng nhập URL YouTube!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/download', { url: videoUrl });

      // ✅ Nhận link và tên file từ backend
      setDownloadLink(response.data.downloadLink);
      setFileName(response.data.fileName);
    } catch (error) {
      console.error("Lỗi tải video:", error);
      alert("Tải video thất bại!");
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>YouTube Video Downloader</h1>
      <input
        type="text"
        placeholder="Nhập URL video..."
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={{ width: '300px', padding: '10px', marginRight: '10px' }}
      />
      <button onClick={handleDownload} style={{ padding: '10px' }}>Tải Video</button>

      {downloadLink && (
        <div style={{ marginTop: '20px' }}>
          <h3>Video đã sẵn sàng tải:</h3>
          <p>📂 Tên file: <strong>{fileName}</strong></p>
          <a href={downloadLink} download={fileName}>📥 Nhấn để tải video</a>
        </div>
      )}
    </div>
  );
}

export default App;
