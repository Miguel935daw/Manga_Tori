import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const value = {
    theme,
    toggleTheme,
    setTheme
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(){
    return useContext(ThemeContext)
}

