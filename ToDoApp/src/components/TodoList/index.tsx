import React from "react";
import TodoItem from "../TodoItem";
import { Todo } from "../../types";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  removeTodo,
}) => {
  if (!todos.length) {
    return <div className="text-center pt-5">No Todos</div>;
  }
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
