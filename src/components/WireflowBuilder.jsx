import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaTimes } from "react-icons/fa";

const WireflowBuilder = ({
  wires,
  onSave,
  initialWireflow = [],
  initialWireflowId = "",
  initialDescription = "",
}) => {
  const [wireflow, setWireflow] = useState(initialWireflow);
  const [step, setStep] = useState(1); // Multi-step form state
  const [wireflowId, setWireflowId] = useState(initialWireflowId); // Pre-fill wireflow ID
  const [description, setDescription] = useState(initialDescription); // Pre-fill description

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === "wires" &&
      destination.droppableId === "wireflow"
    ) {
      const wire = wires.find((w) => w.wire_id === result.draggableId);
      const inputs = Object.keys(wire.inputs || {}).reduce((acc, key) => {
        acc[key] = ""; // Initialize each input with an empty string
        return acc;
      }, {});
      setWireflow([
        ...wireflow,
        { ...wire, inputs, output_key: wire.output_key },
      ]);
    } else if (
      source.droppableId === "wireflow" &&
      destination.droppableId === "wireflow"
    ) {
      const newWireflow = Array.from(wireflow);
      const [removed] = newWireflow.splice(source.index, 1);
      newWireflow.splice(destination.index, 0, removed);
      setWireflow(newWireflow);
    }
  };

  const removeWireFromWireflow = (index) => {
    const newWireflow = wireflow.filter((_, i) => i !== index);
    setWireflow(newWireflow);
  };

  const updateWireInput = (index, inputKey, value) => {
    const newWireflow = [...wireflow];
    newWireflow[index].inputs[inputKey] = value;
    setWireflow(newWireflow);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Step Indicator */}
      <div className="flex justify-center mb-4">
        <div className="flex space-x-4">
          <div
            className={`px-4 py-2 rounded-full ${
              step === 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            1. Details
          </div>
          <div
            className={`px-4 py-2 rounded-full ${
              step === 2
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            2. Wires
          </div>
          <div
            className={`px-4 py-2 rounded-full ${
              step === 3
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            3. Review
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Wireflow Details</h3>
          <div>
            <label className="block text-sm text-gray-600">Wireflow ID:</label>
            <input
              type="text"
              value={wireflowId}
              onChange={(e) => setWireflowId(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter Wireflow ID"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter Description"
            />
          </div>
          <button
            onClick={handleNextStep}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Available Wires */}
            <Droppable droppableId="wires">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-full p-4 bg-gray-100 rounded-lg shadow-md md:w-64"
                >
                  <h3 className="mb-4 text-lg font-semibold">
                    Available Wires
                  </h3>
                  <ul className="space-y-2">
                    {wires.map((wire, index) => (
                      <Draggable
                        key={wire.wire_id}
                        draggableId={wire.wire_id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-3 transition-shadow duration-300 bg-white rounded-lg shadow-sm cursor-move hover:shadow-md"
                          >
                            <h4 className="font-semibold text-blue-800 text-md">
                              {wire.wire_id}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {wire.description}
                            </p>
                          </li>
                        )}
                      </Draggable>
                    ))}
                  </ul>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Wireflow Canvas */}
            <Droppable droppableId="wireflow">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md"
                >
                  <h3 className="mb-4 text-lg font-semibold">Wireflow</h3>
                  <ul className="space-y-2">
                    {wireflow.map((wire, index) => (
                      <Draggable
                        key={wire.wire_id}
                        draggableId={wire.wire_id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center justify-between p-3 transition-shadow duration-300 bg-white rounded-lg shadow-sm hover:shadow-md"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-blue-800 text-md">
                                {wire.wire_id}
                              </h4>
                              <div className="mt-2">
                                <label className="block text-sm text-gray-600">
                                  Inputs:
                                </label>
                                {Object.keys(wire.inputs || {}).map(
                                  (inputKey) => (
                                    <div key={inputKey} className="mt-1">
                                      <label className="block text-sm text-gray-600">
                                        {inputKey}:
                                      </label>
                                      <input
                                        type="text"
                                        value={wire.inputs[inputKey]}
                                        onChange={(e) =>
                                          updateWireInput(
                                            index,
                                            inputKey,
                                            e.target.value
                                          )
                                        }
                                        placeholder={wire.inputs[inputKey]} // Add placeholder
                                        className="w-full p-1 border rounded"
                                      />
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="mt-2">
                                <label className="block text-sm text-gray-600">
                                  Output Key:
                                </label>
                                <p className="text-sm text-gray-800">
                                  {wire.output_key}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeWireFromWireflow(index)}
                              className="p-1 text-red-600 transition-colors duration-300 rounded-full hover:text-red-800 hover:bg-red-50"
                            >
                              <FaTimes className="w-5 h-5" />
                            </button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                  </ul>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousStep}
              className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              onClick={handleNextStep}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </DragDropContext>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Review Wireflow</h3>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h4 className="font-semibold text-blue-800">Wireflow ID:</h4>
            <p className="text-gray-700">{wireflowId}</p>
            <h4 className="mt-2 font-semibold text-blue-800">Description:</h4>
            <p className="text-gray-700">{description}</p>
            <h4 className="mt-2 font-semibold text-blue-800">Wires:</h4>
            <ul className="space-y-2">
              {wireflow.map((wire, index) => (
                <li key={index} className="p-2 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-700">{wire.wire_id}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousStep}
              className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              onClick={() =>
                onSave({ wireflowId, description, wires: wireflow })
              }
              className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              Save Wireflow
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WireflowBuilder;
