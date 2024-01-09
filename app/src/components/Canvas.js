import React, { useEffect, useRef, useState } from "react";
import "../styles/canvas.css";

const Slate = ({ handleClose, height }) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [lineColor, setLineColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);

  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // if (event.cancelable) {
    //   event.preventDefault();
    // }
    const { offsetX, offsetY } = getCoordinates(event);

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * 0.9;
      canvas.height = window.innerHeight * 0.8;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const draw = (event) => {
    // if (event.cancelable) {
    //   event.preventDefault();
    // }
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = getCoordinates(event);

    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleColorChange = (color) => {
    setLineColor(color);
    updateCursor(color);
  };

  const updateCursor = (color) => {
    const canvas = canvasRef.current;
    canvas.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${encodeURIComponent(
      color
    )}"><circle cx="8" cy="8" r="7"/></svg>') 8 8, auto`;
  };

  const handleLineWidthChange = (width) => {
    setLineWidth(width);
  };

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    let offsetX, offsetY;

    if (event.touches && event.touches.length > 0) {
      const touch = event.touches[0];
      offsetX = touch.clientX - canvas.getBoundingClientRect().left;
      offsetY = touch.clientY - canvas.getBoundingClientRect().top;
    } else {
      offsetX = event.nativeEvent.offsetX;
      offsetY = event.nativeEvent.offsetY;
    }

    return { offsetX, offsetY };
  };

  const colorPalette = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "white",
  ];

  return (
    <div className="canvas-container">
      <div className="color-container">
        <div id="colorPalette">
          {colorPalette.map((color) => (
            <button
              key={color}
              style={{
                backgroundColor: color,
                width: "20px",
                height: "20px",
                border: "none",
                cursor: "pointer",
                borderRadius: "50%",
              }}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        style={{ touchAction: "none" }}
      />
      <button className="clear" onClick={clearCanvas}>
        Clear
      </button>
    </div>
  );
};

export default Slate;
