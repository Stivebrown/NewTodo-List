import React from 'react'
import PropTypes from 'prop-types';


const TaskCard = ({task, onToggle, onDelete}) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center"
      role="article"
      aria-labelledby={`task-${task.id}`}
    >
      <div>
        <h3 id={`task-${task.id}`} className="text-lg font-semibold">
          {task.title}
        </h3>
        <p className="text-gray-600">{task.description || "No description"}</p>
        <p
          className={`text-sm ${
            task.status === "done" ? "text-green-500" : "text-yellow-500"
          }`}
        >
          Status: {task.status}
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onToggle(task.id)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          aria-label={`Toggle status of ${task.title}`}
        >
          Toggle
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

TaskCard.propType = {
task: PropTypes.shape ({
  id: PropTypes.number.isRequired,
title: PropTypes.string.isRequired,
description: PropTypes.string,
status: PropTypes.oneOf(['Done', 'Pending']).isRequired,
onToggle: PropTypes.func.isRequired,
onDelete: PropTypes.func.isRequired
}).isRequired
}
export default TaskCard;