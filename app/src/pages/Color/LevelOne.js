import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Quiz from "../../components/Quiz";
import "../../styles/levelColor.css";
import { speak } from "../../utils/allData";

export default function LevelOne() {
  const [colorData, setColorData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location);

  useEffect(() => {
    setColorData(location?.state?.data);
  }, [location?.state?.data]);
  return (
    <>
      {!isQuizActive ? (
        <div className="level-color-main">
          <h1>{`Level ${location?.state?.level}`}</h1>
          <div className="level-color-container">
            {colorData.map((color, i) => (
              <div
                className="level-color"
                key={i}
                style={{ backgroundColor: color }}
                onClick={() => speak(colorData[i])}
              >
                <h1>{color}</h1>
              </div>
            ))}
          </div>
          <button onClick={() => setIsQuizActive(true)}>Next</button>
        </div>
      ) : (
        <Quiz
          category="color"
          data={location?.state}
          level={location?.state?.level}
          setIsQuizActive={setIsQuizActive}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
}
