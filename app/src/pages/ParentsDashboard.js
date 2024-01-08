import React, { useContext, useEffect, useState } from "react";
import ParentCatCard from "../components/ParentCatCard";
import "../styles/parentDashboard.css";
import { userContext } from "../context/userContext";
import { getAlphImgApi, resetSectionApi } from "../api/axios";
import Report from "../components/Report";
import { parentThoughts } from "../utils/thoughtGenerator";

const titleArr = ["alphabet", "number", "color", "animal"];

export default function ParentsDashboard() {
  const { currentUser, token, setFlag } = useContext(userContext);
  const [totalData, setTotalData] = useState(0);
  const [totalIndex, setTotalIndex] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [viewReport, setViewReport] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [thought, setThought] = useState(
    parentThoughts[Math.floor(Math.random() * parentThoughts.length)]
  );
  const [data, setData] = useState([]);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  let sumOfAttempted = 0;

  useEffect(() => {
    document.title = "Parent Dashboard";
    if (currentUser) {
      for (let i = 0; i < titleArr.length; i++) {
        sumOfAttempted +=
          titleArr[i] === "color"
            ? currentUser[titleArr[i] + "Attempted"] * 4
            : currentUser[titleArr[i] + "Index"];
      }

      setTotalIndex(sumOfAttempted);
      // setThought(randomThought);
    }
  }, [currentUser]);

  useEffect(() => {
    if (totalData && totalIndex) {
      setTotalProgress(totalIndex / totalData);
    }

    return () => {
      setTotalProgress(0);
    };
  }, [totalData, currentUser]);

  useEffect(() => {
    const roundedProgress = Math.round(totalProgress * 100);

    // if (roundedProgress < 20) {
    //   console.log("below 20");
    // } else if (roundedProgress >= 20 && roundedProgress < 40) {
    //   console.log("between 20 and 40");
    // } else if (roundedProgress >= 40 && roundedProgress < 80) {
    //   console.log("between 40 and 80");
    // } else if (roundedProgress >= 80) {
    //   console.log("above 80");
    // }
  }, [totalProgress]);

  const getReportHandler = (title, currData) => {
    console.log(title);
    setCurrentTitle(title);
    setViewReport(true);
    setData(currData);
  };

  const resetSectionHandler = async (section) => {
    console.log("sec", section);
    const res = await resetSectionApi(token, section);
    console.log(res);
    setFlag((prev) => !prev);
  };

  return (
    <div className="parents-dashboard flexC">
      <div className="parents-inner-container flexV">
        {!viewReport ? (
          <h1>{`${currentUser?.name.split(" ")[0]}'s progress`}</h1>
        ) : (
          <h1>
            <u>{currentTitle} progress</u>
          </h1>
        )}
        {!viewReport ? (
          <div className="profile">
            <h2>Total progress</h2>
            {allDataLoaded ? (
              <>
                <progress value={totalProgress} />
                <label>{Math.round(totalProgress * 100)}%</label>
              </>
            ) : (
              "Loading..."
            )}
          </div>
        ) : (
          <Report
            currentTitle={currentTitle}
            setViewReport={setViewReport}
            data={data}
            setCurrentTitle={setCurrentTitle}
          />
        )}
        <div className="parent-cat-card-container flex">
          {titleArr.map((cat, i) => (
            <ParentCatCard
              resetSectionHandler={resetSectionHandler}
              key={i}
              title={cat}
              setTotalData={setTotalData}
              setTotalIndex={setTotalIndex}
              getReportHandler={getReportHandler}
              currentTitle={currentTitle}
              setAllDataLoaded={setAllDataLoaded}
            />
          ))}
        </div>
        {!viewReport ? (
          <div className="thought">
            <h2>{thought}</h2>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
