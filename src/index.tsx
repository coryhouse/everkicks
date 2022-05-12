import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppDevTools } from "./AppDevTools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./UserContext";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <UserContextProvider>
    <ToastContainer />
    {process.env.REACT_APP_SHOW_DEV_TOOLS === "Y" ? <AppDevTools /> : <App />}
  </UserContextProvider>
);
