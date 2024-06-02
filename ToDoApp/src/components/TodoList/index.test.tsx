import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoList from ".";

describe("TodoList", () => {
  const todos = [
    { id: 1, description: "Test Todo 1", completed: false },
    { id: 2, description: "Test Todo 2", completed: true },
  ];

  const mockToggleTodo = jest.fn();
  const mockRemoveTodo = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders 'No Todos' when the todo list is empty", () => {
    render(
      <TodoList
        todos={[]}
        toggleTodo={mockToggleTodo}
        removeTodo={mockRemoveTodo}
      />
    );
    expect(screen.getByText("No Todos")).toBeInTheDocument();
  });

  test("renders a list of todos", () => {
    render(
      <TodoList
        todos={todos}
        toggleTodo={mockToggleTodo}
        removeTodo={mockRemoveTodo}
      />
    );
    expect(screen.getAllByRole("todo-item")).toHaveLength(todos.length);
  });
});
