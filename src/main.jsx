import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter basename="/qwize-project">
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
);
