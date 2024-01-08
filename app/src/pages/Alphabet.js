import React, { useContext, useEffect, useState } from "react";
import "../styles/alphabet.css";
import { getAlphImgApi, updateCurrentIndexApi } from "../api/axios";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import Quiz from "../components/Quiz";
import loader from "../images/cubes.gif";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { quizIndexGenerator, speak } from "../utils/allData";

const indexQuiz = quizIndexGenerator(Array.from(Array(26).keys()));
const baseUrl = process.env.REACT_APP_BASE_URL;

export default function Alphabet() {
  const [currentIndex, setCurrentIndex] = useState();
  const [alphData, setAlphData] = useState([]);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, token, setFlag } = useContext(userContext);
  const navigate = useNavigate();

  console.log(alphData);
  console.log(currentUser);

  const prevBtnHandler = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (currentUser) {
      setCurrentIndex(currentUser?.alphabetIndex);
      console.log(currentUser?.alphabetIndex);
    }
  }, [currentUser]);

  const nextBtnHandler = async () => {
    setIsLoading(true);
    if (
      currentIndex >= currentUser?.alphabetIndex &&
      token &&
      currentIndex < alphData.length - 1
    ) {
      const res = await updateCurrentIndexApi(
        token,
        "alphabet",
        currentIndex + 1
      );
      console.log(res);
      if (res?.data?.success) {
        setIsLoading(false);
      }
      // console.log("currentIndex", currentIndex);
    } else {
      // console.log("currIndex is less");
    }

    if (currentIndex < alphData.length - 1) {
      if (!indexQuiz.includes(currentIndex)) {
        setCurrentIndex((prev) => prev + 1);
        setIsLoading(false);
      } else {
        setQuizIndex(indexQuiz.indexOf(currentIndex));
        setIsQuizActive(true);
      }
    } else {
      setIsLoading(false);
      navigate("/finish", { state: { category: "alphabet" } });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAlphImgApi();
      setAlphData(res?.data?.alphData);
    };

    fetchData();
  }, [currentIndex, setCurrentIndex]);

  return (
    <>
      {!isQuizActive ? (
        <div className="alphabet-container flexV">
          <div className="alphabet-top flexC">
            <button className="next-btn flexC" onClick={prevBtnHandler}>
              <GrPrevious size={30} color="white" />
            </button>
            <div className="alphabets flexC">
              <div className="top-display">
                <h2>{alphData[currentIndex]?.letter}</h2>
              </div>
            </div>
            <button className="next-btn flexC" onClick={nextBtnHandler}>
              <GrNext size={30} color="white" />
            </button>
          </div>
          <div className="alphabet-middle flexC">
            {!isLoading ? (
              <div
                className="left flexC"
                onClick={() => speak(alphData[currentIndex]?.letter)}
              >
                <h1>{alphData[currentIndex]?.letter}</h1>
              </div>
            ) : (
              ""
            )}
            <div
              className="right flexC"
              onClick={() => speak(alphData[currentIndex]?.image.split(".")[0])}
            >
              {!isLoading ? (
                alphData[currentIndex]?.image !== undefined && (
                  <img
                    src={`${baseUrl}/Images/alphabets/${alphData[currentIndex]?.image}`}
                  />
                )
              ) : (
                <img
                  className="loader-alphabet"
                  style={{ width: "10%" }}
                  src={loader}
                />
              )}
              <div className="objName">
                <h2>
                  {alphData[currentIndex]?.image.split(".")[0].toUpperCase()}
                </h2>
              </div>
            </div>
          </div>
          <div className="alphabet-bottom flexC">
            <h1>Click the Cards!</h1>
          </div>
        </div>
      ) : (
        <Quiz
          category="alphabet"
          data={alphData}
          level={quizIndex + 1}
          setCurrentIndex={setCurrentIndex}
          setIsQuizActive={setIsQuizActive}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
}
