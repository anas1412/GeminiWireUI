import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlay } from "react-icons/fa";
import WireflowBuilder from "../components/WireflowBuilder";
import LoadingSpinner from "../components/LoadingSpinner";
import API_BASE_URL from "../config";

const WireflowsPage = () => {
  const [wires, setWires] = useState([]);
  const [wireflows, setWireflows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingWireflow, setEditingWireflow] = useState(null);

  // Fetch available wires
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

  // Fetch all wireflows
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

  // Save or update a wireflow
  const handleSaveWireflow = async (wireflow) => {
    try {
      const wireflow_id = editingWireflow
        ? editingWireflow.wireflow_id
        : prompt("Enter a unique ID for this wireflow:");
      const description = editingWireflow
        ? editingWireflow.description
        : prompt("Enter a description for this wireflow:");

      if (wireflow_id && description) {
        const method = editingWireflow ? "PUT" : "POST";
        const url = editingWireflow
          ? `${API_BASE_URL}/wireflows/${wireflow_id}`
          : `${API_BASE_URL}/wireflows/`;

        const wireflowData = {
          wireflow_id: wireflow_id,
          description: description,
          wires: wireflow.map((wire) => ({
            wire_id: wire.wire_id,
            inputs: wire.inputs,
            output_key: wire.output_key,
          })),
        };

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(wireflowData),
        });

        if (!response.ok) throw new Error("Failed to save wireflow");
        fetchWireflows(); // Refresh the list of wireflows
        setEditingWireflow(null); // Reset editing state
      }
    } catch (error) {
      console.error("Error saving wireflow:", error);
      setError("Failed to save wireflow. Please try again.");
    }
  };

  // Delete a wireflow
  const handleDeleteWireflow = async (wireflow_id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/wireflows/${wireflow_id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete wireflow");
      fetchWireflows(); // Refresh the list of wireflows
    } catch (error) {
      console.error("Error deleting wireflow:", error);
      setError("Failed to delete wireflow. Please try again.");
    }
  };

  // Execute a wireflow
  const handleExecuteWireflow = async (wireflow_id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/wireflows/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wireflow_id: wireflow_id, // Ensure wireflow_id is included
          inputs: {}, // Add inputs if needed
        }),
      });

      if (!response.ok) throw new Error("Failed to execute wireflow");
      const result = await response.json();
      alert(
        `Wireflow executed successfully. Result: ${JSON.stringify(result)}`
      );
    } catch (error) {
      console.error("Error executing wireflow:", error);
      setError("Failed to execute wireflow. Please try again.");
    }
  };

  // Set the wireflow to be edited
  const handleEditWireflow = (wireflow) => {
    setEditingWireflow(wireflow);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6">
      <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
        <h1 className="mb-4 text-2xl font-bold text-blue-800 md:mb-0">
          Wireflows
        </h1>
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

      <div className="mb-8">
        <WireflowBuilder
          wires={wires}
          onSave={handleSaveWireflow}
          initialWireflow={editingWireflow?.wires}
        />
      </div>

      {!isLoading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-4 py-2 text-left text-blue-800">
                  Wireflow ID
                </th>
                <th className="px-4 py-2 text-left text-blue-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wireflows.map((wireflow) => (
                <tr
                  key={wireflow.wireflow_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-gray-700">
                    {wireflow.wireflow_id}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleExecuteWireflow(wireflow.wireflow_id)
                        }
                        className="p-1 text-green-600 transition-colors duration-300 rounded-full hover:text-green-800 hover:bg-green-50"
                      >
                        <FaPlay className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEditWireflow(wireflow)}
                        className="p-1 text-yellow-600 transition-colors duration-300 rounded-full hover:text-yellow-800 hover:bg-yellow-50"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteWireflow(wireflow.wireflow_id)
                        }
                        className="p-1 text-red-600 transition-colors duration-300 rounded-full hover:text-red-800 hover:bg-red-50"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WireflowsPage;
