import React, { useState, useEffect } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
// import { BsPencilSquare, BsTrash, BsCheck, BsX } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TaskComponent from "./Components/Task";

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

	const props = {
		tasks,
		setTasks,
		editTaskId,
		setEditTaskId,
		editTaskText,
		setEditTaskText,
		handleSaveEditedTask,
		handleEditTask,
		handleDeleteTask,
	};

	return (
		<div className="app">
			<h1 className="mb-4 font-section">Todo List</h1>
			<Form.Group className="mb-4">
				<InputGroup className="d-md-flex flex-md-row flex-column gap-3 ">
					{/* Task Input Field  */}
					<div>
						<FormControl
							type="text"
							placeholder="Add a new task"
							value={newTask}
							onChange={(e) => setNewTask(e.target.value)}
						/>
					</div>
					{/* Task Priority List */}
					<div>
						{" "}
						<Form.Select aria-label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</Form.Select>
					</div>

					{/* Add Task Button  */}
					<div>
						<Button variant="primary" onClick={handleAddTask}>
							Add Task
						</Button>
					</div>
				</InputGroup>
			</Form.Group>

			<div className="task-stats mt-4 d-flex flex-row gap-4">
				<p>Total Tasks: {tasks.length}</p>
				<p className="text-success">Completed Tasks: {tasks.filter((task) => task.completed).length}</p>
			</div>

			<TaskComponent props={props} />
		</div>
	);
};

export default App;
