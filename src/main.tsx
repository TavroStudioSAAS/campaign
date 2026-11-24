import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initTracking } from "./tracking";

initTracking();

const app = (
  <React.Fragment>
    <App />
  </React.Fragment>
);
const rootEl = document.getElementById("root")!;
if (rootEl.hasChildNodes()) ReactDOM.hydrateRoot(rootEl, app);
else ReactDOM.createRoot(rootEl).render(app);
