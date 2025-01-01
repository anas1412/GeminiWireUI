import React, { useState, useEffect } from "react";

const WireForm = ({ wire, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    wire_id: "",
    description: "",
    prompt: "",
    inputs: {},
    output_key: "",
  });

  useEffect(() => {
    if (wire) {
      setFormData(wire);
    }
  }, [wire]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (key, value) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">
        {wire ? "Edit Wire" : "Create Wire"}
      </h2>
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
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            required
            disabled={!!wire}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
        onClick={onClose}
        className="w-full px-4 py-2 mt-4 text-white bg-gray-500 rounded-md hover:bg-gray-600"
      >
        Close
      </button>
    </>
  );
};

export default WireForm;
