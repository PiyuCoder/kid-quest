import React, { useState, useEffect } from "react";
import { flipCardData } from "../../utils/gameData";
import "../../styles/flipCard.css";

const shuffleArray = (array) => array.slice().sort(() => Math.random() - 0.5);

const FlipTheCard = () => {
  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState();
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isAllMatched, setIsAllMatched] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  const handleCardClick = (data, index) => {
    if (!matchedCards.includes(data.img)) {
      if (selectedCards.length < 2 && !selectedCards.includes(index)) {
        setSelectedCards((prev) => [...prev, index]);
      }
    }
  };

  useEffect(() => {
    setCards(shuffleArray(flipCardData[level]));
  }, [level]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstIndex, secondIndex] = selectedCards;
      if (cards[firstIndex].img === cards[secondIndex].img) {
        setMatchedCards((prev) => [...prev, cards[firstIndex].img]);
      }
      setTimeout(() => {
        setSelectedCards([]);
      }, 800);
    }

    if (matchedCards.length === flipCardData[level].length / 2) {
      console.log("all matched");
      setIsAllMatched(true);
      setTimeout(() => {
        setIsAllMatched(false);
      }, 3000);
    }
  }, [selectedCards, cards]);

  const resetGame = () => {
    setIsRestarting(true);
    setCards(shuffleArray(flipCardData[level]));
    setSelectedCards([]);
    setMatchedCards([]);
    setIsAllMatched(false);
    setTimeout(() => {
      setIsRestarting(false);
    }, 1000);
  };

  console.log(level);
  return (
    <div className="flip-card-main flexV">
      <h1>{`Level ${level + 1}`}</h1>
      <div className="flip-card-container flexC">
        {cards?.map((data, index) => (
          <div
            key={index}
            className={`card flexC ${
              selectedCards.includes(index) ? "flipped" : ""
            } ${matchedCards.includes(data.img) ? "matched" : ""} ${
              isRestarting ? "restarting" : ""
            }`}
            onClick={() => handleCardClick(data, index)}
          >
            {selectedCards.includes(index) ||
            matchedCards.includes(data.img) ? (
              <img src={data.img} alt={`Card ${index + 1}`} />
            ) : (
              "Click to Flip"
            )}
          </div>
        ))}
      </div>
      <div className="flex">
        {level !== 0 && (
          <button
            onClick={() => {
              level > 0 && setLevel((prev) => prev - 1);
              resetGame();
              setIsAllMatched(false);
            }}
          >
            Previous
          </button>
        )}
        <button onClick={resetGame}>Restart</button>
        {level !== flipCardData.length - 1 && (
          <button
            onClick={() => {
              level < flipCardData.length - 1 && setLevel((prev) => prev + 1);
              resetGame();
              setIsAllMatched(false);
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
};

export default FlipTheCard;
