// pages/GuidePage.jsx
import React from "react";
import { Link } from "react-router-dom";

const GuidePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">
        GeminiWire Guides
      </h1>

      {/* Wires Guide */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Wires Guide</h2>
        <p className="text-gray-700 mb-6">
          Wires are the building blocks of GeminiWire. They allow you to execute
          specific tasks or workflows. Here's how to use them:
        </p>
        <ol className="list-decimal list-inside space-y-4">
          <li>
            Go to the{" "}
            <Link to="/wires" className="text-blue-500 hover:underline">
              Wires Page
            </Link>
            .
          </li>
          <li>
            Click the <strong>Create Wire</strong> button to add a new wire.
          </li>
          <li>
            Fill in the wire details:
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>
                <strong>Wire ID</strong>: A unique identifier for the wire.
              </li>
              <li>
                <strong>Description</strong>: A brief explanation of the wire's
                purpose.
              </li>
              <li>
                <strong>Prompt</strong>: The task or action the wire will
                perform.
              </li>
              <li>
                <strong>Inputs</strong>: Variables required for the wire to
                execute.
              </li>
              <li>
                <strong>Output Key</strong>: The result generated by the wire.
              </li>
            </ul>
          </li>
          <li>
            Click <strong>Save</strong> to store the wire.
          </li>
          <li>
            To execute a wire, click the <strong>Execute</strong> button next to
            the wire in the list.
          </li>
          <li>
            Provide the required inputs (if any) and view the execution result.
          </li>
        </ol>
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-700 font-semibold">Example:</p>
          <p>
            <strong>Prompt:</strong> Generate a summary of the latest sprint
            progress for the provided project: <code>input_1</code>
          </p>
          <p>
            <strong>Input:</strong> <code>input_1</code> = "Project Alpha"
          </p>
          <p>
            <strong>Output:</strong> "Sprint progress for Project Alpha: 85% of
            tasks completed. Remaining tasks: API integration and bug fixes.
            Team is on track to meet the sprint deadline."
          </p>
        </div>
      </div>

      {/* Wireflows Guide */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">
          Wireflows Guide
        </h2>
        <p className="text-gray-700 mb-6">
          Wireflows allow you to combine multiple wires into a single workflow.
          This is ideal for automating complex tasks. Here's how to create and
          use them:
        </p>
        <ol className="list-decimal list-inside space-y-4">
          <li>
            Go to the{" "}
            <Link to="/wireflows" className="text-blue-500 hover:underline">
              Wireflows Page
            </Link>
            .
          </li>
          <li>
            Drag and drop wires from the <strong>Available Wires</strong> list
            to the <strong>Workflow Canvas</strong>.
          </li>
          <li>Arrange the wires in the desired order to create a workflow.</li>
          <li>
            Connect the wires by linking their inputs and outputs. This ensures
            data flows seamlessly between them.
          </li>
          <li>
            Click <strong>Save Wireflow</strong> to store the workflow.
          </li>
          <li>
            To execute a wireflow, click the <strong>Execute</strong> button
            next to the wireflow in the list.
          </li>
          <li>
            Provide the required inputs (if any) and view the execution result.
          </li>
        </ol>
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-700 font-semibold">Example:</p>
          <p>
            <strong>Scenario:</strong> Automate a bug reporting workflow.
          </p>
          <ul className="list-disc list-inside ml-6 mt-2">
            <li>
              <strong>Wire 1:</strong> Collect bug details from a form.
            </li>
            <li>
              <strong>Wire 2:</strong> Validate the bug details.
            </li>
            <li>
              <strong>Wire 3:</strong> Add the bug to the issue tracker.
            </li>
            <li>
              <strong>Wire 4:</strong> Notify the development team via email.
            </li>
          </ul>
          <p className="mt-2">
            By combining these wires into a wireflow, you can automate the
            entire bug reporting process.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-gray-700 mb-8">
          Explore the power of GeminiWire and start automating your workflows
          today.
        </p>
        <div className="space-x-4">
          <Link
            to="/wires"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg"
          >
            Create a Wire
          </Link>
          <Link
            to="/wireflows"
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 text-lg"
          >
            Build a Wireflow
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;