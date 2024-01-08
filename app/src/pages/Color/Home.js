import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../api/axios";
import { userContext } from "../../context/userContext";
import "../../styles/color.css";
import { colorsArr } from "../../utils/allData";
const levels = [1, 2, 3];

export default function Home() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const { currentUser, token } = useContext(userContext);

  useEffect(() => {
    const fetchData = async () => {
      // const res = await getUserData(token);
      let progressCalculation =
        (currentUser?.colorAttempted / levels.length) * 100;
      // console.log(res.data.user);
      setProgress(progressCalculation);
    };
    fetchData();
  }, []);
  return (
    <div className="color-button-container">
      <h1>Let's Play With Colors</h1>
      <div className="color-button-inner">
        {levels.map((level, i) => (
          <div className="level" key={i}>
            <button
              className="level-button"
              onClick={() =>
                navigate(`/color/lesson`, {
                  state: {
                    level,
                    data: colorsArr.slice(4 * (level - 1), 4 * level),
                  },
                })
              }
            >{`Level ${level}`}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
