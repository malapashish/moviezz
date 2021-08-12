import React, { useState, useEffect } from "react";
import DarkModeToggle from "react-dark-mode-toggle";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark-theme");

  let currentTheme = sessionStorage.getItem("theme");

  const toggleThemeHandler = () => {
    if (localStorage.getItem("theme") === "theme-dark") {
      themeHandler("theme-light");
      setTheme("light-theme");
    } else {
      themeHandler("theme-dark");
      setTheme("dark-theme");
    }
  };

  const themeHandler = (themeName) => {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("dark-theme");
      themeHandler("theme-dark");
    } else if (localStorage.getItem("theme") === "theme-light") {
      setTheme("light-theme");
      themeHandler("theme-light");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("dark-theme");
    } else if (localStorage.getItem("theme") === "theme-light") {
      setTheme("light-theme");
    }
  }, [currentTheme]);

  return (
    <DarkModeToggle
      onChange={toggleThemeHandler}
      checked={theme === "dark-theme" ? true : false}
      size={90}
      className="nav-link toggle-button"
    />
  );
};

export default ThemeToggle;
