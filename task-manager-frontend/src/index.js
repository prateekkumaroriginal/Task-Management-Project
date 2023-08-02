import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TaskForm from './components/TaskForm'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TaskForm />
  </React.StrictMode>
);

