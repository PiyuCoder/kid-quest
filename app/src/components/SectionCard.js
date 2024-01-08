import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import kidImg from "../images/kid.png";
import parentImg from "../images/parents.png";

export default function SectionCard({ name, kid }) {
  const { setFlag } = useContext(userContext);
  const navigate = useNavigate();
  return (
    <div
      className="home-card flexC"
      onClick={() => {
        kid ? navigate("/kids") : navigate("/parents");
        setFlag((prev) => !prev);
      }}
    >
      <img src={`${kid ? kidImg : parentImg}`} />
      <h1>{name}</h1>
    </div>
  );
}
