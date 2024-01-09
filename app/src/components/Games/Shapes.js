import React, { useEffect, useState } from "react";
import "../../styles/shapes.css"; // Import a CSS file for styling

const pits = [
  ["Triangle"],
  ["Square", "Circle"],
  ["Square", "Circle", "Triangle"],
  ["Triangle", "Inverted-Triangle"],
  ["Rectangle", "Square"],
  ["Triangle", "Square", "Circle", "Inverted-Triangle", "Rectangle"],
];
const shapes = [
  ["Triangle", "Circle"],
  ["Square", "Circle"],
  ["Square", "Triangle", "Circle"],
  ["Triangle", "Inverted-Triangle"],
  ["Rectangle", "Square"],
  ["Triangle", "Square", "Circle", "Inverted-Triangle", "Rectangle"],
];

const shuffleShapes = (arr) => arr.slice().sort(() => Math.random() - 0.5);

export default function Shapes() {
  const [level, setLevel] = useState(0);
  const [availableShapes, setAvailableShapes] = useState();
  const [availablePits, setAvailablePits] = useState(pits);
  const [matchedShapes, setMatchedShapes] = useState([]);
  const [draggedShape, setDraggedShape] = useState(null);
  const [hasRestarted, setHasRestarted] = useState(false);
  const [isAllMatched, setIsAllMatched] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [currentPit, setCurrentPit] = useState(availablePits[currentIndex]);

  const handleDragStart = (event, shape) => {
    event.dataTransfer.setData("shape", shape);
    setDraggedShape(shape);
  };

  console.log(availablePits[currentIndex]);

  useEffect(() => {
    setAvailableShapes(shuffleShapes(shapes[level]));
    setAvailablePits(shuffleShapes(pits[level]));
  }, [level]);

  useEffect(() => {
    if (matchedShapes.length === pits[level].length) {
      setIsAllMatched(true);
      setTimeout(() => {
        setIsAllMatched(false);
      }, 3000);
    }
  }, [draggedShape, currentIndex]);

  const handleDropStart = (event, pit) => {
    event.preventDefault();
    const droppedShape = event.dataTransfer.getData("shape");
    setDraggedShape(null);

    if (pit === droppedShape) {
      console.log("matched");
      setMatchedShapes((prev) => [...prev, pit]);
      setAvailableShapes((prevShapes) =>
        prevShapes.filter((shape) => shape !== droppedShape)
      );
    }
  };

  const handleDragEnd = () => {
    setDraggedShape(null);
  };

  const onTouchHandler = (event, shape) => {
    if (availablePits[currentIndex] === shape) {
      console.log("match");
      setMatchedShapes((prev) => [...prev, availablePits[currentIndex]]);
      setAvailableShapes((prevShapes) =>
        prevShapes.filter((shap) => shap !== shape)
      );
      setCurrentIndex((prev) => prev !== availablePits.length - 1 && prev + 1);
    }
  };

  const restart = () => {
    setAvailableShapes(shuffleShapes(shapes[level]));
    setAvailablePits(shuffleShapes(pits[level]));
    setMatchedShapes([]);
    setIsAllMatched(false);
    setHasRestarted(true);
    setCurrentIndex(0);
    setTimeout(() => {
      setHasRestarted(false);
    }, 500);
  };

  return (
    <div className="shape-game-main flexV">
      <h1>{`Level ${level + 1}`}</h1>
      <div className="shape-game flexV">
        <div className="pits-container flex">
          {availablePits?.map((pit, i) => (
            <div
              key={i}
              className={`${
                !hasRestarted
                  ? matchedShapes.includes(pit)
                    ? `${pit}-shape matched`
                    : `${pit}-pit ${
                        availablePits[currentIndex] === availablePits[i]
                          ? "currPit"
                          : ""
                      }`
                  : `${pit}-pit`
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(event) => handleDropStart(event, pit)}
            ></div>
          ))}
        </div>
        <div className="shapes-container flex">
          {availableShapes?.map((shape, i) => (
            <div
              key={i}
              className={`${shape}-shape ${
                draggedShape === shape ? "dragged" : ""
              }`}
              draggable
              onDragStart={(event) => handleDragStart(event, shape)}
              onDragEnd={handleDragEnd}
              onTouchStart={(event) => onTouchHandler(event, shape)}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex">
        {level !== 0 && (
          <button
            onClick={() => {
              level > 0 && setLevel((prev) => prev - 1);
              restart();
              setIsAllMatched(false);
            }}
          >
            Previous
          </button>
        )}
        <button onClick={restart}>Restart</button>
        {level !== shapes.length - 1 && (
          <button
            onClick={() => {
              level < shapes.length - 1 && setLevel((prev) => prev + 1);
              restart();
              setIsAllMatched(false);
              setCurrentIndex(0);
            }}
          >
            Next
          </button>
        )}
      </div>
      {isAllMatched ? (
        <div className="allMatched flexC">
          <h1>Good Job!</h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
