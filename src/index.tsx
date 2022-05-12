import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppDevTools } from "./AppDevTools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <UserContextProvider>
    <ToastContainer />
    {/* TODO: Only call AppDevTools based on ENV var */}
    <AppDevTools />
  </UserContextProvider>
);
