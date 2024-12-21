import React from "react";

const WireModal = ({
  formData,
  setFormData,
  handleAddInput,
  handleRemoveInput,
  handleInputChange,
  handleSubmit,
  setIsAddModalOpen,
  selectedWire,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-100">
          {selectedWire ? "Edit Wire" : "Add New Wire"}
        </h2>
        <div className="space-y-4">
          <input
            className="w-full p-2 text-gray-100 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            placeholder="Function Name"
            value={formData.function_name}
            onChange={(e) =>
              setFormData({ ...formData, function_name: e.target.value })
            }
          />
          <input
            className="w-full p-2 text-gray-100 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-100">Inputs</span>
              <button
                onClick={handleAddInput}
                className="px-3 py-1 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
              >
                Add Input
              </button>
            </div>
            {formData.inputs.map((input, index) => (
              <div key={index} className="flex gap-2">
                <input
                  className="flex-1 p-2 text-gray-100 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Input name"
                  value={input.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
                <button
                  onClick={() => handleRemoveInput(index)}
                  className="px-3 py-1 text-white transition-colors bg-red-600 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="px-4 py-2 text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default WireModal;
