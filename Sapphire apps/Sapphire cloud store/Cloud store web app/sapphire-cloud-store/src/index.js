import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { StyledEngineProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>
);