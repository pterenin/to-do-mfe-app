import React from "react";

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  removeTodo,
}) => {
  return (
    <li
      role="todo-item"
      className="border-b border-gray-200 flex items-center justify-between py-4"
    >
      <label className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span className={todo.completed ? "line-through" : ""}>
          {todo.description}
        </span>
      </label>

      <button
        className="text-red-500 hover:text-red-700 mr-2 delete-btn"
        onClick={() => {
          removeTodo(todo.id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
