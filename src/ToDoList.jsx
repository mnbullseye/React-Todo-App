import React, { useState, useEffect } from "react";

function TodoList() {
  
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");

  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTaskUsingEnterKey(event){
    if(event.key == "Enter"){
        addTask();
    }
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function toggleTask(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  return (
    <div className="to-do-list">
      <h1>To Do List</h1>
      <div className="input-container">
        <input
          type="text"
          id="todo-input"
          placeholder="Add Text"
          autoComplete="off"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={addTaskUsingEnterKey}
        />
        <button className="add-new-task-btn" onClick={addTask} onk>
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li className="todo" key={index}>
            {/* Checkbox is bound to task.completed */}
            <input
              type="checkbox"
              id={`todo-${index}`}
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />

            <label className="custom-checkbox" htmlFor={`todo-${index}`}>
              <svg
                fill="transparent"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            </label>

            {/* If completed, style differently */}
            <label
              htmlFor={`todo-${index}`}
              className="todo-text"
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                opacity: task.completed ? 0.6 : 1,
              }}
            >
              {task.text}
            </label>

            <button className="delete-btn" onClick={() => deleteTask(index)}>
              <svg
                fill="var(--secondary-clr)"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoList;
