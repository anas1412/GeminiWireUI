import React, { useState, useEffect } from "react";
import WireList from "../components/WireList";
import WireForm from "../components/WireForm";
import ExecuteWireModal from "../components/ExecuteWireModal";
import LoadingSpinner from "../components/LoadingSpinner";
import API_BASE_URL from "../config";

const WiresPage = () => {
  const [wires, setWires] = useState([]);
  const [showWireForm, setShowWireForm] = useState(false);
  const [selectedWire, setSelectedWire] = useState(null);
  const [showExecuteModal, setShowExecuteModal] = useState(false);
  const [wireToExecute, setWireToExecute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch wires from the API
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

  // Load wires when the component mounts
  useEffect(() => {
    fetchWires();
  }, []);

  // Handle creating a new wire
  const handleCreateWire = () => {
    setSelectedWire(null);
    setShowWireForm(true);
  };

  // Handle editing an existing wire
  const handleEditWire = (wireId) => {
    const wire = wires.find((w) => w.wire_id === wireId);
    if (wire) {
      setSelectedWire(wire);
      setShowWireForm(true);
    } else {
      console.error("Wire not found");
    }
  };

  // Handle deleting a wire
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

  // Handle executing a wire
  const handleExecuteWire = (wireId) => {
    const wire = wires.find((w) => w.wire_id === wireId);
    if (wire) {
      setWireToExecute(wire);
      setShowExecuteModal(true);
    } else {
      console.error("Wire not found");
    }
  };

  // Handle saving a wire (both adding and editing)
  const handleSaveWire = async (wire) => {
    try {
      const isEdit = selectedWire !== null;
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
      setShowWireForm(false);
    } catch (error) {
      console.error("Error saving wire:", error);
      setError("Failed to save wire. Please try again.");
    }
  };

  // Handle the actual execution request
  const handleExecute = async (inputs) => {
    try {
      if (!wireToExecute) {
        throw new Error("Wire to execute is not defined");
      }

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
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Wires</h1>
        <button
          onClick={handleCreateWire}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Create Wire
        </button>
      </div>

      {/* Loading Spinner and Message */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <p className="ml-2 text-gray-700">Loading wires...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>Error: {error}</p>
          <button
            onClick={fetchWires}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
          >
            Retry
          </button>
        </div>
      )}

      {/* Wires List */}
      {!isLoading && !error && (
        <WireList
          wires={wires}
          onEdit={handleEditWire}
          onDelete={handleDeleteWire}
          onExecute={handleExecuteWire}
        />
      )}

      {/* Wire Form Modal */}
      {showWireForm && (
        <WireForm
          wire={selectedWire}
          onSubmit={handleSaveWire}
          onClose={() => setShowWireForm(false)}
        />
      )}

      {/* Execute Wire Modal */}
      {showExecuteModal && (
        <ExecuteWireModal
          wire={wireToExecute}
          onExecute={handleExecute}
          onClose={() => setShowExecuteModal(false)}
        />
      )}
    </div>
  );
};

export default WiresPage;
