import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

if (typeof window !== "undefined") {
  const currentUrl = new URL(window.location.href);
  const redirectPath = currentUrl.searchParams.get("redirect");
  if (redirectPath) {
    const normalizedPath = redirectPath.startsWith("/") ? redirectPath : `/${redirectPath}`;
    const passthroughParams = new URLSearchParams(currentUrl.search);
    passthroughParams.delete("redirect");
    const passthroughQuery = passthroughParams.toString();
    const nextUrl = `${normalizedPath}${passthroughQuery ? `?${passthroughQuery}` : ""}${window.location.hash}`;
    window.history.replaceState({}, "", nextUrl);
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
