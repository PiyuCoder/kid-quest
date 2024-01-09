import React from "react";
import "../styles/games.css";
import memory from "../images/epilepsy.png";
import shapes from "../images/shapes.png";
import { useNavigate } from "react-router-dom";

const gamesArr = [
  { name: "memory", img: memory },
  { name: "shapes", img: shapes },
];
export default function Games() {
  const navigate = useNavigate();
  return (
    <div className="game-main flexV">
      <div className="game-container flexC">
        {gamesArr.map((game, i) => (
          <div
            key={i}
            onClick={() => navigate(`/${game.name}`)}
            className="game flexV"
          >
            <img src={game.img} />
            <p>{game.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
