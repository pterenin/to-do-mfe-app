import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoInput from ".";

describe("TodoInput", () => {
  test("calls addTodo with the correct description when 'Add' button is clicked", () => {
    const addTodoMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <TodoInput addTodo={addTodoMock} />
    );

    const input = getByPlaceholderText("Add a new task") as HTMLInputElement;
    const addButton = getByText("Add");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(addTodoMock).toHaveBeenCalledWith("New Task");
    expect(input.value).toBe("");
  });

  test("calls addTodo with the correct description when 'Enter' key is pressed", () => {
    const addTodoMock = jest.fn();
    const { getByPlaceholderText } = render(
      <TodoInput addTodo={addTodoMock} />
    );

    const input = getByPlaceholderText("Add a new task") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(addTodoMock).toHaveBeenCalledWith("New Task");
    expect(input.value).toBe("");
  });

  test("does not call addTodo when description is empty", () => {
    const addTodoMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <TodoInput addTodo={addTodoMock} />
    );

    const input = getByPlaceholderText("Add a new task") as HTMLInputElement;
    const addButton = getByText("Add");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(addButton);

    expect(addTodoMock).not.toHaveBeenCalled();
  });

  test("does not call addTodo when description is only whitespace", () => {
    const addTodoMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <TodoInput addTodo={addTodoMock} />
    );

    const input = getByPlaceholderText("Add a new task") as HTMLInputElement;
    const addButton = getByText("Add");

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(addButton);

    expect(addTodoMock).not.toHaveBeenCalled();
  });
});
