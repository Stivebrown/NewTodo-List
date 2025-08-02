import "./app.css"; // Ensure Tailwind CSS is imported

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import NotFound from "./components/NotFound";
import TodoHeader from "./components/TodoHeader";
import { TaskProvider } from "./context/TaskContext";

function App() {

  return (
    <TaskProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <TodoHeader title="Task Dashboard" />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
