import React, { useContext, useEffect, useState } from "react";
import "../styles/numbers.css";
import { getAlphImgApi, updateCurrentIndexApi } from "../api/axios";
import toffy from "../images/candy.png";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import Quiz from "../components/Quiz";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { quizIndexGenerator, numArray, speak } from "../utils/allData";

const indexQuiz = quizIndexGenerator(numArray);

export default function Number() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSlateOn, setIsSlateOn] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, token } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      if (currentUser?.numberIndex >= numArray.length - 1) {
        setCurrentIndex(numArray.length - 1);
      } else {
        setCurrentIndex(currentUser?.numberIndex);
      }

      // console.log(currentUser?.numberIndex);
    }
  }, [currentUser]);

  const prevBtnHandler = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const nextBtnHandler = async () => {
    setIsLoading(true);
    if (currentIndex >= currentUser?.numberIndex && token) {
      const res = await updateCurrentIndexApi(
        token,
        "number",
        currentIndex + 1
      );
      console.log(res);
      if (res?.data?.success) {
        setIsLoading(false);
      }
      console.log("currentIndex", currentIndex);
    }
    if (currentIndex < numArray.length - 1) {
      if (!indexQuiz.includes(currentIndex)) {
        setCurrentIndex((prev) => prev + 1);
        setIsLoading(false);
        console.log("not included");
      } else {
        setQuizIndex(indexQuiz.indexOf(currentIndex));
        setIsQuizActive(true);
        console.log("included");
      }
    } else {
      // setCurrentIndex(0);
      navigate("/finish", { state: { category: "number" } });
    }
  };

  // const speak = () => {
  //   const utterance = new SpeechSynthesisUtterance();
  //   utterance.rate = 0.1;
  //   speechSynthesis.speak(utterance);
  // };

  const handleCloseSlate = () => {
    setIsSlateOn(false);
  };

  return (
    <>
      {!isQuizActive ? (
        <div className="number-container flexV">
          {/* <button className="open-slate" onClick={() => setIsSlateOn(true)}>
            Slate
          </button> */}
          <div className="number-top flexC">
            <button className="next-btn flexC" onClick={prevBtnHandler}>
              <GrPrevious size={30} color="white" />
            </button>
            <div className="numbers flexC">
              <div className="top-display">
                <h2>{numArray[currentIndex]}</h2>
              </div>
            </div>
            <button className="next-btn flexC" onClick={nextBtnHandler}>
              <GrNext size={30} color="white" />
            </button>
          </div>
          <div className="number-middle flexC">
            <div
              className="left flexC"
              onClick={() => speak(numArray[currentIndex])}
            >
              <h1>{numArray[currentIndex]}</h1>
            </div>

            <div
              className="right"
              onClick={() =>
                currentIndex === 0
                  ? speak(`${numArray[currentIndex]} candy`)
                  : speak(`${numArray[currentIndex]} candies`)
              }
            >
              <div className="toffy-wrapper">
                <img className="toffy" src={toffy} />
                {numArray.slice(0, currentIndex).map((item, i) => (
                  <img className="toffy" src={toffy} key={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="number-bottom flexC">
            <h1>Click the Cards!</h1>
          </div>

          {/* {isSlateOn ? (
            <div className="slate">
              <Canvas
                height={400}
                handleClose={handleCloseSlate}
                isSlateOn={isSlateOn}
              />
            </div>
          ) : (
            ""
          )} */}
        </div>
      ) : (
        <Quiz
          category="number"
          level={quizIndex + 1}
          setCurrentIndex={setCurrentIndex}
          setIsQuizActive={setIsQuizActive}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
}
