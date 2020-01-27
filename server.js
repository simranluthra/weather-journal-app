const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const app = express();
const PORT = 8000;


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("", express.static("static"));

app.get("/data", (req, res) => res.send(projectData));

app.post("/data", (req, res) => {
  projectData.push(req.body);
  res.send(projectData);
});


// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(PORT, () => console.log(`Application running on port: ${PORT}`));



