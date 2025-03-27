import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Camera, Sun, Moon } from "lucide-react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Router>
      <div className={darkMode ? "dark" : "light"}>
        <div className="min-h-screen relative">
          {/* Neon cursor (only on homepage) */}
          <div
            className="neon-cursor"
            style={{
              backgroundColor: darkMode ? "#71F6FB" : "#EE1B9C",
              transform: `translate(${mousePos.x - 10}px, ${
                mousePos.y - 10
              }px)`,
            }}
          />

          <Navbar>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {darkMode ? (
                <Sun className="text-neon-yellow" />
              ) : (
                <Moon className="text-neon-purple" />
              )}
            </button>
          </Navbar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
