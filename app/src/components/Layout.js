import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { userContext } from "../context/userContext";

export default function Layout() {
  const { token } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();

  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (
      !storedToken &&
      location.pathname !== "/" &&
      location.pathname !== "/register"
    ) {
      navigate("/login");
    }
  }, [token, location.pathname]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
