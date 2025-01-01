import React from "react";

const WireDetail = ({ wire }) => {
  if (!wire) return <p className="p-6 text-red-500">Wire not found.</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Wire Details</h1>
      <p className="mb-2">
        <strong>Wire ID:</strong> {wire.wire_id}
      </p>
      <p className="mb-2">
        <strong>Description:</strong> {wire.description}
      </p>
      <p className="mb-2">
        <strong>Prompt:</strong> {wire.prompt}
      </p>
      <p className="mb-2">
        <strong>Inputs:</strong> {JSON.stringify(wire.inputs)}
      </p>
      <p className="mb-2">
        <strong>Output Key:</strong> {wire.output_key}
      </p>
    </div>
  );
};

export default WireDetail;
