import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../components/TaskForm";

describe("TaskForm", () => {
  const mockAdd = jest.fn();

  test("shows error when title is empty", () => {
    render(<TaskForm onAdd={mockAdd} />);
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("Title is required");
    expect(mockAdd).not.toHaveBeenCalled();
  });

  test("submits valid form data", () => {
    render(<TaskForm onAdd={mockAdd} />);
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(mockAdd).toHaveBeenCalledWith({
      title: "Test Task",
      description: "Test Description",
      status: "pending",
    });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});