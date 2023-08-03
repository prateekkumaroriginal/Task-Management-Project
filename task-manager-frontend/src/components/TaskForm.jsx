import React, { useState } from 'react';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !status) {
            alert('All fields are required');
            return;
        }
        // Logic to submit the form
        fetch('http://127.0.0.1:3001/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, status }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            // handle response data
            setMessage('Form submitted successfully!');
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className='title'>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows="4" cols="100" />
                </label>
                <label>
                    Status:
                    <select value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="New">New</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </label>
                <button type="submit">Add Task</button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default TaskForm;
