import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlay, FaPlus } from "react-icons/fa";
import WireflowBuilder from "../components/WireflowBuilder";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import API_BASE_URL from "../config";

const WireflowsPage = () => {
  const [wires, setWires] = useState([]);
  const [wireflows, setWireflows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingWireflow, setEditingWireflow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExecutionModalOpen, setIsExecutionModalOpen] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // New state for saving

  const fetchWires = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/wires/`);
      if (!response.ok) throw new Error("Failed to fetch wires");
      const data = await response.json();
      setWires(data);
    } catch (error) {
      console.error("Error fetching wires:", error);
      setError("Failed to fetch wires. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWireflows = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/wireflows/`);
      if (!response.ok) throw new Error("Failed to fetch wireflows");
      const data = await response.json();
      setWireflows(data);
    } catch (error) {
      console.error("Error fetching wireflows:", error);
      setError("Failed to fetch wireflows. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWires();
    fetchWireflows();
  }, []);

  const handleSaveWireflow = async (wireflowData) => {
    setIsSaving(true); // Start loading spinner
    try {
      const { wireflowId, description, wires } = wireflowData;

      if (wireflowId && description) {
        const method = editingWireflow ? "PUT" : "POST";
        const url = editingWireflow
          ? `${API_BASE_URL}/wireflows/${editingWireflow.wireflow_id}` // Use the existing wireflow ID for editing
          : `${API_BASE_URL}/wireflows/`;

        const wireflowPayload = {
          wireflow_id: wireflowId, // Use the new wireflow ID for creation
          description: description,
          wires: wires.map((wire) => ({
            wire_id: wire.wire_id,
            inputs: wire.inputs,
            output_key: wire.output_key,
          })),
        };

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(wireflowPayload),
        });

        if (!response.ok) throw new Error("Failed to save wireflow");
        fetchWireflows(); // Refresh the list of wireflows
        setEditingWireflow(null); // Reset editing state
        setIsModalOpen(false); // Close the modal
      }
    } catch (error) {
      console.error("Error saving wireflow:", error);
      setError("Failed to save wireflow. Please try again.");
    } finally {
      setIsSaving(false); // Stop loading spinner
    }
  };

  const handleDeleteWireflow = async (wireflow_id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/wireflows/${wireflow_id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete wireflow");
      fetchWireflows();
    } catch (error) {
      console.error("Error deleting wireflow:", error);
      setError("Failed to delete wireflow. Please try again.");
    }
  };

  const handleExecuteWireflow = async (wireflow_id) => {
    setIsExecuting(true);
    setIsExecutionModalOpen(true);
    setExecutionResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/wireflows/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wireflow_id: wireflow_id,
          inputs: {},
        }),
      });

      if (!response.ok) throw new Error("Failed to execute wireflow");
      const result = await response.json();
      setExecutionResult(result);
    } catch (error) {
      console.error("Error executing wireflow:", error);
      setError("Failed to execute wireflow. Please try again.");
    } finally {
      setIsExecuting(false);
    }
  };

  const openModal = (wireflow = null) => {
    setEditingWireflow(wireflow);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingWireflow(null);
    setIsModalOpen(false);
  };

  const closeExecutionModal = () => {
    setExecutionResult(null);
    setIsExecutionModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6">
      <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
        <h1 className="mb-4 text-2xl font-bold text-blue-800 md:mb-0">
          Wireflows
        </h1>
        <button
          onClick={() => openModal()}
          className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          <FaPlus className="mr-2" />
          Add Wireflow
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
          <p className="ml-2 text-gray-700">Loading wireflows...</p>
        </div>
      )}

      {error && (
        <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          <p>Error: {error}</p>
          <button
            onClick={fetchWireflows}
            className="px-3 py-1 mt-2 text-white transition duration-300 bg-red-600 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Modal for adding/editing wireflows */}
      <Modal isOpen={isModalOpen} onClose={closeModal} isLoading={isSaving}>
        {isSaving ? (
          <div className="flex items-center justify-center h-32">
            <LoadingSpinner />
            <p className="ml-2 text-gray-700">Saving wireflow...</p>
          </div>
        ) : (
          <WireflowBuilder
            wires={wires}
            onSave={handleSaveWireflow}
            initialWireflow={editingWireflow?.wires}
            initialWireflowId={editingWireflow?.wireflow_id} // Pass existing wireflow ID
            initialDescription={editingWireflow?.description} // Pass existing description
          />
        )}
      </Modal>

      {/* Modal for execution results */}
      <Modal
        isOpen={isExecutionModalOpen}
        onClose={closeExecutionModal}
        isLoading={isExecuting}
      >
        {executionResult ? (
          <>
            <h2 className="mb-4 text-xl font-bold text-blue-800">
              Execution Result
            </h2>
            <div className="p-4 overflow-y-auto bg-gray-100 rounded-lg max-h-40">
              <pre>{executionResult.final_output}</pre>
            </div>
          </>
        ) : (
          <p className="text-gray-700">No execution result available.</p>
        )}
      </Modal>

      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wireflows.map((wireflow) => (
            <div
              key={wireflow.wireflow_id}
              className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-blue-800">
                {wireflow.wireflow_id}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {wireflow.description}
              </p>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => handleExecuteWireflow(wireflow.wireflow_id)}
                  className="p-1 text-green-600 transition-colors duration-300 rounded-full hover:text-green-800 hover:bg-green-50"
                >
                  <FaPlay className="w-5 h-5" />
                </button>
                <button
                  onClick={() => openModal(wireflow)}
                  className="p-1 text-yellow-600 transition-colors duration-300 rounded-full hover:text-yellow-800 hover:bg-yellow-50"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteWireflow(wireflow.wireflow_id)}
                  className="p-1 text-red-600 transition-colors duration-300 rounded-full hover:text-red-800 hover:bg-red-50"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WireflowsPage;
