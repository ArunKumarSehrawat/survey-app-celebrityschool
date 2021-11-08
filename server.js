"use strict";
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const utilities = require("./utilities");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Globals
let Users = JSON.parse(fs.readFileSync("./data/user.json", { encoding: "utf8" }));
let Surveys = JSON.parse(fs.readFileSync("./data/survey.json", { encoding: "utf8" }));

/****************** API ENDPOINTS ************/

app.post("/register", (req, res) => {
     const { name, age, gender, type, email, password } = req.body;

     if (utilities.userExists(email, Users)) {
          res.status(404).send("User already exists");
     } else {
          Users.push(utilities.generateUser(name, email, password, gender, Number(age), type));
          utilities.updateUsers(Users);
          res.sendStatus(200);
     }
});

app.post("/login", (req, res) => {
     const { email, password } = req.body;
     const login = utilities.authenticateUser(email, password, Users);
     if (login.found) {
          delete login.found;
          delete login.message;
          res.json(login);
     } else res.send(login.message);
});

app.post("/createSurvey", (req, res) => {
     const { uuid, questions, parameters } = req.body;
     const userValidate = utilities.userExistsAndIsAdmin(Number(uuid), Users);

     if (userValidate.found && !userValidate.message) {
          Surveys.push(utilities.generateSurvey(Number(uuid), questions, parameters));
          utilities.updateSurveys(Surveys);
          res.sendStatus(200);
     } else {
          res.status(404).send(userValidate.message);
     }
});

/*Listen req on port*/
app.listen(3000, () => console.log("Server is runnning on port 3000."));
