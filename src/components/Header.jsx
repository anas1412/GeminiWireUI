import React from "react";

const Header = ({ setIsAddModalOpen, setFormData, setSelectedWire }) => {
  const handleAddWire = () => {
    setFormData({ function_name: "", description: "", inputs: [] });
    setSelectedWire(null);
    setIsAddModalOpen(true);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-100">
        Wire Management Dashboard
      </h1>
      <button onClick={handleAddWire} className="btn btn-primary">
        Add Wire
      </button>
    </div>
  );
};

export default Header;
