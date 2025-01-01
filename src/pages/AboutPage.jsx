// pages/AboutPage.jsx
import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">About Me</h1>

      {/* Introduction */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Hi, I'm Anas Bassoumi
        </h2>
        <p className="text-gray-700 mb-6">
          I’m the creator of <strong>GeminiWire</strong>, a platform designed to
          streamline declarative programming using Google’s Gemini AI. My goal
          is to make automation and workflow management accessible to everyone,
          regardless of their technical background.
        </p>
        <p className="text-gray-700">
          I’m passionate about technology, AI, and building tools that solve
          real-world problems. When I’m not coding, you can find me exploring
          new ideas, contributing to open-source projects, or connecting with
          like-minded individuals in the tech community.
        </p>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Contact Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Card */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Email</h3>
            <a
              href="mailto:anas.bassoumi@gmail.com"
              className="text-blue-600 hover:underline"
            >
              anas.bassoumi@gmail.com
            </a>
          </div>

          {/* Phone Card */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Phone</h3>
            <a
              href="tel:+21654930048"
              className="text-blue-600 hover:underline"
            >
              +216 54 930 048
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              WhatsApp
            </h3>
            <a
              href="https://wa.me/21654930048"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              +216 54 930 048
            </a>
          </div>

          {/* GitHub Card */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">GitHub</h3>
            <a
              href="https://github.com/anas1412"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              anas1412
            </a>
          </div>

          {/* Twitter Card */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Twitter
            </h3>
            <a
              href="https://twitter.com/villainesthetic"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @villainesthetic
            </a>
          </div>

          {/* LinkedIn Card */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              LinkedIn
            </h3>
            <a
              href="https://www.linkedin.com/in/anas-bassoumi"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anas Bassoumi
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
