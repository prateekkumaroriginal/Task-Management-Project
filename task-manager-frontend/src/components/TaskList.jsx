import React, { useState, useEffect } from 'react';

function TaskList() {
    // State to store the tasks
    const [tasks, setTasks] = useState([]);

    // Function to fetch tasks from the API
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3001/tasks');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // Update the tasks state
            setTasks(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    // Fetch tasks after the first render
    useEffect(() => {
        fetchTasks();
    }, []);

    const handleChangeStatus = async (taskId, status) => {
        try {
            const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: status })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Fetch tasks again to update the list
            fetchTasks();
        } catch (error) {
            console.error('There has been a problem with your status update:', error);
        }
    };

    const handleStatusChanged = (taskId, event) => {
        const { value } = event.target;
        handleChangeStatus(taskId, value);
    };

    return (
        <div>
            <h1>Task List</h1>
            {tasks.map(task => (
                <div key={task.id} className="task">
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p>Status:
                        <select value={task.status} onChange={(event) => handleStatusChanged(task.id, event)}>
                            <option value="New">New</option>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </p>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
