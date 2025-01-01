import React from "react";

const WireList = ({ wires, onEdit, onDelete, onExecute }) => {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 border-b">Wire ID</th>
          <th className="py-2 px-4 border-b">Description</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {wires.map((wire) => (
          <tr key={wire.wire_id} className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">{wire.wire_id}</td>
            <td className="py-2 px-4 border-b">{wire.description}</td>
            <td className="py-2 px-4 border-b">
              <button
                onClick={() => onEdit(wire.wire_id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(wire.wire_id)}
                className="bg-red-500 text-white px-2 py-1 rounded mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => onExecute(wire.wire_id)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Execute
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WireList;
