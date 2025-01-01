import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const ExecuteWireModal = ({ wire, onExecute, onClose }) => {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showJson, setShowJson] = useState(false); // State to toggle JSON visibility

  const handleInputChange = (key, value) => {
    setInputs({ ...inputs, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const executionResult = await onExecute(inputs);
      setResult(executionResult);
    } catch (error) {
      console.error("Error executing wire:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">
          Execute Wire: {wire.wire_id}
        </h2>
        {isLoading && <LoadingSpinner />}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>Error: {error}</p>
          </div>
        )}
        {result ? (
          <div className="space-y-4">
            {/* Display Cleaned Result or Error Message */}
            <div className="bg-gray-100 p-4 rounded max-h-48 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-2">
                {result.error ? "Error" : "Cleaned Result"}
              </h3>
              <pre>{result.error || result.output}</pre>
            </div>

            {/* Show/Hide JSON Button */}
            <button
              onClick={() => setShowJson(!showJson)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {showJson ? "Hide JSON" : "Show JSON"}
            </button>

            {/* Display Raw JSON Result (Conditional Rendering) */}
            {showJson && (
              <div className="bg-gray-100 p-4 rounded max-h-48 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-2">Raw JSON Result</h3>
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {Object.entries(wire.inputs).map(([key, description]) => (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {key}
                </label>
                <input
                  type="text"
                  value={inputs[key] || ""}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder={description} // Use the description as the placeholder
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Executing..." : "Execute"}
            </button>
          </form>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ExecuteWireModal;
