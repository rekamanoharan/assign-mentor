const StudentRouter = require("express").Router();
const MentorModel = require("../Models/Mentor.model");
const StudentModel = require("../Models/Student.model");
var mongoose = require("mongoose");

//CREATE A STUDENT

StudentRouter.post("/create_student", async (req, res, next) => {
  // Getting details from request object
  const data = req.body;
  console.log(req.body);
  // Creating Student Model data
  const Student = new StudentModel({
    studentName: data.studentName,
    studentEmail: data.studentEmail,
  });

  // Save query
  Student.save()
    .then((response) => {
      if (response && response._id) {
        return res.status(200).json({
          success: true,
          message: "Student created successfully!!!",
        });
      }
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Alas! Error Occurred",
          err: err.message,
        });
      }
    });
});

//GET STUDENTS

StudentRouter.get("/students", async (req, res, next) => {
  StudentModel.find()
    .then((cursor) => {
      if (cursor && cursor.length > 0) {
        return res.status(200).json({
          data: cursor,
          success: true,
          message: "Students fetched successfully!!!",
        });
      } else {
        return res.status(200).json({
          data: [],
          success: true,
          message: "No Data Found!!!",
        });
      }
    })
    .catch((err) => {
      return res.status(401).json({
        success: false,
        message: "Error Fetching Students Data!!!",
        error: err,
      });
    });
});

//ASSIGN OR CHANGE MENTOR FOR STUDENT

StudentRouter.patch("/:studentId/assign-mentor", async (req, res, next) => {
  const body = req.body;
  const { studentId } = req.params;
  StudentModel.findOneAndUpdate({ _id: studentId }, body)
    .then((response) => {
      if (response && response._id) {
        return res.status(200).json({
          success: true,
          message: "Student Updated Successfully!!",
          data: response,
        });
      }
    })
    .catch((err) => {
      return res.status(401).json({
        success: false,
        message: "Alas! Error Updating User!!",
        error: err,
      });
    });
});

module.exports = StudentRouter;
