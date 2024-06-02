import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoMain from ".";

describe("TodoMain Component", () => {
  test("renders TodoMain component", () => {
    render(<TodoMain />);
    expect(screen.getByText(/To Do List/)).toBeInTheDocument();
  });

  test("Adds a new todo by clicking Add", () => {
    render(<TodoMain />);
    const input = screen.getByPlaceholderText(/Add a new task/);
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  test("can toggle todo status", () => {
    const todoName = "Task to Complete";
    render(<TodoMain />);
    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: todoName } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole("checkbox", { name: todoName });
    const todoItem = screen.getByText(todoName);
    // check
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(todoItem).toHaveClass("line-through");
    // uncheck
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(todoItem).not.toHaveClass("line-through");
  });

  test("can delete a todo", () => {
    const todoName = "Task to delete";
    render(<TodoMain />);
    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");
    fireEvent.change(input, { target: { value: todoName } });
    fireEvent.click(addButton);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(screen.queryByText(todoName)).not.toBeInTheDocument();
  });

  test("filters todos correctly", () => {
    const activeTodoName = "Todo1";
    const completedTodoName = "todo2";
    render(<TodoMain />);
    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: activeTodoName } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: completedTodoName } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole("checkbox", { name: completedTodoName });
    fireEvent.click(checkbox);

    // Filter All
    expect(screen.queryByText(completedTodoName)).toBeInTheDocument();
    expect(screen.queryByText(activeTodoName)).toBeInTheDocument();

    // Filter Active
    fireEvent.click(screen.getByText("Active"));
    expect(screen.queryByText(completedTodoName)).not.toBeInTheDocument();
    expect(screen.queryByText(activeTodoName)).toBeInTheDocument();

    // Filter Complited
    fireEvent.click(screen.getByText("Completed"));
    expect(screen.queryByText(completedTodoName)).toBeInTheDocument();
    expect(screen.queryByText(activeTodoName)).not.toBeInTheDocument();
  });
});
