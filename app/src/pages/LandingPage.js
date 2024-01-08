import React from "react";
import { Link } from "react-router-dom";
import "../styles/landingPage.css";

const LandingPage = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="landing-container">
      <header>
        <h1>KidQuest</h1>
        <p>Explore and Learn in a Fun Way!</p>
      </header>
      <main>
        <section className="feature">
          <h2>Interactive Lessons</h2>
          <p>Engaging lessons designed for kids to learn through play.</p>
        </section>
        <section className="feature">
          <h2>Exciting Quizzes</h2>
          <p>Test your knowledge with fun and interactive quizzes.</p>
        </section>
      </main>
      <footer>
        <Link to={token ? "/dashboard" : "/login"}>
          <button className="cta-button">Get Started</button>
        </Link>
      </footer>
    </div>
  );
};

export default LandingPage;
