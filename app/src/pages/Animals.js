import React, { useContext, useEffect, useState } from "react";
import { animalImages } from "../utils/animalImg";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import "../styles/animal.css";
import Quiz from "../components/Quiz";
import { updateCurrentIndexApi } from "../api/axios";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { quizIndexGenerator, speak } from "../utils/allData";

const indexQuiz = quizIndexGenerator(animalImages);

export default function Animals() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizIndex, setQuizIndex] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, token } = useContext(userContext);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setCurrentIndex(currentUser?.animalIndex);
      console.log(currentUser?.animalIndex);
    }
  }, [currentUser]);

  const nextBtnHandler = async () => {
    setIsLoading(true);
    if (currentIndex >= currentUser?.animalIndex && token) {
      const res = await updateCurrentIndexApi(
        token,
        "animal",
        currentIndex + 1
      );

      if (res?.data?.success) {
        setIsLoading(false);
      }
    }

    if (currentIndex < animalImages.length - 1) {
      if (!indexQuiz.includes(currentIndex)) {
        setCurrentIndex((prev) => prev + 1);
        setIsLoading(false);
      } else {
        setQuizIndex(indexQuiz.indexOf(currentIndex));
        setIsQuizActive(true);
      }
    } else {
      setIsFinished(true);
      navigate("/finish", { state: { category: "animal" } });
    }
  };

  return (
    <>
      {!isQuizActive ? (
        <div className="animal-main flexV">
          <div
            className="animalImg-container flexV"
            onClick={() => speak(animalImages[currentIndex]?.name)}
          >
            {!isLoading ? (
              <>
                <div className="animal-name-container">
                  <h1>{animalImages[currentIndex]?.name}</h1>
                </div>
                <img
                  className="animalImg"
                  src={animalImages[currentIndex]?.image}
                  alt={animalImages[currentIndex]?.name}
                />
              </>
            ) : (
              <img
                className="loader-animal"
                src="https://media.tenor.com/X9by5OQoqs0AAAAi/horse.gif"
              />
            )}
          </div>

          <div className="alphabet-top flexC">
            <button
              className="next-btn flexC"
              onClick={() =>
                setCurrentIndex((prev) => (currentIndex > 0 ? prev - 1 : prev))
              }
            >
              <GrPrevious size={30} color="white" />
            </button>
            <div className="alphabets flexC">
              <div className="top-display">
                <h2>{currentIndex + 1}</h2>
              </div>
            </div>
            <button className="next-btn flexC" onClick={nextBtnHandler}>
              <GrNext size={30} color="white" />
            </button>
          </div>
        </div>
      ) : (
        <Quiz
          category="animal"
          data={animalImages}
          level={quizIndex + 1}
          setCurrentIndex={setCurrentIndex}
          setIsQuizActive={setIsQuizActive}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
}
