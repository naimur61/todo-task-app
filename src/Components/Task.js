import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { BsCheck, BsTrash, BsPencilSquare, BsX } from "react-icons/bs";

const TaskComponent = ({ props }) => {
	const {
		tasks,
		setTasks,
		editTaskId,
		setEditTaskId,
		editTaskText,
		setEditTaskText,
		handleSaveEditedTask,
		handleEditTask,
		handleDeleteTask,
	} = props;

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<div className="task-list">
						{tasks.map((task) => (
							<div
								className={`d-md-flex flex-md-row flex-column justify-content-between gap-3 task ${
									task.completed ? "completed" : ""
								}`}
								key={task.id}
							>
								<div className="d-flex align-items-center mb-2">
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
									) : (
										<Form.Control
											plaintext
											readOnly
											value={task.text}
											onClick={() => handleEditTask(task)}
											className="flex-grow-1 mx-3"
										/>
									)}
								</div>
								<div className="d-flex align-items-center">
									{editTaskId === task.id ? (
										<div className="d-flex flex-row gap-2">
											<Button variant="success" onClick={handleSaveEditedTask}>
												<BsCheck />
											</Button>
											<Button variant="danger" onClick={() => setEditTaskId(null)}>
												<BsX />
											</Button>
										</div>
									) : (
										<div className="d-flex flex-row gap-2">
											<Button variant="info" onClick={() => handleEditTask(task)}>
												<BsPencilSquare />
											</Button>
											<Button variant="danger" onClick={() => handleDeleteTask(task.id)}>
												<BsTrash />
											</Button>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TaskComponent;
