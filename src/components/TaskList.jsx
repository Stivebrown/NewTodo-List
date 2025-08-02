import React from "react";
import PropTypes from "prop-types";
import TaskCard from "./TaskCard"; // Assuming you have a TaskCard component

const TaskList = ({ tasks, onToggle, onDelete, filter }) => {
  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <>
      <div className="space-y-4">
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.oneOf(["done", "pending"]).isRequired,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
filter: PropTypes.oneOf(["all", "done", "pending"]).isRequired,
};

export default TaskList;
