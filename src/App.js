import { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleDownload = async () => {
    if (!url) {
      setStatus('Vui lòng nhập URL!');
      return;
    }

    setStatus('Đang tải video...');
    setFileUrl('');
    //hello
    try {
      const response = await fetch('https://downtube-backend.onrender.com/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus(result.message);
        setFileUrl(result.fileUrl);
      } else {
        setStatus(`Lỗi: ${result.error}`);
      }
    } catch (error) {
      setStatus('Không thể kết nối đến server!');
    }
  };

  return (
    <div className="App">
      <h1>YouTube Video Downloader 🎥</h1>
      <input
        type="text"
        placeholder="Nhập URL YouTube..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleDownload}>Tải Video</button>
      <p>{status}</p>

      {fileUrl && (
        <div>
          <h3>Video đã tải:</h3>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            👉 Nhấn vào đây để tải xuống
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
