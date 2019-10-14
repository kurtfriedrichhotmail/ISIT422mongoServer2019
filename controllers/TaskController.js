const Task = require("../models/Task");

exports.listAllTasks = (req, res) => {
  console.log(">>>>>>>>>>>>>> IN listAllTasks <<<<<<<<<");
  Task.find({}, (err, task) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(task);
    console.log(task);
  });
};

exports.createNewTask = (req, res) => {
  let newTask = new Task(req.body);
  console.log(newTask);
  newTask.save((err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(task);
  });
};

exports.readTask = (req, body) => {
  Task.findById(req.params.taskid, (err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(task);
  });
};

exports.updateTask = (req, res) => {
  console.log('task id at server is ' + req.params.taskid);
  Task.findOneAndUpdate(
    { _id: req.params.taskid },  // don't know who changed the name from _id
    req.body,
    { new: true },  // true or false to let it add if not present?
    (err, task) => {
      if (err) {
        res.status(500).send(err);
      }
      console.log(task);
      res.status(200).json(task);
    }
  );
};



exports.deleteTask = (req, res) => {
  Task.remove({ _id: req.params.taskid }, (err, task) => {  // don't know who changed the name from _id
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Task successfully deleted" });
  });
};