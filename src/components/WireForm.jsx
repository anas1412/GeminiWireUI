import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

const WireForm = ({ wire, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    wire_id: "", // Ensure wire_id is included
    description: "",
    prompt: "",
    inputs: {},
    output_key: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (wire) {
      // If editing an existing wire, populate the form with its data
      setFormData(wire);
    } else {
      // If creating a new wire, reset the form data
      setFormData({
        wire_id: "", // Include wire_id for new wires
        description: "",
        prompt: "",
        inputs: {},
        output_key: "",
      });
    }
  }, [wire]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputValueChange = (key, value) => {
    setFormData({
      ...formData,
      inputs: { ...formData.inputs, [key]: value },
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData); // Pass the form data to the parent component
    } catch (error) {
      console.error("Error saving wire:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">
          {wire ? "Edit Wire" : "Create Wire"}
        </h2>
        {isLoading && <LoadingSpinner />}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Wire ID
            </label>
            <input
              type="text"
              name="wire_id"
              value={formData.wire_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
              disabled={!!wire} // Disable the field if editing an existing wire
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
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
                    onChange={(e) =>
                      handleInputValueChange(key, e.target.value)
                    }
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveInput(key)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddInput}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
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
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          disabled={isLoading}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WireForm;
