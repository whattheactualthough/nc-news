import React from "react";
import { createContext, useState, useContext } from "react";


const defaultUser = {
  username: "",
  avatarUrl: "",
  isLoggedIn: false,
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const logIn = (event) => {
    event.preventDefault();
    setUser((prevUser) => ({
        ...prevUser,
        username: "grumpy19",
        name: "Paul Grump",
        avatarUrl: "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
        isLoggedIn: true,
      }));
    };
  

  const logOut = (event) => {
    event.preventDefault();
    setUser(defaultUser);
  };

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

