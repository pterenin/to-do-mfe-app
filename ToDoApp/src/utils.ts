import { Todo } from "./types";

export const validateTodos = (todos: Todo[]): boolean => {
  return todos.every(isValidTodo);
};

const isValidTodo = (todo: Todo): boolean => {
  if (typeof todo.id !== "number") {
    return false;
  }
  if (typeof todo.completed !== "boolean") {
    return false;
  }
  if (typeof todo.description !== "string" || todo.description.trim() === "") {
    return false;
  }
  if (todo.description.length > 100) {
    return false;
  }
  return true;
};
