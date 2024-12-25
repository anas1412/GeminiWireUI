import React, { useState, useEffect } from "react";
import WireList from "./components/WireList";
import WireModal from "./components/WireModal";
import ExecuteModal from "./components/ExecuteModal";
import LoadingSpinner from "./components/LoadingSpinner";
import Notification from "./components/Notification";
import API_BASE_URL from "./config"; // Import the base URL
import Header from "./components/Header";
import "./App.css";

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
      const response = await fetch(`${API_BASE_URL}/wires/details`);
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
      const inputNames = formData.inputs.map((input) => input.name);
      const dataToSend = {
        ...formData,
        inputs: inputNames,
      };
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
        showNotification("Error saving wire", "error");
      }
    } catch (error) {
      showNotification("Error saving wire", "error");
    }
  };

  const handleDelete = async (functionName) => {
    if (window.confirm("Are you sure you want to delete this wire?")) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/wire/delete/${functionName}`,
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
      const response = await fetch(`${API_BASE_URL}/execute`, {
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

  const openEditModal = (wire) => {
    const inputs = Object.keys(wire.inputs).map((inputName) => ({
      name: inputName,
      type: "string",
    }));

    setFormData({
      ...wire,
      inputs: inputs,
    });
    setSelectedWire(wire.function_name);
    setIsAddModalOpen(true);
  };

  const openExecuteModal = (wire) => {
    const initialInputs = {};
    Object.keys(wire.inputs).forEach((inputName) => {
      initialInputs[inputName] = "";
    });

    setExecuteData({
      function_name: wire.function_name,
      inputs: initialInputs,
    });
    setSelectedWire(wire);
    setExecutionResult(null);
    setIsExecuteModalOpen(true);
  };

  return (
    <div className="min-h-screen p-8 text-gray-100 bg-gray-900">
      {notification && <Notification notification={notification} />}

      <div className="p-6 bg-gray-800 rounded-lg shadow-xl">
        <Header
          setIsAddModalOpen={setIsAddModalOpen}
          setFormData={setFormData}
          setSelectedWire={setSelectedWire}
        />

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
