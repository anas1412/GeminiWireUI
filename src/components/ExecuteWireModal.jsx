import React, { useState } from "react";

const ExecuteWireModal = ({ wire, onExecute, onClose }) => {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showJson, setShowJson] = useState(false);

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
    <>
      <h2 className="mb-4 text-2xl font-bold">Execute Wire: {wire.wire_id}</h2>
      {isLoading && <LoadingSpinner />}
      {error && (
        <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          <p>Error: {error}</p>
        </div>
      )}
      {result ? (
        <div className="space-y-4">
          <div className="p-4 overflow-y-auto bg-gray-100 rounded max-h-48">
            <h3 className="mb-2 text-lg font-semibold">
              {result.error ? "Error" : "Cleaned Result"}
            </h3>
            <pre>{result.error || result.output}</pre>
          </div>
          <button
            onClick={() => setShowJson(!showJson)}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {showJson ? "Hide JSON" : "Show JSON"}
          </button>
          {showJson && (
            <div className="p-4 overflow-y-auto bg-gray-100 rounded max-h-48">
              <h3 className="mb-2 text-lg font-semibold">Raw JSON Result</h3>
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
