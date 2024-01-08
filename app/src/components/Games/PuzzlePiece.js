// PuzzlePiece.js
import React from "react";
import { useDrag } from "react-dnd";

const style = {
  width: "100px",
  height: "100px",
  margin: "5px",
  cursor: "move",
  backgroundSize: "cover",
  border: "2px solid #ddd",
};

const PuzzlePiece = ({ id, imageSrc, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "PUZZLE_PIECE",
    item: { id, onDrop },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        ...style,
        backgroundImage: `url(${imageSrc})`,
        opacity: isDragging ? 0.5 : 1,
        border: isDragging ? "2px dashed #aaa" : "2px solid #ddd",
      }}
    ></div>
  );
};

export default PuzzlePiece;
