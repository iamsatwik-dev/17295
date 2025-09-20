import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ShortenerPage from "./pages/ShortenerPage";
import StatsPage from "./pages/StatsPage";
import { getUrls, recordClick } from "./utils/storage";
import { logEvent } from "./utils/logger";

function RedirectHandler() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if (id) {
      const urls = getUrls();
      const entry = urls[id];
      if (entry) {
        const now = new Date();
        if (now < new Date(entry.expiresAt)) {
          recordClick(id);
          logEvent("info", "Redirecting", { shortcode: id });
          window.location.href = entry.originalUrl;
        } else {
          logEvent("error", "Link expired", { shortcode: id });
          alert("This link has expired!");
        }
      } else {
        logEvent("error", "Shortcode not found", { shortcode: id });
        alert("Invalid shortcode!");
      }
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <RedirectHandler />
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
