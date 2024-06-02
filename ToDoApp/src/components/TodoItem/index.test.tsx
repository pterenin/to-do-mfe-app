import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoItem from ".";

describe("TodoItem component", () => {
  const todo = {
    id: 1,
    description: "Test Todo",
    completed: false,
  };

  const toggleTodo = jest.fn();
  const removeTodo = jest.fn();

  test("renders the todo item", () => {
    render(
      <TodoItem todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    );

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByRole("button", { name: /Delete/ })).toBeInTheDocument();
  });

  test("calls toggleTodo when checkbox is clicked", () => {
    render(
      <TodoItem todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    );
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(toggleTodo).toHaveBeenCalledWith(todo.id);
  });

  test("calls removeTodo when delete button is clicked", () => {
    render(
      <TodoItem todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    );
    const deleteButton = screen.getByRole("button", { name: /Delete/ });
    fireEvent.click(deleteButton);
    expect(removeTodo).toHaveBeenCalledWith(todo.id);
  });

  test("applies line-through class when todo is completed", () => {
    const completedTodo = { ...todo, completed: true };
    render(
      <TodoItem
        todo={completedTodo}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
    );
    const description = screen.getByText("Test Todo");
    expect(description).toHaveClass("line-through");
  });
});
