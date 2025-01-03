import React, { useState, useEffect } from "react";
import { FaEdit, FaPlay, FaTimes } from "react-icons/fa";
import WireForm from "../components/WireForm";
import ExecuteWireModal from "../components/ExecuteWireModal";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import API_BASE_URL from "../config";

const WiresPage = () => {
  const [wires, setWires] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExecuteModalOpen, setIsExecuteModalOpen] = useState(false);
  const [selectedWire, setSelectedWire] = useState(null);
  const [wireToExecute, setWireToExecute] = useState(null);
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
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWires();
  }, []);

  const handleCreateWire = () => {
    setSelectedWire(null);
    setIsModalOpen(true);
  };

  const handleEditWire = (wireId) => {
    const wire = wires.find((w) => w.wire_id === wireId);
    if (wire) {
      setSelectedWire(wire);
      setIsModalOpen(true);
    }
  };

  const handleDeleteWire = async (wireId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/wires/${wireId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete wire");
      fetchWires();
    } catch (error) {
      console.error("Error deleting wire:", error);
      setError("Failed to delete wire. Please try again.");
    }
  };

  const handleExecuteWire = (wireId) => {
    const wire = wires.find((w) => w.wire_id === wireId);
    if (wire) {
      setWireToExecute(wire);
      setIsExecuteModalOpen(true);
    }
  };

  const handleSaveWire = async (wire) => {
    setIsSaving(true); // Start loading spinner
    try {
      const isEdit = wires.some((w) => w.wire_id === wire.wire_id);
      const url = isEdit
        ? `${API_BASE_URL}/wires/${wire.wire_id}`
        : `${API_BASE_URL}/wires/`;
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wire),
      });

      if (!response.ok) throw new Error("Failed to save wire");

      fetchWires();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving wire:", error);
      setError("Failed to save wire. Please try again.");
    } finally {
      setIsSaving(false); // Stop loading spinner
    }
  };

  const handleExecute = async (inputs) => {
    try {
      const response = await fetch(`${API_BASE_URL}/wires/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wire_id: wireToExecute.wire_id,
          inputs: inputs,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to execute wire");
      }

      return await response.json();
    } catch (error) {
      console.error("Error executing wire:", error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6">
      <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
        <h1 className="mb-4 text-2xl font-bold text-blue-800 md:mb-0">Wires</h1>
        <button
          onClick={handleCreateWire}
          className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          <FaPlus className="mr-2" />
          Add Wire
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
          <p className="ml-2 text-gray-700">Loading wires...</p>
        </div>
      )}

      {error && (
        <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          <p>Error: {error}</p>
          <button
            onClick={fetchWires}
            className="px-3 py-1 mt-2 text-white transition duration-300 bg-red-600 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wires.map((wire) => (
            <div
              key={wire.wire_id}
              className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-blue-800">
                {wire.wire_id}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{wire.description}</p>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => handleEditWire(wire.wire_id)}
                  className="p-1 text-yellow-600 transition-colors duration-300 rounded-full hover:text-yellow-800 hover:bg-yellow-50"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleExecuteWire(wire.wire_id)}
                  className="p-1 text-green-600 transition-colors duration-300 rounded-full hover:text-green-800 hover:bg-green-50"
                >
                  <FaPlay className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteWire(wire.wire_id)}
                  className="p-1 text-red-600 transition-colors duration-300 rounded-full hover:text-red-800 hover:bg-red-50"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wire Form Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isSaving ? (
          <div className="flex items-center justify-center h-32">
            <LoadingSpinner />
            <p className="ml-2 text-gray-700">Saving wire...</p>
          </div>
        ) : (
          <WireForm
            wire={selectedWire}
            onSubmit={handleSaveWire}
            onClose={() => setIsModalOpen(false)}
            isSaving={isSaving} // Pass isSaving to disable the save button
          />
        )}
      </Modal>

      {/* Execute Wire Modal */}
      <Modal
        isOpen={isExecuteModalOpen}
        onClose={() => setIsExecuteModalOpen(false)}
      >
        <ExecuteWireModal
          wire={wireToExecute}
          onExecute={handleExecute}
          onClose={() => setIsExecuteModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default WiresPage;
