import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  // Colors
  const [theme, setTheme] = useState("purple");
  const [bgColor, setBgColor] = useState("");
  const [bgColorAlt, setBgColorAlt] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryColorAlt, setPrimaryColorAlt] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [bgGradient, setBgGradient] = useState("from-green-100 to-green-50");

  useEffect(() => {
    setBgColor(theme === "purple" ? "bg-purple-100" : "bg-green-100");
    setBgColorAlt(theme === "purple" ? "bg-pink-700" : "bg-teal-700");
    setPrimaryColor(theme === "purple" ? "text-pink-700" : "text-teal-700");
    setPrimaryColorAlt(theme === "purple" ? "text-pink-100" : "text-teal-100");
    setBorderColor(theme === "purple" ? "border-pink-700" : "border-teal-700");
    setBgGradient(
      theme === "purple"
        ? "from-purple-200 to-purple-50 to-red-200"
        : "from-green-200 to-green-50 to-teal-200"
    );
  }, [theme]);

  const values = {
    theme,
    setTheme,
    bgColor,
    bgColorAlt,
    primaryColor,
    primaryColorAlt,
    borderColor,
    bgGradient,
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node,
};

export default SettingsProvider;
