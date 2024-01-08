import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { userContext } from "../context/userContext";
import { IoMenu } from "react-icons/io5";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, setFlag } = useContext(userContext);
  const [isMobile, setIsMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const storedToken = localStorage.getItem("token");

  const clickHandler = () => {
    setOpenMenu(false);
    if (storedToken) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

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

  return (
    <nav className="navbar">
      {isMobile ? (
        <div
          className="flexC"
          style={{
            backgroundColor: "purple",
            borderRadius: "8px",
            padding: "1% 3%",
          }}
          onClick={() => setOpenMenu(true)}
        >
          <IoMenu size={25} color="white" />
        </div>
      ) : (
        <>
          <div>
            <Link to="/dashboard" className="nav-link">
              Home
            </Link>

            <Link to="/about" className="nav-link">
              About
            </Link>
            {storedToken && (
              <>
                <Link to="/kids" className="nav-link">
                  Kid
                </Link>
                <Link
                  to="/parents"
                  className="nav-link"
                  onClick={() => setFlag((prev) => !prev)}
                >
                  Parent
                </Link>
              </>
            )}
          </div>
          <div>
            {location.pathname === "/dashboard" ? (
              <button className="nav-link login-button" onClick={clickHandler}>
                {token ? "Logout" : "Login"}
              </button>
            ) : null}
          </div>
        </>
      )}
      {openMenu ? (
        <div className="menu-container">
          <ul className="menu flexV">
            <Link to="/dashboard" onClick={() => setOpenMenu(false)}>
              Home
            </Link>

            <Link to="/about" onClick={() => setOpenMenu(false)}>
              About
            </Link>
            {storedToken && (
              <>
                <Link to="/kids" onClick={() => setOpenMenu(false)}>
                  Kid
                </Link>
                <Link
                  to="/parents"
                  onClick={() => {
                    setOpenMenu(false);
                    setFlag((prev) => !prev);
                  }}
                >
                  Parent
                </Link>
              </>
            )}
            <div>
              {location.pathname === "/dashboard" ? (
                <button
                  className="nav-link login-button"
                  onClick={clickHandler}
                >
                  {token ? "Logout" : "Login"}
                </button>
              ) : null}
            </div>
            <button onClick={() => setOpenMenu(false)}>Close</button>
          </ul>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}
