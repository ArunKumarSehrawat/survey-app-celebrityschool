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

// creation of an user
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

// logging in of the user
app.post("/login", (req, res) => {
     const { email, password } = req.body;
     const login = utilities.authenticateUser(email, password, Users);
     if (login.found) {
          delete login.found;
          delete login.message;
          res.json(login);
     } else res.send(login.message);
});

// send all applicable surveys
app.get("/survey", (req, res) => {});

// creation of a survey
app.post("/survey", (req, res) => {
     const { uuid, questions, parameters } = req.body;
     const { found, message } = utilities.userExistsAndIsAdmin(Number(uuid), Users);

     if (found && !message) {
          Surveys.push(utilities.generateSurvey(Number(uuid), questions, parameters));
          utilities.updateSurveys(Surveys);
          res.sendStatus(200);
     } else {
          res.status(404).send(message);
     }
});

// update questions or parameters in a survey
app.patch("/survey", (req, res) => {
     const { uuid, creator, questions, parameters } = req.body;
     const { found, message, index } = utilities.surveyExistsAndUserIsReal(Number(uuid), Number(creator), Surveys);

     /*
      *    The survey uuid must be valid
      *    The creator must be valid and should be admin
      *    The creator must be the creator of that particular survey
      */

     if (found && !message) {
          const newSurvey = utilities.updateASurvey(Surveys[index], questions, parameters);
          Surveys.splice(index, 1, newSurvey);
          utilities.updateSurveys(Surveys);
          res.sendStatus(200);
     } else {
          res.status(404).send(message);
     }
});

/*Listen req on port*/
app.listen(3000, () => console.log("Server is runnning on port 3000."));
