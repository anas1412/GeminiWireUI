import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import WiresPage from "./pages/WiresPage";
import WireflowsPage from "./pages/WireflowsPage";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 text-white bg-blue-600">
          <div className="container flex items-center justify-between mx-auto">
            <h1 className="text-xl font-bold">GeminiWire</h1>
            <nav className="space-x-4">
              <Link to="/" className="hover:underline">
                Wires
              </Link>
              <Link to="/wireflows" className="hover:underline">
                Wireflows
              </Link>
            </nav>
          </div>
        </header>

        <main className="container flex-1 p-6 mx-auto">
          <Routes>
            <Route path="/" element={<WiresPage />} />
            <Route path="/wireflows" element={<WireflowsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
