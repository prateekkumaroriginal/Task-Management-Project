const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./taskModel');
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
const port = 3001;
const db_uri = 'mongodb://127.0.0.1/taskmanagerDB'

mongoose.connect(db_uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB\n', err));


app.route('/tasks')
    .get((req, res) => {
        Task.find()
            .then(tasks => res.json(tasks))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .post((req, res) => {
        console.log(req.body);
        Task.create(req.body)
            .then(task => res.json(task))
            .catch(err => res.status(400).json('Error: ' + err));
    });

app.route('/tasks/:taskId')
    .get((req, res) => {
        Task.findById(req.params.taskId)
            .then(task => res.json(task))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .put((req, res) => {
        Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true })
            .then((task) => res.json(task))
            .catch((err) => res.status(400).json('Error: ' + err));
    })
    .patch((req, res) => {
        Task.findById(req.params.taskId)
            .then((task) => {
                Object.assign(task, req.body);
                return task.save();
            })
            .then((task) => res.json(task))
            .catch((err) => res.status(400).json('Error: ' + err));
    })
    .delete((req, res) => {
        Task.findByIdAndDelete(req.params.taskId)
            .then(() => res.json('Task deleted.'))
            .catch(err => res.status(400).json('Error: ' + err));
    });








app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1/${port}`)
});
