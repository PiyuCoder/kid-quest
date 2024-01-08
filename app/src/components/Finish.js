import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/finish.css";

export default function FinishModal() {
  const location = useLocation();
  const [data, setData] = useState();
  const navigate = useNavigate();

  // console.log(location);
  useEffect(() => {
    setData(location?.state?.category);
  }, [location?.state]);

  return (
    <div className="finish-modal flexC">
      <div className="finish-modal-content flexV">
        <h1>Woohoo!!</h1>
        <p>
          Congratulations you have successfully completed the {data} section!!
        </p>
        <button onClick={() => navigate(`/${data}`, { replace: true })}>
          Okay
        </button>
      </div>
    </div>
  );
}
