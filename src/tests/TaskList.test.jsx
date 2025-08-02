import { render, screen } from "@testing-library/react";
import TaskList from "../components/TaskList";

describe("TaskList", () => {
  const tasks = [
    { id: 1, title: "Task 1", description: "", status: "done" },
    { id: 2, title: "Task 2", description: "", status: "pending" },
  ];
  const mockToggle = jest.fn();
  const mockDelete = jest.fn();

  test("filters tasks by status", () => {
    render(
      <TaskList
        tasks={tasks}
        onToggle={mockToggle}
        onDelete={mockDelete}
        filter="done"
      />
    );
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  });
});