import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppDevTools } from "./AppDevTools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./UserContext";
import App from "./App";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <ToastContainer />
          {process.env.REACT_APP_SHOW_DEV_TOOLS === "Y" ? (
            <AppDevTools />
          ) : (
            <App />
          )}
        </UserContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
