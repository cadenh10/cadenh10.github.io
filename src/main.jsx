import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

if (typeof window !== "undefined") {
  const currentUrl = new URL(window.location.href);
  const redirectPath = currentUrl.searchParams.get("redirect");
  if (redirectPath) {
    const normalizedPath = redirectPath.startsWith("/") ? redirectPath : `/${redirectPath}`;
    window.history.replaceState({}, "", `${normalizedPath}${window.location.hash}`);
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
