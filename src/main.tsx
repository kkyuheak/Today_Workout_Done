import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./css/index.css";
import { BrowserRouter } from "react-router";
import ScrollToTop from "./utils/scroll-to-top.ts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {/* 스크롤 맨위로 올리기 */}
    <ScrollToTop />
    <App />
  </BrowserRouter>
);
