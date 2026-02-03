import { useState, useEffect } from "react";
import Delete from "./components/Delete";
import Deletelist from "./components/Deletelist";
import styles from "./App.module.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, settaskName] = useState("");

  useEffect(() => {
    fetchTodo();
  }, []);

  const handleUpdate = (event) => {
    settaskName(event.target.value);
  };

  const handleAdd = async (e) => {
    if (e) e.preventDefault();
    if (!taskName.trim()) return;
    try {
      let body = {
        taskname: taskName,
      };
      const response = await fetch("http://localhost:8000/todo-add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      settaskName("");
      fetchTodo();
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchTodo = async () => {
    let url = "http://localhost:8000/todo-list";
    let response = await fetch(url);
    let result = await response.json();
    let data = result.data || [];
    setTasks(data);
  };

  const handleDelete = async (id) => {
    try {
      let url = `http://localhost:8000/delete-todo/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task. Status: ${response.status}`);
      }

      fetchTodo();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTruncate = async () => {
    try {
      let url = `http://localhost:8000/todo-truncate`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete list. Status: ${response.status}`);
      }

      fetchTodo();
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const edit = async (id, status) => {
    try {
      let body = {
        status: status === "inactive" ? "active" : "inactive",
        id: id,
      };
      let url = `http://localhost:8000/todo-edit`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`Failed to edit list`);
      }
      fetchTodo();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>My Beautiful Todo</h1>
          <p>Focus on what's important — {tasks.length} tasks</p>
        </div>

        <form className={styles.form} onSubmit={handleAdd}>
          <input
            className={styles.input}
            placeholder="What do you want to accomplish?"
            value={taskName}
            onChange={handleUpdate}
            aria-label="New task"
          />
          <button className={styles.addBtn} type="submit" disabled={!taskName.trim()}>
            Add
          </button>
        </form>
      </div>

      <div className={styles.tasks}>
        {tasks.length === 0 ? (
          <div className={styles.noTasks}>No tasks yet — add something ✨</div>
        ) : (
          tasks.map((task) => (
            <div className={styles.card} key={task.id}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={task.status === "inactive"}
                onChange={() => edit(task.id, task.status)}
                aria-label={`Mark ${task.taskname} complete`}
              />
              <div className={`${styles.taskText} ${task.status === "inactive" ? styles.completed : ""}`}>
                {task.taskname}
              </div>
              <div className={`${styles.status} ${task.status === "inactive" ? styles.inactive : styles.active}`}>
                {task.status}
              </div>
              <Delete onClick={() => handleDelete(task.id)} />
            </div>
          ))
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.count}>{tasks.filter((t) => t.status !== "inactive").length} active</div>
        <Deletelist truncate={handleTruncate} />
      </div>
    </div>
  );
}

export default App;
