import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlay } from "react-icons/fa"; // Import icons from react-icons
import WireflowBuilder from "../components/WireflowBuilder";
import LoadingSpinner from "../components/LoadingSpinner";
import API_BASE_URL from "../config";

const WireflowsPage = () => {
  const [wires, setWires] = useState([]);
  const [wireflows, setWireflows] = useState([]);
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
      setError("Failed to fetch wires. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch wireflows from the API
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

  // Load wires and wireflows when the component mounts
  useEffect(() => {
    fetchWires();
    fetchWireflows();
  }, []);

  // Handle saving a wireflow
  const handleSaveWireflow = async (workflow) => {
    try {
      const workflowId = prompt("Enter a unique ID for this wireflow:");
      if (workflowId) {
        const response = await fetch(`${API_BASE_URL}/wireflows/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            workflow_id: workflowId,
            wires: workflow,
          }),
        });
        if (!response.ok) throw new Error("Failed to save wireflow");
        fetchWireflows(); // Refresh the list of wireflows
      }
    } catch (error) {
      console.error("Error saving wireflow:", error);
      setError("Failed to save wireflow. Please try again.");
    }
  };

  // Handle deleting a wireflow
  const handleDeleteWireflow = async (workflowId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/wireflows/${workflowId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete wireflow");
      fetchWireflows(); // Refresh the list of wireflows
    } catch (error) {
      console.error("Error deleting wireflow:", error);
      setError("Failed to delete wireflow. Please try again.");
    }
  };

  // Handle executing a wireflow
  const handleExecuteWireflow = (workflowId) => {
    // Add logic to execute the wireflow
    alert(`Executing wireflow: ${workflowId}`);
  };

  return (
    <div className="p-4 md:p-6 min-h-screen flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-4 md:mb-0">
          Wireflows
        </h1>
      </div>

      {/* Loading Spinner and Message */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <p className="ml-2 text-gray-700">Loading wireflows...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>Error: {error}</p>
          <button
            onClick={fetchWireflows}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
          >
            Retry
          </button>
        </div>
      )}

      {/* Wireflow Builder */}
      <div className="mb-8">
        <WireflowBuilder wires={wires} onSave={handleSaveWireflow} />
      </div>

      {/* Saved Wireflows List */}
      {!isLoading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-4 py-2 text-left text-blue-800">
                  Workflow ID
                </th>
                <th className="px-4 py-2 text-left text-blue-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wireflows.map((wireflow) => (
                <tr
                  key={wireflow.workflow_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-gray-700">
                    {wireflow.workflow_id}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleExecuteWireflow(wireflow.workflow_id)
                        }
                        className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50 transition-colors duration-300"
                      >
                        <FaPlay className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => alert("Edit functionality coming soon!")}
                        className="text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-50 transition-colors duration-300"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteWireflow(wireflow.workflow_id)
                        }
                        className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors duration-300"
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
