import React, { useState, useEffect } from "react";
import { FaEdit, FaPlay, FaTimes } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import API_BASE_URL from "../config";

const WiresPage = () => {
  const [wires, setWires] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWire, setSelectedWire] = useState(null);
  const [wireToExecute, setWireToExecute] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExecuteModalOpen, setIsExecuteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    wire_id: "",
    description: "",
    prompt: "",
    inputs: {},
    output_key: "",
  });
  const [executionInputs, setExecutionInputs] = useState({}); // State for execution inputs
  const [executionResult, setExecutionResult] = useState(null); // State for execution result
  const [isExecuting, setIsExecuting] = useState(false); // State for execution loading

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
    setFormData({
      wire_id: "",
      description: "",
      prompt: "",
      inputs: {},
      output_key: "",
    });
    setIsModalOpen(true);
  };

  const handleEditWire = (wireId) => {
    const wire = wires.find((w) => w.wire_id === wireId);
    if (wire) {
      setFormData(wire);
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
      setExecutionInputs({}); // Initialize execution inputs as empty
      setExecutionResult(null); // Reset execution result
      setIsExecuteModalOpen(true);
    }
  };

  const handleSaveWire = async () => {
    setIsSaving(true);
    try {
      const isEdit = wires.some((w) => w.wire_id === formData.wire_id);
      const url = isEdit
        ? `${API_BASE_URL}/wires/${formData.wire_id}`
        : `${API_BASE_URL}/wires/`;
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save wire");

      fetchWires();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving wire:", error);
      setError("Failed to save wire. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExecute = async () => {
    setIsExecuting(true); // Start loading
    try {
      const response = await fetch(`${API_BASE_URL}/wires/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wire_id: wireToExecute.wire_id,
          inputs: executionInputs, // Use executionInputs state
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to execute wire");
      }

      const result = await response.json();
      setExecutionResult(result); // Set execution result
    } catch (error) {
      console.error("Error executing wire:", error);
      setError("Failed to execute wire. Please try again.");
    } finally {
      setIsExecuting(false); // Stop loading
    }
  };

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      inputs: { ...formData.inputs, [key]: value },
    });
  };

  const handleExecutionInputChange = (key, value) => {
    setExecutionInputs({ ...executionInputs, [key]: value }); // Update execution inputs
  };

  const handleAddInput = () => {
    const newKey = `input_${Object.keys(formData.inputs).length + 1}`;
    setFormData({
      ...formData,
      inputs: { ...formData.inputs, [newKey]: "" },
    });
  };

  const handleRemoveInput = (key) => {
    const newInputs = { ...formData.inputs };
    delete newInputs[key];
    setFormData({ ...formData, inputs: newInputs });
  };

  // Format the output to replace \n with <br /> for HTML rendering
  const formatOutput = (output) => {
    return output.replace(/\n/g, "<br />");
  };

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6">
      <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
        <h1 className="mb-4 text-2xl font-bold text-blue-800 md:mb-0">Wires</h1>
        <button
          onClick={handleCreateWire}
          className="w-full px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 md:w-auto"
        >
          Create Wire
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isSaving}
      >
        {isSaving ? (
          <div className="flex items-center justify-center h-32">
            <LoadingSpinner />
            <p className="ml-2 text-gray-700">Saving wire...</p>
          </div>
        ) : (
          <div>
            <h2 className="mb-4 text-2xl font-bold">
              {formData.wire_id ? "Edit Wire" : "Create Wire"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveWire();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Wire ID
                </label>
                <input
                  type="text"
                  name="wire_id"
                  value={formData.wire_id}
                  onChange={(e) =>
                    setFormData({ ...formData, wire_id: e.target.value })
                  }
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                  required
                  disabled={!!formData.wire_id}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Prompt
                </label>
                <textarea
                  name="prompt"
                  value={formData.prompt}
                  onChange={(e) =>
                    setFormData({ ...formData, prompt: e.target.value })
                  }
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Inputs
                </label>
                <div className="space-y-2">
                  {Object.entries(formData.inputs).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Input Key"
                        value={key}
                        readOnly
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                      <input
                        type="text"
                        placeholder="Input Value"
                        value={value}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveInput(key)}
                        className="px-3 py-1 text-white bg-red-500 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddInput}
                  className="px-3 py-1 mt-2 text-white bg-green-500 rounded"
                >
                  Add Input
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Output Key
                </label>
                <input
                  type="text"
                  name="output_key"
                  value={formData.output_key}
                  onChange={(e) =>
                    setFormData({ ...formData, output_key: e.target.value })
                  }
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full px-4 py-2 mt-4 text-white bg-gray-500 rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        )}
      </Modal>

      {/* Execute Wire Modal */}
      <Modal
        isOpen={isExecuteModalOpen}
        onClose={() => setIsExecuteModalOpen(false)}
      >
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            Execute Wire: {wireToExecute?.wire_id}
          </h2>
          {isExecuting ? (
            <div className="flex items-center justify-center h-32">
              <LoadingSpinner />
              <p className="ml-2 text-gray-700">Executing wire...</p>
            </div>
          ) : executionResult ? (
            <div>
              <div className="p-4 mb-4 bg-gray-100 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Output
                </label>
                <div
                  className="p-2 bg-white rounded"
                  dangerouslySetInnerHTML={{
                    __html: formatOutput(executionResult.output),
                  }}
                />
              </div>
              <button
                onClick={() => {
                  setExecutionResult(null); // Reset execution result
                  setExecutionInputs({}); // Reset execution inputs
                }}
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Execute Again
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleExecute();
              }}
            >
              {wireToExecute?.inputs &&
                Object.entries(wireToExecute.inputs).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      {key}
                    </label>
                    <input
                      type="text"
                      value={executionInputs[key] || ""}
                      onChange={(e) =>
                        handleExecutionInputChange(key, e.target.value)
                      }
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                      placeholder={value} // Use fetched value as placeholder
                      required
                    />
                  </div>
                ))}
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Execute
              </button>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default WiresPage;
