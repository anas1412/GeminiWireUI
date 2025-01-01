import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import WiresPage from "./pages/WiresPage";
import WireflowsPage from "./pages/WireflowsPage";
import HomePage from "./pages/HomePage";
import GuidePage from "./pages/GuidePage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-4 text-white bg-blue-600 shadow-lg">
          <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
            <h1 className="mb-4 text-2xl font-bold md:mb-0">GeminiWire</h1>
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link
                to="/"
                className="transition duration-300 hover:underline hover:text-blue-100"
              >
                Home
              </Link>
              <Link
                to="/wires"
                className="transition duration-300 hover:underline hover:text-blue-100"
              >
                Wires
              </Link>
              <Link
                to="/wireflows"
                className="transition duration-300 hover:underline hover:text-blue-100"
              >
                Wireflows
              </Link>
              <Link
                to="/guide"
                className="transition duration-300 hover:underline hover:text-blue-100"
              >
                Guide
              </Link>
              <Link
                to="/about"
                className="transition duration-300 hover:underline hover:text-blue-100"
              >
                About
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container flex-1 p-4 mx-auto md:p-6">
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Home Page */}
            <Route path="/wires" element={<WiresPage />} /> {/* Wires Page */}
            <Route path="/wireflows" element={<WireflowsPage />} />{" "}
            {/* Wireflows Page */}
            <Route path="/guide" element={<GuidePage />} /> {/* Guide Page */}
            <Route path="/about" element={<AboutPage />} /> {/* About Page */}
          </Routes>
        </main>

        {/* Footer */}
        <footer className="py-4 text-white bg-blue-600">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Anas B. All rights reserved. |
              Powered by Google's Gemini AI
            </p>
            <p className="mt-1 text-xs">Free to use, forever.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
