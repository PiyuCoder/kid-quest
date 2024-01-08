import React, { useContext, useEffect, useState } from "react";
import { loginApi } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { userContext } from "../context/userContext";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [phoneBorderColor, setPhoneBorderColor] = useState("");
  const [passBorderColor, setPassBorderColor] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const { setToken } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check on mount
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (phone && password) {
      const res = await loginApi(phone, password);

      if (res?.data?.success) {
        navigate("/dashboard");
        localStorage.setItem("token", res?.data?.token);
        setToken(res?.data?.token);
      } else {
        setMessage("*Incorrect phone number or password");
      }
    } else if (!phone) {
      setMessage("*Phone no. is mandatory");
      setPhoneBorderColor("red");
    } else {
      setMessage("*Password is mandatory");
      setPassBorderColor("red");
    }
  };
  return (
    <div className="login-main flex">
      <div className="login-container">
        <form onSubmit={submitHandler} className="login-form">
          <h2>Login here</h2>
          <input
            style={{ borderColor: phoneBorderColor }}
            type="phone"
            maxLength={10}
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            style={{ borderColor: passBorderColor }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log in</button>
          <div>
            New User?<Link to={"/register"}>Register</Link>
          </div>
        </form>
        <p>{message}</p>
      </div>
      {!isMobile ? (
        <div className="why-kidquest-container">
          <div className="why-kidquest-content">
            <h2 className="why-kidquest-heading">Why KidQuest?</h2>
            <p className="why-kidquest-text">
              KidQuest is a unique learning platform designed with your child's
              growth and development in mind. Here's why you should choose
              KidQuest:
            </p>
            <ul className="why-kidquest-list">
              <li>
                <strong>Engaging Learning Experience:</strong> Our interactive
                and fun lessons make learning enjoyable for kids of all ages.
              </li>
              <li>
                <strong>Comprehensive Curriculum:</strong> KidQuest covers a
                wide range of subjects, including alphabets, numbers, colors,
                animals, and more.
              </li>
              <li>
                <strong>Progress Tracking:</strong> Parents can monitor their
                child's progress through our user-friendly dashboard.
              </li>
              <li>
                <strong>Quiz Challenges:</strong> Fun quizzes after each lesson
                help reinforce learning and keep kids motivated.
              </li>
              <li>
                <strong>Safe and Secure:</strong> KidQuest prioritizes the
                safety and privacy of your child's information.
              </li>
            </ul>
            <p className="why-kidquest-text">
              Join KidQuest today and embark on a delightful learning journey
              with your child!
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
