import React, { useRef, useState } from 'react';

const CameraApp = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set the canvas dimensions to match the video stream
    //canvas.width = video.videoWidth;
    //canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL representing the captured image
    const capturedPhoto = canvas.toDataURL('image/png');

    // Update state with the captured photo
    setPhoto(capturedPhoto);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '50px', height: 'auto' }} />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={takePhoto}>Take Photo</button>
      {photo && <img src={photo} alt="Captured" />}
      <canvas ref={canvasRef} style={{ display: 'none' }} width='50' height='50'/>
    </div>
  );
};

export default CameraApp;