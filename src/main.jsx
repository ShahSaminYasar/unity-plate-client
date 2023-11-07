import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "preline";
import index from "./routes/index.jsx";
import SettingsProvider from "./providers/SettingsProvider.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <AuthProvider>
          <RouterProvider router={index}></RouterProvider>
          <Toaster />
        </AuthProvider>
      </SettingsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
