import { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { useTasks } from "../context/TaskContext";

function Dashboard() {
  const { tasks, addTask, toggleTask, deleteTask, loading, error, isOnline } =
    useTasks();
  const [filter, setFilter] = useState("all");

  return (
    <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        <div className="mb-4">
          <label
            htmlFor="filter"
            className="block text-sm font-medium text-gray-700"
          >
            Filter Tasks
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-lg w-full"
          >
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        {loading && <p className="text-center p-4">Loading...</p>}
        {error && (
          <p
            className={`text-center p-4 ${
              isOnline ? "text-red-500" : "text-yellow-500"
            }`}
            role="alert"
          >
            {error}
          </p>
        )}
        {!loading && tasks.length === 0 && !error && (
          <p className="text-center text-gray-500">No tasks available.</p>
        )}
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          filter={filter}
        />
      </div>
      <TaskForm onAdd={addTask} />
    </main>
  );
}

export default Dashboard;