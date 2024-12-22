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
          {selectedWire ? formData.function_name : "Add New Wire"}
        </h2>
        <span className="block font-medium text-left text-gray-100">
          Declarative function:
        </span>
        <div className="space-y-4">
          <input
            className="w-full p-2 text-gray-100 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            placeholder="Add a prompt and use {input} like this as an example."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-100">
                Add the inputs you used in the prompts below:
              </span>
              <button
                onClick={handleAddInput}
                className="btn btn-circle btn-sm btn-secondary"
              >
                +
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
                  className="mt-1 btn btn-circle btn-sm btn-error"
                >
                  -
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="rounded btn btn-secondary"
          >
            Cancel
          </button>
          <button onClick={handleSubmit} className="rounded btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default WireModal;
