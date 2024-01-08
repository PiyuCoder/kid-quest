// components/AboutPage.js
import React from "react";
import "../styles/about.css"; // Import the style file

const AboutPage = () => {
  return (
    <div className="about-container flexC">
      <div>
        <div className="hero-section">
          <h1>Welcome to KidQuest</h1>
          <p>Your child's journey to learning and fun!</p>
        </div>
        <div className="content-section">
          <p>
            KidQuest is not just a learning platform; it's a magical world where
            education meets adventure. Our carefully crafted lessons are
            designed to captivate young minds and make learning an exciting
            quest.
          </p>
          <p>
            🚀 Embark on a journey through the alphabet galaxy, explore the
            enchanted world of numbers, discover the vibrant palette of colors,
            and encounter fascinating animals along the way!
          </p>
          <p>
            We believe that every child is unique, and their learning experience
            should reflect that. KidQuest adapts to your child's pace, making
            education a personalized and enjoyable experience.
          </p>
          <p>
            Join us on this adventure where curiosity is the compass, and every
            lesson is a step towards unlocking new possibilities!
          </p>
          <p>
            For any inquiries or feedback, please contact us at{" "}
            <a href="mailto:info@kidquest.com">info@kidquest.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
