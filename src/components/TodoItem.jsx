import React from "react";

const TodoItem = ({ todo, toggleTodo }) => {
  return (
    <div
      className={`flex justify-between items-center p-3 rounded-md cursor-pointer ${
        todo.completed
          ? "bg-blue-100 text-gray-400"
          : "bg-blue-200"
      }`}
      onClick={() => toggleTodo(todo.id)}
    >
      <span>{todo.text}</span>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
          className="sr-only peer"
        />
        <div className="w-5 h-5 rounded-full bg-white peer-checked:bg-blue-400 peer-checked:border-blue-400 transition-all"></div>
      </label>
    </div>
  );
};

export default TodoItem;
