import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TaskForm />
    <TaskList />
  </React.StrictMode>
);

