import React, { useState } from "react";
import { MAX_DESCRIPTION_LENGTH } from "../../constants";

interface TodoInputProps {
  addTodo: (description: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [description, setDescription] = useState<string>("");

  const handleAdd = () => {
    if (
      description.trim() &&
      description.trim().length < MAX_DESCRIPTION_LENGTH
    ) {
      addTodo(description);
      setDescription("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        className="w-full px-4 py-2 mr-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
        value={description}
        placeholder="Add a new task"
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
