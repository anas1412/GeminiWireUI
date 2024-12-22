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
  const [notification, setNotification] = useState(null);

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

fetch("YOUR_API_BASE_URL/execute", {
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

  const handleExecuteClick = () => {
    const hasEmptyField = Object.values(executeData.inputs).some(
      (value) => value.trim() === ""
    );
    if (hasEmptyField) {
      setNotification({
        message: "All input fields must be filled out.",
        type: "error",
      });
      return;
    }
    handleExecute();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md max-h-screen p-6 overflow-y-auto bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-100">
          Execute Wire: {executeData.function_name}
        </h2>
        {notification && (
          <div
            className={`mb-4 p-4 rounded ${
              notification.type === "error"
                ? "bg-red-900 text-red-100"
                : "bg-green-900 text-green-100"
            }`}
          >
            {notification.message}
          </div>
        )}
        <div className="space-y-4">
          {Object.keys(executeData.inputs).map((inputName) => (
            <div key={inputName} className="flex flex-col">
              <label className="mb-1 text-gray-300">{inputName}</label>
              <input
                className="w-full p-2 text-gray-100 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                placeholder={`Enter ${inputName}`}
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
                maxLength={255}
              />
            </div>
          ))}

          {executionResult !== null && (
            <div className="p-4 mt-4 text-left bg-gray-700 border border-gray-600 rounded">
              <h3 className="mb-2 text-sm font-medium text-gray-300">
                Execution Result:
              </h3>
              <pre className="text-sm text-gray-100 whitespace-pre-wrap">
                {executionResult}
              </pre>
            </div>
          )}

          {showJSON && (
            <div className="p-4 mt-4 text-left bg-gray-700 border border-gray-600 rounded">
              <h3 className="mb-2 text-sm font-medium text-gray-300">
                Execution JSON:
              </h3>
              <pre className="text-sm text-gray-100 whitespace-pre-wrap">
                {generateJSON()}
              </pre>
            </div>
          )}

          {showJS && (
            <div className="p-4 mt-4 text-left bg-gray-700 border border-gray-600 rounded">
              <h3 className="mb-2 text-sm font-medium text-gray-300">
                Execution JavaScript:
              </h3>
              <pre className="text-sm text-gray-100 whitespace-pre-wrap">
                {generateJS()}
              </pre>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center mt-6 space-x-2">
          <button
            onClick={() => setIsExecuteModalOpen(false)}
            className="rounded btn btn-secondary"
          >
            Close
          </button>
          <button
            onClick={handleExecuteClick}
            disabled={isExecuting}
            className="rounded btn btn-success disabled:btn-disabled disabled:cursor-not-allowed"
          >
            {isExecuting ? (
              <>
                <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
              </>
            ) : (
              "Execute"
            )}
          </button>
          <button
            onClick={() => setShowJSON(!showJSON)}
            className="rounded btn btn-primary"
          >
            {showJSON ? "Hide JSON" : "Show JSON"}
          </button>
          <button
            onClick={() => setShowJS(!showJS)}
            className="rounded btn btn-warning"
          >
            {showJS ? "Hide JS" : "Show JS"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExecuteModal;
