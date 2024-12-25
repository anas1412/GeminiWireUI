import React from "react";
import { FaPlay, FaEdit, FaTrash } from "react-icons/fa";

const WireList = ({ wires, openExecuteModal, openEditModal, handleDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.keys(wires).map((functionName) => {
        const wire = wires[functionName];
        return (
          <div
            key={functionName}
            className="relative p-4 transition-colors bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:bg-gray-700"
          >
            <div className="flex items-start justify-between">
              <h2 className="mb-2 text-xl font-medium text-gray-100">
                {functionName}
              </h2>
              <div className="space-x-2">
                <button
                  onClick={() => openExecuteModal(wire)}
                  className="p-2 rounded-full btn btn-success"
                >
                  <FaPlay />
                </button>
                <button
                  onClick={() => openEditModal(wire)}
                  className="p-2 rounded-full btn btn-warning"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(functionName)}
                  className="p-2 rounded-full btn btn-error"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="mb-4 text-gray-300">{wire.description}</p>
            <div className="mt-2">
              <h3 className="mb-2 font-medium text-gray-200">Inputs:</h3>
              <ul className="text-gray-300 list-disc list-inside">
                {Object.keys(wire.inputs).map((inputName) => (
                  <li key={inputName} className="mb-1">
                    {inputName}: {wire.inputs[inputName]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WireList;
