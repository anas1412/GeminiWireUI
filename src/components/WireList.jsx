import React from "react";

const WireList = ({ wires, openExecuteModal, openEditModal, handleDelete }) => {
  return (
    <div className="space-y-4">
      {wires.map((wire) => (
        <div
          key={wire}
          className="flex items-center justify-between p-4 transition-colors bg-gray-800 border border-gray-700 rounded hover:bg-gray-700"
        >
          <span className="font-medium text-gray-100">{wire}</span>
          <div className="space-x-2">
            <button
              onClick={() => openExecuteModal(wire)}
              className="rounded btn btn-success"
            >
              Execute
            </button>
            <button
              onClick={() => openEditModal(wire)}
              className="rounded btn btn-warning"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(wire)}
              className="rounded btn btn-error"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WireList;
