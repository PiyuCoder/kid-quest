import React, { useEffect, useState } from "react";
import "../styles/color.css";
import EachColor from "../components/EachColor.js";

const colorsArr = [
  "red",
  "green",
  "yellow",
  "blue",
  "black",
  "purple",
  "orange",
  "white",
  "pink",
  "brown",
  "maroon",
  "cyan",
];
export default function Color({ slice }) {
  const [colors, setColors] = useState([]);
  const shuffleColors = () => {
    const shuffledColors = [...colorsArr].sort(() => Math.random() - 0.5);
    setColors(shuffledColors);
  };

  useEffect(() => {
    shuffleColors();
  }, [colorsArr.length]);
  return (
    <div className="color-main">
      <div className="color-containers">
        {colors.slice(0, slice).map((color, i) => (
          <EachColor data={color} key={i} />
        ))}
      </div>
      <button onClick={shuffleColors} className="shuffle">
        Shuffle
      </button>
    </div>
  );
}
