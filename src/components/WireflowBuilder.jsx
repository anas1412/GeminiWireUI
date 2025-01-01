import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const WireflowBuilder = ({ wires, onSave, initialWorkflow }) => {
  const [workflow, setWorkflow] = useState(initialWorkflow || []);

  // Handle drag-and-drop
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return; // Dropped outside the list

    if (
      source.droppableId === "wires" &&
      destination.droppableId === "workflow"
    ) {
      // Add wire to workflow
      const wire = wires.find((w) => w.id === result.draggableId);
      setWorkflow([...workflow, wire]);
    } else if (
      source.droppableId === "workflow" &&
      destination.droppableId === "workflow"
    ) {
      // Reorder wires in workflow
      const newWorkflow = Array.from(workflow);
      const [removed] = newWorkflow.splice(source.index, 1);
      newWorkflow.splice(destination.index, 0, removed);
      setWorkflow(newWorkflow);
    }
  };

  // Remove a wire from the workflow
  const removeWireFromWorkflow = (index) => {
    const newWorkflow = workflow.filter((_, i) => i !== index);
    setWorkflow(newWorkflow);
  };

  return (
    <div className="flex flex-col gap-6 p-6 md:flex-row">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Available Wires */}
        <Droppable droppableId="wires">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-full p-4 bg-gray-100 rounded-lg shadow-md md:w-64"
            >
              <h3 className="mb-4 text-lg font-semibold">Available Wires</h3>
              <ul className="space-y-2">
                {wires.map((wire, index) => (
                  <Draggable key={wire.id} draggableId={wire.id} index={index}>
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

        {/* Workflow Canvas */}
        <Droppable droppableId="workflow">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <h3 className="mb-4 text-lg font-semibold">Workflow</h3>
              <ul className="space-y-2">
                {workflow.map((wire, index) => (
                  <Draggable key={wire.id} draggableId={wire.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center justify-between p-3 transition-shadow duration-300 bg-white rounded-lg shadow-sm hover:shadow-md"
                      >
                        <div>
                          <h4 className="font-semibold text-blue-800 text-md">
                            {wire.wire_id}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {wire.description}
                          </p>
                        </div>
                        <button
                          onClick={() => removeWireFromWorkflow(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
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
      </DragDropContext>

      {/* Save Button */}
      <button
        onClick={() => onSave(workflow)}
        className="px-4 py-2 mt-4 text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
      >
        Save Wireflow
      </button>
    </div>
  );
};

export default WireflowBuilder;
