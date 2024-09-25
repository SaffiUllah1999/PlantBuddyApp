import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createContext, useContext } from "react";

const ThemeContext = createContext(null);

export const DataProvidor = ({ children }: { children: React.ReactNode }) => {

  const [userData, setUserData] = useState({ email: "" });

  const contextValue = {
    userData,
    setUserData,
  };

  return (

    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
    
  );
};

export const useData = () => useContext(ThemeContext);
