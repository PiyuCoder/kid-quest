// HomePage.js
import React, { useEffect } from "react";
import "../styles/homePage.css";

import SectionCard from "../components/SectionCard";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {token ? (
        <div className="home-page flexV">
          <h1>Select your category</h1>
          <div className="home-page-card flexC">
            <SectionCard name="Kids" kid />
            <SectionCard name="Parent" />
          </div>
        </div>
      ) : (
        <div className="login-message">
          <p>Please log in to access the home page.</p>
        </div>
      )}
    </>
  );
};

export default HomePage;
