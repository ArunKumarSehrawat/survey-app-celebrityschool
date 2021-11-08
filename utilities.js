const fs = require("fs");

const generateUUID = () => new Date().valueOf();

const generateUser = (name, email, password, gender, age, type) => {
     const uuid = generateUUID();
     return {
          uuid,
          name,
          email,
          password,
          gender,
          age,
          type,
     };
};
const generateSurvey = (creatorUUID, questions, parameters) => {
     const uuid = generateUUID();
     const creator = creatorUUID;
     const respondents = [];
     const submissions = [];
     return {
          uuid,
          creator,
          questions,
          parameters,
          respondents,
          submissions,
     };
};

const userExists = (newEmail, userDB) => {
     for (let i = 0; i < userDB.length; i++) if (userDB[i].email === newEmail) return true;
     return false;
};

const updateUsers = (User) => {
     fs.writeFileSync("./data/user.json", JSON.stringify(User, null, 2));
};

const updateSurveys = (Survey) => {
     fs.writeFileSync("./data/survey.json", JSON.stringify(Survey, null, 2));
};

const authenticateUser = (email, password, Users) => {
     const status = {
          found: false,
          message: null,
          name: null,
          type: null,
          uuid: null,
          gender: null,
          age: null,
          email: email,
     };
     for (let i = 0; i < Users.length; i++) {
          if (Users[i].email === email) {
               if (Users[i].password === password) {
                    status.found = true;
                    status.name = Users[i].name;
                    status.type = Users[i].type;
                    status.uuid = Users[i].uuid;
                    status.gender = Users[i].gender;
                    status.age = Users[i].age;
                    break;
               } else {
                    status.message = "Incorrect password";
                    break;
               }
          }
     }
     if (!status.found && !status.message) status.message = "Email doesn't exists";

     return status;
};

const userExistsAndIsAdmin = (uuid, Users) => {
     let found = false;
     let message = null;
     for (let i = 0; i < Users.length; i++) {
          if (Users[i].uuid === uuid) {
               if (Users[i].type === "admin") {
                    found = true;
                    break;
               } else {
                    found = true;
                    message = "User is not admin";
                    break;
               }
          }
     }
     if (!found) message = "User does not exists";
     return { found, message };
};

const updateASurvey = (survey, questions, parameters) => {
     survey.questions = questions;
     survey.parameters = parameters;
     return survey;
};

const surveyExistsAndUserIsReal = (uuid, creator, Surveys) => {
     let message = null;
     let found = null;
     let index = null;
     for (let i = 0; i < Surveys.length; i++) {
          if (Surveys[i].uuid === uuid) {
               if (Surveys[i].creator === creator) {
                    found = true;
                    index = i;
                    break;
               } else {
                    found = true;
                    message = "Creator did not match";
                    break;
               }
          }
     }
     if (!found && !message) message = "Survey does not exists";
     return { found, message, index };
};

module.exports = {
     generateUUID: generateUUID,
     generateUser: generateUser,
     userExists: userExists,
     updateUsers: updateUsers,
     authenticateUser: authenticateUser,
     generateSurvey: generateSurvey,
     updateSurveys: updateSurveys,
     userExistsAndIsAdmin: userExistsAndIsAdmin,
     updateASurvey: updateASurvey,
     surveyExistsAndUserIsReal: surveyExistsAndUserIsReal,
};
