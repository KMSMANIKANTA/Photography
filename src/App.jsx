import React from "react";
import { Routes, Route } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { useTheme } from "./context/ThemeContext";
import { useUI } from "./context/UIContext";

function App() {
  const { darkMode, toggleTheme } = useTheme();
  const { mousePos } = useUI();

  return (
    <div className={darkMode ? "dark" : "light"}>
      <div className="min-h-screen relative">
        {/* Neon cursor (only on homepage) */}
        <div
          className="neon-cursor"
          style={{
            backgroundColor: darkMode ? "#71F6FB" : "#EE1B9C",
            transform: `translate(${mousePos.x - 10}px, ${mousePos.y - 10}px)`,
          }}
        />

        <Navbar>
          <button
            onClick={toggleTheme}
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
  );
}

export default App;
