import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
	const [tasks, setTasks] = useState(() => {
		// Load tasks from local storage or initialize with empty array
		const storedTasks = JSON.parse(localStorage.getItem("tasks"));
		return storedTasks || [];
	});
	const [newTask, setNewTask] = useState("");
	const [priority, setPriority] = useState("low");
	const [editTaskId, setEditTaskId] = useState(null);
	const [editTaskText, setEditTaskText] = useState("");

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	// Function to handle adding a new task
	const handleAddTask = () => {
		if (newTask.trim() !== "") {
			setTasks((prevTasks) => [...prevTasks, { id: Date.now(), text: newTask, completed: false, priority }]);
			setNewTask("");
		}
	};

	// Function to handle marking a task as completed
	const handleToggleComplete = (taskId) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
		);
	};

	// Function to handle deleting a task
	const handleDeleteTask = (taskId) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
	};

	// Function to handle editing a task
	const handleEditTask = (task) => {
		setEditTaskId(task.id);
		setEditTaskText(task.text);
	};

	// Function to save edited task
	const handleSaveEditedTask = () => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => (task.id === editTaskId ? { ...task, text: editTaskText } : task))
		);
		setEditTaskId(null);
		setEditTaskText("");
	};

	return (
		<div className="app">
			<h1>Todo List</h1>
			<div className="add-task">
				<input
					type="text"
					placeholder="Add a new task"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>
				<select onChange={(e) => setPriority(e.target.value)} value={priority}>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
				<button onClick={handleAddTask}>Add Task</button>
			</div>
			<div className="task-list">
				{tasks.map((task) => (
					<div className={`task ${task.completed ? "completed" : ""}`} key={task.id}>
						{editTaskId === task.id ? (
							<input
								type="text"
								value={editTaskText}
								onChange={(e) => setEditTaskText(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleSaveEditedTask();
									}
								}}
								autoFocus
							/>
						) : (
							<span onClick={() => handleEditTask(task)}>{task.text}</span>
						)}
						<div className="actions">
							<button onClick={() => handleToggleComplete(task.id)}>
								{task.completed ? "Undo" : "Complete"}
							</button>
							<button onClick={() => handleDeleteTask(task.id)}>Delete</button>
						</div>
					</div>
				))}
			</div>
			<div className="task-stats">
				<p>Total Tasks: {tasks.length}</p>
				<p>Completed Tasks: {tasks.filter((task) => task.completed).length}</p>
			</div>
		</div>
	);
};

export default App;
