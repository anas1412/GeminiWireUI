import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const WireflowBuilder = ({ wires, onSave }) => {
  const [workflow, setWorkflow] = useState([]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === "wires" &&
      destination.droppableId === "workflow"
    ) {
      const wire = wires.find((w) => w.id === result.draggableId);
      setWorkflow([...workflow, wire]);
    }
  };

  return (
    <div className="p-6 flex gap-6">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Available Wires */}
        <Droppable droppableId="wires">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-64 bg-gray-100 p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Available Wires</h3>
              <ul className="space-y-2">
                {wires.map((wire, index) => (
                  <Draggable key={wire.id} draggableId={wire.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-2 rounded shadow-sm cursor-move"
                      >
                        {wire.wire_id}
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Workflow Canvas */}
        <Droppable droppableId="workflow">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex-1 bg-gray-100 p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Workflow</h3>
              <ul className="space-y-2">
                {workflow.map((wire, index) => (
                  <li key={wire.id} className="bg-white p-2 rounded shadow-sm">
                    {wire.wire_id}
                  </li>
                ))}
              </ul>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={() => onSave(workflow)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Wireflow
      </button>
    </div>
  );
};

export default WireflowBuilder;
