import React, { useState } from "react";

const ExecuteModal = ({
  executeData,
  setExecuteData,
  handleExecute,
  setIsExecuteModalOpen,
  executionResult,
  isExecuting,
  selectedWire,
}) => {
  const [showJSON, setShowJSON] = useState(false);
  const [showJS, setShowJS] = useState(false);

  const generateJSON = () => {
    const inputsCode = Object.keys(executeData.inputs)
      .map((inputName) => `"${inputName}": "${executeData.inputs[inputName]}"`)
      .join(", ");
    const jsonCode = `{
  "function_name": "${executeData.function_name}",
  "inputs": {
    ${inputsCode}
  }
}`;
    return jsonCode;
  };

  const generateJS = () => {
    const inputsCode = Object.keys(executeData.inputs)
      .map((inputName) => `"${inputName}": "${executeData.inputs[inputName]}"`)
      .join(", ");
    const jsCode = `
const data = {
  function_name: "${executeData.function_name}",
  inputs: {
    ${inputsCode}
  }
};

fetch("http://localhost:8000/execute", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
})
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.error("Error:", error));
`;
    return jsCode;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-100">
          Execute Wire: {executeData.function_name}
        </h2>
        <div className="space-y-4">
          {Object.keys(executeData.inputs).map((inputName) => (
            <input
              key={inputName}
              className="w-full p-2 text-gray-100 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder={inputName}
              value={executeData.inputs[inputName]}
              onChange={(e) =>
                setExecuteData({
                  ...executeData,
                  inputs: {
                    ...executeData.inputs,
                    [inputName]: e.target.value,
                  },
                })
              }
            />
          ))}

          {executionResult !== null && (
            <div className="p-4 mt-4 bg-gray-700 border border-gray-600 rounded">
              <h3 className="mb-2 text-sm font-medium text-gray-300">
                Execution Result:
              </h3>
              <pre className="text-sm text-gray-100 whitespace-pre-wrap">
                {executionResult}
              </pre>
            </div>
          )}

          {showJSON && (
            <div className="p-4 mt-4 bg-gray-700 border border-gray-600 rounded">
              <h3 className="mb-2 text-sm font-medium text-gray-300">
                Execution JSON:
              </h3>
              <pre className="text-sm text-gray-100 whitespace-pre-wrap">
                {generateJSON()}
              </pre>
            </div>
          )}

          {showJS && (
            <div className="p-4 mt-4 bg-gray-700 border border-gray-600 rounded">
              <h3 className="mb-2 text-sm font-medium text-gray-300">
                Execution JavaScript:
              </h3>
              <pre className="text-sm text-gray-100 whitespace-pre-wrap">
                {generateJS()}
              </pre>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={() => setIsExecuteModalOpen(false)}
            className="px-4 py-2 text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
          >
            Close
          </button>
          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className="flex items-center px-4 py-2 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed"
          >
            {isExecuting ? (
              <>
                <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                Executing...
              </>
            ) : (
              "Execute"
            )}
          </button>
          <button
            onClick={() => setShowJSON(!showJSON)}
            className="px-4 py-2 text-white transition-colors bg-green-600 rounded hover:bg-green-700"
          >
            {showJSON ? "Hide JSON" : "Show JSON"}
          </button>
          <button
            onClick={() => setShowJS(!showJS)}
            className="px-4 py-2 text-white transition-colors bg-yellow-600 rounded hover:bg-yellow-700"
          >
            {showJS ? "Hide JS" : "Show JS"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExecuteModal;
