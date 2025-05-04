import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RedirectPage from "./pages/RedirectPage";
import UrlList from "./pages/UrlList";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:shortId" element={<RedirectPage />} />
        <Route path="/list" element={<UrlList />} />
      </Routes>
    </Router>
  );
}