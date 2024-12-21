import React from "react";

const ExecuteModal = ({
  executeData,
  setExecuteData,
  handleExecute,
  setIsExecuteModalOpen,
  executionResult,
  isExecuting,
  selectedWire,
}) => {
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
        </div>
      </div>
    </div>
  );
};

export default ExecuteModal;
