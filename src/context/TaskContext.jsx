import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Fetch tasks from JSONPlaceholder when online
  useEffect(() => {
    const fetchTasks = async () => {
      if (!isOnline) {
        setError("Offline: Showing local tasks");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );
        const fetchedTasks = response.data.map((todo) => ({
          id: todo.id,
          title: todo.title,
          description: "",
          status: todo.completed ? "done" : "pending",
        }));

        // Merge fetched tasks with local tasks, avoiding duplicates
        setTasks((prevTasks) => {
          const existingIds = new Set(prevTasks.map((task) => task.id));
          const newTasks = fetchedTasks.filter(
            (task) => !existingIds.has(task.id)
          );
          return [...prevTasks, ...newTasks];
        });
        setError("");
      } catch (err) {
        setError("Failed to fetch tasks. Showing local tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [isOnline]);

  // Persist tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([
      ...tasks,
      { ...task, id: Math.max(...tasks.map((t) => t.id), 0) + 1, status: "pending" },
    ]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "done" ? "pending" : "done" }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        loading,
        error,
        isOnline,
        setTasks,
        setLoading,
        setError,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTasks = () => useContext(TaskContext);