import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // If you don’t have index.css, remove this line.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
