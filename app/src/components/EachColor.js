import React, { useState } from "react";

export default function EachColor({ data }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleFlipCard = () => {
    setIsFlipped(true);

    setTimeout(() => {
      setShowText(true);
    }, 200);
    setTimeout(() => {
      setIsFlipped(false);
      setShowText(false);
    }, 3000);
  };
  return (
    <div
      className={`each-color ${isFlipped ? "flipped" : ""}`}
      style={{ backgroundColor: !isFlipped ? data : "grey" }}
      onClick={handleFlipCard}
    >
      {showText ? <h2 style={{ color: data }}>{data}</h2> : <h2>Click me!</h2>}
    </div>
  );
}
