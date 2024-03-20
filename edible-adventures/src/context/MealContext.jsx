// context/MealContext.js
import React, { createContext, useState } from "react";

export const MealContext = createContext();

export const MealContextProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);

  return (
    <MealContext.Provider value={{ meals, setMeals }}>
      {children}
    </MealContext.Provider>
  );
};
