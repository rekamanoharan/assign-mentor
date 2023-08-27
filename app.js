const express = require("express");
const APP_SERVER = express();

// REGISTER ALL THE CONTROLLER IN APP SERVER

APP_SERVER.use("/mentor", require("./Controllers/Mentor.controller"));
APP_SERVER.use("/student", require("./Controllers/Student.controller"));

module.exports = APP_SERVER;
