import React, { createContext, useEffect, useState } from "react";
import { getUserData } from "../api/axios";

export const userContext = createContext();

export default function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [token, setToken] = useState();
  const [flag, setFlag] = useState(false);
  const jwt = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (jwt) {
        setToken(jwt);
        const res = await getUserData(jwt);
        setCurrentUser(res?.data?.user);
      }
    };

    fetchData();
  }, [setToken, flag]);

  return (
    <userContext.Provider
      value={{ currentUser, setCurrentUser, token, setToken, setFlag }}
    >
      {children}
    </userContext.Provider>
  );
}
