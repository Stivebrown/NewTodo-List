import { render, screen, waitFor } from "@testing-library/react";
import { TaskProvider } from "../context/TaskContext";
import Dashboard from "../components/Dashboard";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

describe("App", () => {
  test("displays tasks after fetching from API when online", async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: "Test Task", completed: false },
      ],
    });

    render(
      <TaskProvider>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </TaskProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("Test Task")).toBeInTheDocument()
    );
  });

  test("shows local tasks when offline", async () => {
    // Mock navigator.onLine to simulate offline
    Object.defineProperty(window, "navigator", {
      value: { onLine: false },
      writable: true,
    });

    // Mock localStorage with tasks
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        { id: 1, title: "Local Task", description: "", status: "pending" },
      ])
    );

    render(
      <TaskProvider>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </TaskProvider>
    );

    expect(screen.getByText("Local Task")).toBeInTheDocument();
    expect(screen.getByText("Offline: Showing local tasks")).toBeInTheDocument();
  });

  test("displays fetch error when online and API fails", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    render(
      <TaskProvider>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </TaskProvider>
    );

    await waitFor(() =>
      expect(screen.getByText("Failed to fetch tasks. Showing local tasks.")).toBeInTheDocument()
    );
  });
});