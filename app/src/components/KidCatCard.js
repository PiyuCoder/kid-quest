import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

export default function KidCatCard({ catImg, title }) {
  const navigate = useNavigate();
  const { setFlag } = useContext(userContext);
  return (
    <div
      className="kid-cat-card flexV"
      onClick={() => {
        setFlag((prev) => !prev);
        navigate(`/${title}`);
      }}
    >
      <img src={catImg} />
    </div>
  );
}
