import React, { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../context/userContext";
import { getQuizData, getUserQuiz } from "../api/axios";
import toffy from "../images/candy.png";

const colorsArr = [
  "red",
  "green",
  "yellow",
  "blue",
  "black",
  "purple",
  "orange",
  "white",
  "pink",
  "brown",
  "maroon",
  "cyan",
];

export default function Report({
  currentTitle,
  setViewReport,
  data,
  setCurrentTitle,
}) {
  const { currentUser, token } = useContext(userContext);
  const [currentlyLearning, setCurrentlyLearning] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [userQuizzes, setUserQuizzes] = useState([]);
  const scrollRef = useRef();

  //   console.log(quizzes.filter((quiz) => quiz.isCorrect === "correct"));

  useEffect(() => {
    const fetchData = async () => {
      if (currentTitle) {
        const quizData = await getQuizData(currentTitle);
        setQuizzes(quizData?.data?.quiz);
        const userQuizData = await getUserQuiz(currentTitle, token);
        console.log(userQuizData?.data);
        setUserQuizzes(userQuizData?.data?.quizzes);
      }
    };

    fetchData();
    scrollRef.current.scrollIntoView({ block: "start" });
  }, [currentTitle, data]);

  useEffect(() => {
    switch (currentTitle) {
      case "alphabet":
        setCurrentlyLearning(data[currentUser[currentTitle + "Index"]]?.letter);
        break;

      case "number":
        setCurrentlyLearning(data[currentUser[currentTitle + "Index"]]);
        break;
      case "color":
        setCurrentlyLearning(data[currentUser[currentTitle + "Attempted"] * 4]);
        break;
      case "animal":
        setCurrentlyLearning(
          data[currentUser[currentTitle + "Attempted"]]?.name
        );
        break;

      default:
        break;
    }
  }, [currentUser, currentTitle]);

  return (
    <div className="report">
      <button
        style={{ position: "absolute", right: "0" }}
        onClick={() => {
          setViewReport(false);
          setCurrentTitle("");
        }}
      >
        Back
      </button>
      {currentUser && (
        <h2 ref={scrollRef}>
          Currently learning:
          <span className="currently">
            <p>{`${currentTitle} - ${
              !currentlyLearning ? "Completed" : currentlyLearning
            }`}</p>
          </span>
        </h2>
      )}
      <h2>
        Score:{" "}
        <span>{(userQuizzes?.length / quizzes?.length).toFixed(2) * 100}%</span>
      </h2>
      <hr />
      <h3>Quiz</h3>
      <ul className="report-quiz-container flexV">
        {quizzes?.map((quiz, i) => (
          <div key={i} className="report-quiz">
            <p>
              {`Q${i + 1}.
               `}
              <span className="report-quiz-ques">{quiz?.question}</span>
              <span
                className="isCorrect"
                style={{
                  color: `${
                    currentUser?.correctQuizzes.includes(quiz?._id) &&
                    currentUser?.completedQuizzes.includes(quiz?._id)
                      ? "green"
                      : "red"
                  }`,
                }}
              >
                {currentUser?.completedQuizzes.includes(quiz?._id)
                  ? currentUser?.correctQuizzes.includes(quiz?._id)
                    ? "Correct"
                    : "Incorrect"
                  : "Not attempted"}
              </span>
            </p>
            <div className="report-quiz-img">
              {currentTitle !== "alphabet" ||
              currentTitle !== "number" ||
              currentTitle !== "animal" ? (
                currentTitle === "alphabet" || currentTitle === "animal" ? (
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/Images/${currentTitle}s/${quiz?.answer}.png`}
                  />
                ) : (
                  colorsArr
                    .slice(0, parseInt(quiz?.answer))
                    .map((el, i) => <img src={toffy} key={i} />)
                )
              ) : (
                ""
              )}

              {currentTitle === "color" ? (
                <div
                  className="report-quiz-color"
                  style={{
                    backgroundColor: `${quiz?.answer}`,
                  }}
                ></div>
              ) : (
                ""
              )}
            </div>
            {/* <p>
              Response:{" "}
              <span className="report-quiz-ans">{quiz?.answered}</span>
            </p> */}
            <h5>
              Comment:
              <span
                className="comment"
                style={{
                  color: `${
                    currentUser?.correctQuizzes.includes(quiz?._id) &&
                    currentUser?.completedQuizzes.includes(quiz?._id)
                      ? "green"
                      : "red"
                  }`,
                }}
              >
                {currentUser?.correctQuizzes.includes(quiz?._id) &&
                currentUser?.completedQuizzes.includes(quiz?._id)
                  ? "Your kid is doing great!!"
                  : currentUser?.incorrectQuizzes.includes(quiz?._id) &&
                    currentUser?.completedQuizzes.includes(quiz?._id)
                  ? `Needs to learn again about ${currentTitle} ${quiz?.answer}`
                  : "Has not attempted yet."}
              </span>
            </h5>
          </div>
        ))}
      </ul>
      <hr />
      <h2>Remarks</h2>
    </div>
  );
}
