import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";

const env = process.env.NODE_ENV;

let root;

if (env === "development") {
  root = document.getElementById("root") as HTMLElement;
} else {
  root = document.getElementById("buddy-gpt-wrapper") as HTMLElement;
}

createRoot(root);

function createRoot(htmlElement: HTMLElement) {
  ReactDOM.createRoot(htmlElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
