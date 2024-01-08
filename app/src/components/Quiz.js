import React, { useContext, useEffect, useState } from "react";
import { getQuizData, submitAnswer } from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/quiz.css";
import toffy from "../images/candy.png";
import { userContext } from "../context/userContext";
import { colorsArr } from "../utils/allData";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

export default function Quiz({
  category,
  level,
  setIsQuizActive,
  setCurrentIndex,
  data,
  setIsLoading,
}) {
  const [quizzes, setQuizzes] = useState([]);
  const [answer, setAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { currentUser, token } = useContext(userContext);
  const navigate = useNavigate();

  const index = level - 1;

  useEffect(() => {
    const fetchData = async () => {
      const quizData = await getQuizData(category);
      setQuizzes(quizData?.data?.quiz);
    };

    fetchData();
  }, [category, level]);

  const nextBtnHandler = () => {
    if (
      category !== "alphabet" &&
      category !== "number" &&
      category !== "animal"
    ) {
      let newLevel = level + 1;
      let newData = colorsArr.slice(4 * (newLevel - 1), 4 * newLevel);

      setIsQuizActive(false);
      if (newLevel > colorsArr.length / 4) {
        navigate("/finish", { state: { category: "color" } });
      } else {
        navigate(`/${category}/lesson`, {
          state: {
            data: newData,
            level: newLevel,
          },
        });
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
      setIsQuizActive(false);
    }
    setIsLoading(false);
  };

  const submitHandler = async () => {
    if (
      category !== "alphabet" &&
      category !== "number" &&
      category !== "animal"
    ) {
      //Color handler

      let newLevel = level + 1;
      let newData = colorsArr.slice(4 * (newLevel - 1), 4 * newLevel);
      const res = await submitAnswer(answer, token, quizzes[index]?._id);
      setIsQuizActive(false);
      console.log(newLevel);
      if (newLevel > colorsArr.length / 4) {
        navigate("/finish", { state: { category: "color" } });
      } else {
        navigate(`/${category}/lesson`, {
          state: {
            data: newData,
            level: newLevel,
          },
        });
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
      const res = await submitAnswer(answer, token, quizzes[index]?._id);
      setIsQuizActive(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="quiz-main">
      <div className="quiz-container">
        <h1 className="quiz-title">{quizzes[index]?.title}</h1>
        <div className="question-container">
          <h2 className="quiz-question">{`${index + 1}. ${
            quizzes[index]?.question
          }`}</h2>
        </div>

        <div
          className="quiz-answer-color"
          style={{
            backgroundColor: quizzes[index]?.answer,
          }}
        >
          {quizzes[index]?.answer !== undefined &&
          (category !== "alphabet" ||
            category !== "number" ||
            category !== "animal") ? (
            category === "alphabet" || category === "animal" ? (
              <img
                src={`${baseUrl}/Images/${category}s/${quizzes[index]?.answer}.png`}
              />
            ) : (
              colorsArr
                .slice(0, parseInt(quizzes[index]?.answer))
                .map((el, i) => <img src={toffy} key={i} />)
            )
          ) : (
            ""
          )}
        </div>
        <h4>Options:</h4>
        <ul className="quiz-options flexC">
          {quizzes[index]?.options.map((option, i) => (
            <div
              className={`quiz-option flex ${
                selectedOption === i ? "selected" : ""
              }`}
              onClick={() => {
                setAnswer(option);
                setIsAnswered(true);
                setSelectedOption(i);
              }}
              key={i}
            >
              <p>{option}</p>
            </div>
          ))}
        </ul>
        <button
          className="quiz-button"
          onClick={() => {
            setIsLoading(false);
            setIsQuizActive(false);
          }}
        >
          Back
        </button>
        {isAnswered ? (
          <button className="quiz-button" onClick={submitHandler}>
            Submit
          </button>
        ) : (
          <button className="quiz-button" disabled>
            Submit
          </button>
        )}
        {currentUser?.completedQuizzes.includes(quizzes[index]?._id) ? (
          <button className="quiz-button" onClick={nextBtnHandler}>
            Next
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
