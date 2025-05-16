import React, { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [loaded, setLoaded] = useState(false); // Hindari StrictMode overwrite

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch (e) {
        console.error("Gagal parsing localStorage", e);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loaded]);

  const addTodo = () => {
    if (inputText.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputText,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      setInputText("");
      setShowInput(false);
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-start p-4">
      <div className="bg-white w-full max-w-[390px] rounded-xl shadow-lg flex flex-col p-4">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold">
            Simple
            <br />
            To-do List
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Todo List */}
        <div className="flex-1 mb-4 max-h-[54vh] sm:max-h-[44vh] overflow-y-auto space-y-2 pr-1">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
          ))}
        </div>

        {/* Form input di atas tombol plus */}
        {showInput && (
          <div className="mb-3 border-t-2 border-gray-200">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md mb-2 resize-none mt-2"
              rows="3"
              placeholder="Tambah aktivitas...."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={addTodo}
              className="w-full bg-green-600 text-white rounded-md py-2 hover:bg-green-700 cursor-pointer"
            >
              Tambah
            </button>
          </div>
        )}

        {/* Button Row: Reset & + */}
        <div className="flex space-x-2">
          <button
            onClick={() => setShowInput(true)}
            className="flex-[2] bg-blue-600 text-white text-2xl font-bold py-2 rounded-md hover:bg-blue-700 cursor-pointer"
          >
            +
          </button>

          <button
            onClick={() => {
              if (confirm("Yakin ingin menghapus semua aktivitas?")) {
                setTodos([]);
                localStorage.removeItem("todos");
              }
            }}
            className="flex-1 bg-red-500 text-white text-md py-2 rounded-md hover:bg-red-600 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
