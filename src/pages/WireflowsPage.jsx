import React, { useState, useEffect } from "react";
import WireflowBuilder from "../components/WireflowBuilder";
import API_BASE_URL from "../config";

const WireflowsPage = () => {
  const [wires, setWires] = useState([]);
  const [wireflows, setWireflows] = useState([]);

  // Fetch wires from the API
  const fetchWires = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/wires/`);
      if (!response.ok) throw new Error("Failed to fetch wires");
      const data = await response.json();
      setWires(data);
    } catch (error) {
      console.error("Error fetching wires:", error);
    }
  };

  // Fetch wireflows from the API
  const fetchWireflows = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/wireflows/`);
      if (!response.ok) throw new Error("Failed to fetch wireflows");
      const data = await response.json();
      setWireflows(data);
    } catch (error) {
      console.error("Error fetching wireflows:", error);
    }
  };

  // Load wires and wireflows when the component mounts
  useEffect(() => {
    fetchWires();
    fetchWireflows();
  }, []);

  // Handle saving a wireflow
  const handleSaveWireflow = async (workflow) => {
    try {
      const workflowId = prompt("Enter a unique ID for this wireflow:");
      if (workflowId) {
        const response = await fetch(`${API_BASE_URL}/wireflows/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            workflow_id: workflowId,
            wires: workflow,
          }),
        });
        if (!response.ok) throw new Error("Failed to save wireflow");
        fetchWireflows(); // Refresh the list of wireflows
      }
    } catch (error) {
      console.error("Error saving wireflow:", error);
    }
  };

  return (
    <div>
      <WireflowBuilder wires={wires} onSave={handleSaveWireflow} />
    </div>
  );
};

export default WireflowsPage;
