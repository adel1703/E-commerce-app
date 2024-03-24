import {jwtDecode} from 'jwt-decode';
import React, { createContext, useState, useEffect } from 'react';

export const authContext = createContext();

export default function AuthContextProvider({ children }) {

    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);

    
    function getUserInfo() {
      const userInfo = jwtDecode(localStorage.getItem("Token"));
      console.log("userdata is :::::::", userInfo);
      setUserData(userInfo);
    }
    
    useEffect(() => {
      const tknValue = localStorage.getItem("Token");
      if (tknValue !== null) {
        setToken(tknValue);
        const userInfo = jwtDecode(localStorage.getItem("Token"));
        setUserData(userInfo);
      }
    }, []);

    return (
      <authContext.Provider value={{ token, setToken, userData, getUserInfo }}>
        {children}
      </authContext.Provider>
    );
}
