import React, { useContext, useEffect } from "react";
import "../styles/kidDashboard.css";
import owl from "../images/owl.png";
import alphabet from "../images/alphabet.png";
import number from "../images/countdown.png";
import color from "../images/palette.png";
import animals from "../images/lion.png";
import slate from "../images/slate.png";
import games from "../images/joystick.png";
import KidCatCard from "../components/KidCatCard";
import { userContext } from "../context/userContext";

const CategoryImgArr = [alphabet, number, color, animals, slate, games];
const titleArr = ["alphabet", "number", "color", "animal", "slate", "games"];

export default function KidsDashboard() {
  const { currentUser } = useContext(userContext);
  useEffect(() => {
    document.title = "Kid's Dashboard";
  });
  return (
    <div className="kids-dashboard flexV">
      <h2 style={{ color: "white", margin: "0" }}>{`Hello ${
        currentUser?.name.split(" ")[0]
      }!`}</h2>
      <div className="kids-innercontainer flexC">
        {/* <img className="kids-bg-img" src={bg} /> */}
        <img className="owl" src={owl} />
        <div className="kid-cat-card-container flex">
          {CategoryImgArr.map((cat, i) => (
            <KidCatCard catImg={cat} key={i} title={titleArr[i]} />
          ))}
        </div>
      </div>
    </div>
  );
}
