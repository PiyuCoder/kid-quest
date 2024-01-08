import React, { useState, useEffect } from "react";

const TileMemoryGame = () => {
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateRandomTile = () => {
    const tiles = ["red", "green", "blue", "yellow"];
    const randomIndex = Math.floor(Math.random() * tiles.length);
    return tiles[randomIndex];
  };

  const highlightTile = (tile, duration) => {
    return new Promise((resolve) => {
      // Highlight the tile (you can add your own styles)
      document.getElementById(tile).style.border = "4px solid white";
      setTimeout(() => {
        // Remove the highlight after the specified duration
        document.getElementById(tile).style.border = "2px solid black";
        resolve();
      }, duration);
    });
  };

  const playSequence = async () => {
    setIsPlaying(true);
    for (const tile of sequence) {
      await highlightTile(tile, 500);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    setIsPlaying(false);
  };

  const handleTileClick = (tile) => {
    setUserInput((prevInput) => [...prevInput, tile]);
  };

  const startGame = async () => {
    const newSequence = Array.from({ length: 4 }, generateRandomTile);
    setSequence(newSequence);
    await playSequence();
  };

  useEffect(() => {
    if (userInput.length === sequence.length) {
      const isCorrect = userInput.every(
        (tile, index) => tile === sequence[index]
      );
      if (isCorrect) {
        // Player successfully repeated the sequence
        alert("Congratulations! You repeated the sequence correctly.");
        startGame(); // Start a new round
      } else {
        // Player made a mistake
        alert("Oops! That's not the correct sequence. Try again!");
        setUserInput([]); // Reset user input
        playSequence(); // Replay the sequence
      }
    }
  }, [userInput, sequence]);

  return (
    <div>
      <h1>Tile Memory Game</h1>
      <div>
        <button onClick={startGame} disabled={isPlaying}>
          {isPlaying ? "Playing..." : "Start Game"}
        </button>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        {["red", "green", "blue", "yellow"].map((tile) => (
          <div
            key={tile}
            id={tile}
            onClick={() => handleTileClick(tile)}
            style={{
              width: "50px",
              height: "50px",
              border: "2px solid black",
              backgroundColor: tile,
              cursor: "pointer",
            }}
          ></div>
        ))}
      </div>
      <div>
        <h3>Your Sequence:</h3>
        {userInput.map((tile, index) => (
          <span key={index} style={{ textTransform: "capitalize" }}>
            {tile}{" "}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TileMemoryGame;
