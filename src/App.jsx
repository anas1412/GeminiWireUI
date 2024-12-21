import React, { useState, useEffect } from "react";
import WireList from "./components/WireList";
import WireModal from "./components/WireModal";
import ExecuteModal from "./components/ExecuteModal";
import LoadingSpinner from "./components/LoadingSpinner";
import Notification from "./components/Notification";

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

  const sanitizeDescription = (description) => {
    // Remove leading "f'" and trailing "'"
    if (description.startsWith("f'") && description.endsWith("'")) {
      return description.slice(2, -1);
    }
    return description;
  };

  const handleSubmit = async () => {
    try {
      const endpoint = selectedWire ? "/wire/update" : "/wire/add";
      const inputNames = formData.inputs.map((input) => input.name);
      const dataToSend = {
        ...formData,
        inputs: inputNames,
        description: sanitizeDescription(formData.description),
      };
      console.log("Sending data:", dataToSend); // Log the data being sent
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: selectedWire ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        showNotification(
          `Wire ${selectedWire ? "updated" : "added"} successfully`
        );
        setIsAddModalOpen(false);
        fetchWires();
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        showNotification("Error saving wire", "error");
      }
    } catch (error) {
      console.error("Error:", error);
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

      // Sanitize the description field
      const sanitizedDescription = sanitizeDescription(wire.description);

      // Initialize inputs array with the correct input names
      const inputs = wire.inputs.map((inputName) => ({
        name: inputName,
        type: "string",
      }));

      setFormData({
        ...wire,
        description: sanitizedDescription,
        inputs: inputs,
      });
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
        initialInputs[input] = "";
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

  return (
    <div className="min-h-screen p-8 text-gray-100 bg-gray-900">
      {notification && <Notification notification={notification} />}

      <div className="p-6 bg-gray-800 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-100">
            Wire Management Dashboard
          </h1>
          <button
            onClick={() => {
              setFormData({ function_name: "", description: "", inputs: [] });
              setSelectedWire(null);
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
          >
            Add Wire
          </button>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <WireList
            wires={wires}
            openExecuteModal={openExecuteModal}
            openEditModal={openEditModal}
            handleDelete={handleDelete}
          />
        )}
      </div>

      {isAddModalOpen && (
        <WireModal
          formData={formData}
          setFormData={setFormData}
          handleAddInput={handleAddInput}
          handleRemoveInput={handleRemoveInput}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setIsAddModalOpen={setIsAddModalOpen}
          selectedWire={selectedWire}
        />
      )}

      {isExecuteModalOpen && (
        <ExecuteModal
          executeData={executeData}
          setExecuteData={setExecuteData}
          handleExecute={handleExecute}
          setIsExecuteModalOpen={setIsExecuteModalOpen}
          executionResult={executionResult}
          isExecuting={isExecuting}
          selectedWire={selectedWire}
        />
      )}
    </div>
  );
};

export default App;
