import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Routes from "./routes/Routes";
import { StrictMode } from "react";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </StrictMode>
);
