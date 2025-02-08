import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// -----------------------------------------------------------
// import { App } from "./0_setup/App"; // with Stage, no light, no shadows enabled
// import { App } from "./1_setup/App"; // with lights without Stage
import { App } from "./3_setup/App";
// -----------------------------------------------------------


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
