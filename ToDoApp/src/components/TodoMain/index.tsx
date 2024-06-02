import React, { useState, useEffect } from "react";
import TodoInput from "../TodoInput";
import TodoList from "../TodoList";
import TodoFilterTabs from "../TodoFilterTabs";
import { FileterValue, Todo } from "../../types";
import { validateTodos } from "../../utils";
import {
  setToLocalStorage,
  readFromLocalStorage,
} from "../../localStorageService";
import {
  FILTER_VALUES,
  FILTER_VALUE_LIST,
  TODOS_STORAGE_KEY,
} from "../../constants";
import "../../index.scss";

const TodoMain: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FileterValue>(FILTER_VALUE_LIST[0]);

  useEffect(() => {
    readFromLocalStorage({
      storageKey: TODOS_STORAGE_KEY,
      validationFn: validateTodos,
      successFn: setTodos,
    });
  }, []);

  const addTodo = (description: string) => {
    const newTodo: Todo = { id: Date.now(), description, completed: false };
    setNewTodos([...todos, newTodo]);
  };

  const setNewTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
    setToLocalStorage({ storageKey: TODOS_STORAGE_KEY, value: newTodos });
  };

  const removeTodo = (toDoId: number) => {
    const newTodos: Todo[] = todos.filter((todo) => todo.id != toDoId);
    setNewTodos(newTodos);
  };

  const toggleTodo = (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setNewTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === FILTER_VALUES.ACTIVE) return !todo.completed;
    if (filter === FILTER_VALUES.COMPLETED) return todo.completed;
    return true;
  });

  const onFilterChange = (newFilterValue: FileterValue) => {
    setFilter(newFilterValue);
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-center text-3xl font-semibold mb-4">To Do List</h1>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md min-h-96 rounded-lg p-6">
          <TodoInput addTodo={addTodo} />
          <TodoFilterTabs
            activeFilter={filter}
            onFilterChange={onFilterChange}
          />
          <TodoList
            todos={filteredTodos}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoMain;
