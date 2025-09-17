import React, { useState, useEffect, useRef } from "react";
// import "./styles.css";
// Hi i am rahul
import "./App.css"

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const text = taskText.trim();
    if (!text) return;

    const newTask = { id: Date.now(), text };
    setTasks((prev) => [newTask, ...prev]);
    setTaskText("");
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editId === id) {
      setEditId(null);
      setEditText("");
    }
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const text = editText.trim();
    if (!text) return;

    setTasks((prev) => prev.map((t) => (t.id === editId ? { ...t, text } : t)));
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="app">
      <h1>React To-Do List</h1>

      <form onSubmit={handleAdd} className="add-form">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a new task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">
          Add
        </button>
      </form>

      <ul className="task-list">
        {tasks.length === 0 && (
          <li className="empty">No tasks yet — add one above!</li>
        )}

        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {editId === task.id ? (
              <form onSubmit={saveEdit} className="edit-form">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="input"
                />
                <button type="submit" className="btn">
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span className="task-text">{task.text}</span>
                <div className="actions">
                  <button
                    onClick={() => startEdit(task)}
                    className="btn btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
