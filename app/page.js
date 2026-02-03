"use client";
import { useMemo, useState } from "react";
import "./index.css";
import ShortUniqueId from "short-unique-id";

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const uid = useMemo(() => new ShortUniqueId(), []);

  const handleAddButton = () => {
    const text = inputValue.trim();
    if (!text) return;

    setTodos((prev) => [
      ...prev,
      { todo: text, status: "Active", id: uid.stamp(32) },
    ]);

    setInputValue("");
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Completed" ? "Active" : "Completed" }
          : t,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const visibleTodos = todos.filter((t) => {
    if (filter === "All") return true;
    return t.status === filter;
  });

  return (
    <div className="container">
      <p className="text">To-Do List</p>

      <div className="task">
        <input
          className="task-text"
          placeholder="Add a new task..."
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddButton();
          }}
        />
        <button className="add-button" onClick={handleAddButton}>
          Add
        </button>
      </div>

      <div className="AAC">
        <button
          className="all"
          onClick={() => setFilter("All")}
          style={{ backgroundColor: filter === "All" ? "blue" : "white" }}
        >
          All
        </button>
        <button
          className="active"
          onClick={() => setFilter("Active")}
          style={{ backgroundColor: filter === "Active" ? "blue" : "white" }}
        >
          Active
        </button>
        <button
          className="completed"
          onClick={() => setFilter("Completed")}
          style={{ backgroundColor: filter === "Completed" ? "blue" : "white" }}
        >
          Completed
        </button>
      </div>

      {todos.length === 0 && (
        <div className="div">
          <p className="no-task">No tasks yet. Add one above</p>
        </div>
      )}

      {visibleTodos.map((item) => (
        <div className="create" key={item.id}>
          <div className="create-pr">
            <input
              className="box"
              type="checkbox"
              checked={item.status === "Completed"}
              onChange={() => toggleTodo(item.id)}
            />
            <span
              style={{
                textDecoration:
                  item.status === "Completed" ? "line-through" : "none",
              }}
            >
              {item.todo}
            </span>
            <button className="delete" onClick={() => deleteTodo(item.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="power">
        <p className="powered-by">Powered by </p>
        <p className="pinecone">Pinecone academy</p>
      </div>
    </div>
  );
}
