const express = require("express");
const bodyParser = require("body-parser");
const taskController = require("./controllers/TaskController");
const cors = require('cors')  // using this module to solve CORS problem
// note the extra line in package.json to download this code

var corsOptions = {
  origin: 'http://localhost:4200',   // this URL must match the URL that the Angular app will call from
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

// this brings in and sets up the monog db instance connection
require("./config/db");

const app = express();

//const port = process.env.PORT || 3000;  // setting the port number for this server
const port = process.env.PORT || 80;  // setting the port number for this server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors(corsOptions))   // bringing in the CORS code to our app

// API ENDPOINTS
// not using the Express Router code, instead just listing them
// each of these 5 routed call one of the 5 methods defined in taskController
// which in turn call Mongo Atlas, each of those 5 do a return to the client
// notive they are "keyed", but HTTP request type, get, put, etc
app
  .route("/tasks")
  .get(taskController.listAllTasks)
  .post(taskController.createNewTask);

app
  .route("/tasks/:taskid")
  .get(taskController.readTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});