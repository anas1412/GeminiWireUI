import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaBook } from "react-icons/fa"; // Import icons from react-icons

const HomePage = () => {
  return (
    <div className="text-center">
      {/* Hero Section */}
      <div className="text-gray-800 py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">
          Welcome to GeminiWire
        </h1>
        <p className="text-lg md:text-xl mb-6 md:mb-8 px-4">
          Streamline your workflows with{" "}
          <strong>declarative programming</strong>, powered by Google's Gemini
          AI. Free, intuitive, and designed for everyone.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 px-4">
          <Link
            to="/wires"
            className="bg-blue-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-blue-700 text-md md:text-lg font-semibold"
          >
            Get Started
          </Link>
          <Link
            to="/guide"
            className="bg-transparent border border-blue-600 text-blue-600 px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-blue-600 hover:text-white text-md md:text-lg font-semibold"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* What is GeminiWire? */}
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 md:mb-6">
          What is GeminiWire?
        </h2>
        <p className="text-gray-700 mb-6 md:mb-8 text-md md:text-lg">
          GeminiWire is a free, AI-powered platform that simplifies{" "}
          <strong>declarative programming</strong>. By leveraging Google's
          Gemini AI, it allows you to automate tasks, create workflows, and
          manage complex processes with ease—no coding expertise required.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
              🤖 AI-Powered
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Harness the power of Google's Gemini AI to automate tasks
              intelligently.
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
              🧩 Declarative
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Focus on what you want to achieve, not how to achieve it.
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
              🎯 Free & Easy
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Completely free to use, with an intuitive interface for all skill
              levels.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-blue-50 py-8 md:py-12">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 md:mb-6">
            How It Works
          </h2>
          <p className="text-gray-700 mb-6 md:mb-8 text-md md:text-lg">
            GeminiWire uses <strong>wires</strong> and{" "}
            <strong>wireflows</strong> to help you automate tasks and create
            workflows. Here's how it works:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                1. Create Wires
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Wires are individual tasks or actions. Define inputs, prompts,
                and outputs to create reusable wires.
              </p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                2. Build Wireflows
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Combine multiple wires into workflows to automate complex
                processes.
              </p>
            </div>
          </div>
          <div className="mt-6 md:mt-8 text-center">
            <Link
              to="/guide"
              className="bg-blue-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-blue-700 text-md md:text-lg"
            >
              Learn How to Use GeminiWire
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose GeminiWire? */}
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 md:mb-6">
          Why Choose GeminiWire?
        </h2>
        <p className="text-gray-700 mb-6 md:mb-8 text-md md:text-lg">
          GeminiWire is designed to make automation accessible to everyone.
          Here's why it stands out:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
              🚀 No Coding Required
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Use a simple, intuitive interface to create wires and wireflows.
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
              ⚡ Powered by Gemini AI
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Leverage cutting-edge AI to automate tasks intelligently.
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
              💡 Free Forever
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              GeminiWire is completely free to use, with no hidden costs.
            </p>
          </div>
        </div>
      </div>

      {/* GitHub and API Docs Section */}
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 md:mb-6">
          Explore the Project
        </h2>
        <p className="text-gray-700 mb-6 md:mb-8 text-md md:text-lg">
          You can visit the GitHub repositories for the backend and frontend, as
          well as the live API documentation:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 flex items-center justify-center">
              <FaGithub className="mr-2" /> Backend
            </h3>
            <a
              href="https://github.com/anas1412/GeminiWire"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub Repository
            </a>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 flex items-center justify-center">
              <FaGithub className="mr-2" /> Frontend
            </h3>
            <a
              href="https://github.com/anas1412/GeminiWireUI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub Repository
            </a>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 flex items-center justify-center">
              <FaBook className="mr-2" /> API Docs
            </h3>
            <a
              href="https://geminiwire.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Live Documentation
            </a>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-gray-800 py-8 md:py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
          Ready to Automate Your Workflows?
        </h2>
        <p className="text-lg md:text-xl mb-6 md:mb-8">
          Join thousands of users who are already simplifying their tasks with
          GeminiWire.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/wires"
            className="bg-blue-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-blue-700 text-md md:text-lg font-semibold"
          >
            Get Started
          </Link>
          <Link
            to="/guide"
            className="bg-transparent border border-blue-600 text-blue-600 px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-blue-600 hover:text-white text-md md:text-lg font-semibold"
          >
            Explore Guides
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
