import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const ExecuteWireModal = ({ wire, onExecute, onClose }) => {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleInputChange = (key, value) => {
    setInputs({ ...inputs, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const executionResult = await onExecute(inputs);
      setResult(executionResult);
    } catch (error) {
      console.error("Error executing wire:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Execute Wire: {wire?.wire_id}</h2>
      {isLoading && <LoadingSpinner />}
      {result ? (
        <div className="p-4 overflow-y-auto bg-gray-100 rounded-lg max-h-40">
          <pre>{result.final_output}</pre>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {wire?.inputs &&
            Object.entries(wire.inputs).map(([key, description]) => (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {key}
                </label>
                <input
                  type="text"
                  value={inputs[key] || ""}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                  placeholder={description}
                  required
                />
              </div>
            ))}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Executing..." : "Execute"}
          </button>
        </form>
      )}
      <button
        onClick={onClose}
        className="w-full px-4 py-2 mt-4 text-white bg-gray-500 rounded-md hover:bg-gray-600"
      >
        Close
      </button>
    </>
  );
};

export default ExecuteWireModal;
