import React, { useState, useEffect } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { BsPencilSquare, BsTrash, BsCheck, BsX } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
	const [tasks, setTasks] = useState(() => {
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

	const handleAddTask = () => {
		if (newTask.trim() !== "") {
			setTasks((prevTasks) => [...prevTasks, { id: Date.now(), text: newTask, completed: false, priority }]);
			setNewTask("");
		}
	};

	const handleDeleteTask = (taskId) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
	};

	const handleEditTask = (task) => {
		setEditTaskId(task.id);
		setEditTaskText(task.text);
	};

	const handleSaveEditedTask = () => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => (task.id === editTaskId ? { ...task, text: editTaskText } : task))
		);
		setEditTaskId(null);
		setEditTaskText("");
	};

	return (
		<div className="app">
			<h1 className="mb-4">Todo List</h1>
			<Form.Group className="add-task mb-4">
				<InputGroup>
					<FormControl
						type="text"
						placeholder="Add a new task"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
					/>
					<Form.Select aria-label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</Form.Select>
					<Button variant="primary" onClick={handleAddTask}>
						Add Task
					</Button>
				</InputGroup>
			</Form.Group>
			<div className="task-list">
				{tasks.map((task) => (
					<div className={`task ${task.completed ? "completed" : ""}`} key={task.id}>
						<InputGroup className="mb-2">
							<Form.Check
								type="checkbox"
								checked={task.completed}
								onChange={() => {
									setTasks((prevTasks) =>
										prevTasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t))
									);
								}}
							/>
							{editTaskId === task.id ? (
								<>
									<FormControl
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
									<Button variant="success" onClick={handleSaveEditedTask}>
										<BsCheck />
									</Button>
									<Button variant="danger" onClick={() => setEditTaskId(null)}>
										<BsX />
									</Button>
								</>
							) : (
								<>
									<Form.Control plaintext readOnly value={task.text} onClick={() => handleEditTask(task)} />
									<Button variant="info" onClick={() => handleEditTask(task)}>
										<BsPencilSquare />
									</Button>
									<Button variant="danger" onClick={() => handleDeleteTask(task.id)}>
										<BsTrash />
									</Button>
								</>
							)}
						</InputGroup>
					</div>
				))}
			</div>
			<div className="task-stats mt-4">
				<p>Total Tasks: {tasks.length}</p>
				<p>Completed Tasks: {tasks.filter((task) => task.completed).length}</p>
			</div>
		</div>
	);
};

export default App;
