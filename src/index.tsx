import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./Style/Font/NotoSansKR/font.css";
import "./Style/Font/Pretendard/web/static/pretendard.css";
import "./Style/Font/Pretendard/web/static/pretendard-subset.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
