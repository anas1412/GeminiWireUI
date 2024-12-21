import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [wires, setWires] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExecuteModalOpen, setIsExecuteModalOpen] = useState(false);
  const [selectedWire, setSelectedWire] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [formData, setFormData] = useState({
    function_name: "",
    description: "",
    inputs: [],
  });
  const [executeData, setExecuteData] = useState({
    function_name: "",
    inputs: {},
  });

  useEffect(() => {
    fetchWires();
  }, []);

  const fetchWires = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/wires");
      const data = await response.json();
      setWires(data);
    } catch (error) {
      showNotification("Error fetching wires", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddInput = () => {
    setFormData((prev) => ({
      ...prev,
      inputs: [...prev.inputs, { name: "", type: "string" }],
    }));
  };

  const handleRemoveInput = (index) => {
    setFormData((prev) => ({
      ...prev,
      inputs: prev.inputs.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      inputs: prev.inputs.map((input, i) =>
        i === index ? { ...input, [field]: value } : input
      ),
    }));
  };

  const handleSubmit = async () => {
    try {
      const endpoint = selectedWire ? "/wire/update" : "/wire/add";
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: selectedWire ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showNotification(
          `Wire ${selectedWire ? "updated" : "added"} successfully`
        );
        setIsAddModalOpen(false);
        fetchWires();
      }
    } catch (error) {
      showNotification("Error saving wire", "error");
    }
  };

  const handleDelete = async (functionName) => {
    if (window.confirm("Are you sure you want to delete this wire?")) {
      try {
        const response = await fetch(
          `http://localhost:8000/wire/delete/${functionName}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          showNotification("Wire deleted successfully");
          fetchWires();
        }
      } catch (error) {
        showNotification("Error deleting wire", "error");
      }
    }
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setExecutionResult(null);
    try {
      const response = await fetch("http://localhost:8000/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(executeData),
      });

      const result = await response.json();
      setExecutionResult(result.output);
      showNotification("Execution completed successfully");
    } catch (error) {
      showNotification("Error executing wire", "error");
      setExecutionResult("Error: " + error.message);
    } finally {
      setIsExecuting(false);
    }
  };

  const openEditModal = async (functionName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/wire/${functionName}`
      );
      const wire = await response.json();
      setFormData(wire);
      setSelectedWire(functionName);
      setIsAddModalOpen(true);
    } catch (error) {
      showNotification("Error fetching wire details", "error");
    }
  };

  const openExecuteModal = async (functionName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/wire/${functionName}`
      );
      const wire = await response.json();

      // Create input fields based on the wire's input definitions
      const initialInputs = {};
      wire.inputs.forEach((input) => {
        initialInputs[input.name] = "";
      });

      setExecuteData({
        function_name: wire.function_name,
        inputs: initialInputs,
      });

      // Store wire details for display
      setSelectedWire({
        ...wire,
        inputDefinitions: wire.inputs, // Store the original input definitions
      });

      setExecutionResult(null);
      setIsExecuteModalOpen(true);
    } catch (error) {
      showNotification("Error fetching wire details", "error");
    }
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
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

      <div className="bg-gray-800 rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-100">
            Wire Management Dashboard
          </h1>
          <button
            onClick={() => {
              setFormData({ function_name: "", description: "", inputs: [] });
              setSelectedWire(null);
              setIsAddModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Add Wire
          </button>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-4">
            {wires.map((wire) => (
              <div
                key={wire}
                className="flex items-center justify-between p-4 border border-gray-700 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <span className="font-medium text-gray-100">{wire}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => openExecuteModal(wire)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                  >
                    Execute
                  </button>
                  <button
                    onClick={() => openEditModal(wire)}
                    className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(wire)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-100">
              {selectedWire ? "Edit Wire" : "Add New Wire"}
            </h2>
            <div className="space-y-4">
              <input
                className="w-full bg-gray-700 border border-gray-600 p-2 rounded text-gray-100 focus:outline-none focus:border-blue-500"
                placeholder="Function Name"
                value={formData.function_name}
                onChange={(e) =>
                  setFormData({ ...formData, function_name: e.target.value })
                }
              />
              <input
                className="w-full bg-gray-700 border border-gray-600 p-2 rounded text-gray-100 focus:outline-none focus:border-blue-500"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-100">Inputs</span>
                  <button
                    onClick={handleAddInput}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                  >
                    Add Input
                  </button>
                </div>
                {formData.inputs.map((input, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      className="flex-1 bg-gray-700 border border-gray-600 p-2 rounded text-gray-100 focus:outline-none focus:border-blue-500"
                      placeholder="Input name"
                      value={input.name}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleRemoveInput(index)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isExecuteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-100">
              Execute Wire: {executeData.function_name}
            </h2>
            <div className="space-y-4">
              {Object.keys(executeData.inputs).map((inputName) => (
                <input
                  key={inputName}
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded text-gray-100 focus:outline-none focus:border-blue-500"
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
                <div className="mt-4 p-4 bg-gray-700 rounded border border-gray-600">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">
                    Execution Result:
                  </h3>
                  <pre className="text-sm text-gray-100 whitespace-pre-wrap">
                    {executionResult}
                  </pre>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsExecuteModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleExecute}
                disabled={isExecuting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-800 disabled:cursor-not-allowed flex items-center"
              >
                {isExecuting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Executing...
                  </>
                ) : (
                  "Execute"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
