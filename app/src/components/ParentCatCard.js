import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import { getAlphImgApi } from "../api/axios";
import { animalImages } from "../utils/animalImg";

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

const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function ParentCatCard({
  resetSectionHandler,
  title,
  setTotalData,
  getReportHandler,
  currentTitle,
  setAllDataLoaded,
}) {
  const navigate = useNavigate();
  const { setFlag, currentUser } = useContext(userContext);
  const [data, setData] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAlphImgApi();
      switch (title) {
        case "alphabet":
          setData(res?.data?.alphData);
          break;

        case "number":
          setData(numArray);
          break;
        case "color":
          setData(colorsArr);
          break;
        case "animal":
          setData(animalImages);
          setAllDataLoaded(true);
          break;

        default:
          break;
      }
      if (currentUser && data) {
        const percentageCalc =
          title === "color"
            ? currentUser[title + "Attempted"] * 4
            : currentUser[title + "Index"];
        setPercentage(percentageCalc / data?.length);
      }

      if (isNaN(percentage) || !isFinite(percentage) || percentage < 0) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser, title, percentage]);

  useEffect(() => {
    setTotalData((prev) => prev + data?.length);

    return () => {
      setTotalData((prev) => {
        if (prev) {
          return prev - data?.length;
        }

        return prev;
      });
    };
  }, [isLoading]);

  return (
    <div
      className="parent-cat-card flexV"
      onClick={() => getReportHandler(title, data)}
      style={{
        border: ` ${title === currentTitle ? "2px solid blue" : "initial"}`,
      }}
    >
      {/* <img src={catImg} /> */}
      {!isLoading ? (
        <>
          <progress value={percentage?.toString()} />
          <label>
            {`${
              percentage && isFinite(percentage)
                ? Math.round(percentage * 100)
                : 0
            }`}
            %
          </label>
        </>
      ) : (
        "Loading..."
      )}

      <p>{title}</p>
      {title === currentTitle && percentage !== 0 ? (
        <button
          onClick={() => resetSectionHandler(title)}
          style={{ fontSize: "small", padding: "3%" }}
        >
          Reset
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
