import { createContext, useEffect, useState } from "react";

const initialTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
export const DarkLightContext = createContext(initialTheme);

export const DarkLightProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || false);

    useEffect(() => {
      localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(!theme)
    }
  
    return (
      <DarkLightContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </DarkLightContext.Provider>
    )
  }