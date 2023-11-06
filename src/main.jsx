import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "preline";
import index from "./routes/index.jsx";
import SettingsProvider from "./providers/SettingsProvider.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SettingsProvider>
      <AuthProvider>
        <RouterProvider router={index}></RouterProvider>
      </AuthProvider>
    </SettingsProvider>
  </React.StrictMode>
);
