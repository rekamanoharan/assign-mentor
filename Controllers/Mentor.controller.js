const MentorRouter = require("express").Router();
const MentorModel = require("../Models/Mentor.model");
const StudentModel = require("../Models/Student.model");
var mongoose = require("mongoose");

//GET ALL MENTORS

MentorRouter.get("/", (req, res, next) => {
  MentorModel.find()
    .then((cursor) => {
      if (cursor && cursor.length > 0) {
        return res.status(200).json({
          data: cursor,
          success: true,
          message: "Mentors fetched successfully",
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
        message: "Error Fetching Users Data!!!",
        error: err,
      });
    });
});

// CREATE NEW MENTOR

MentorRouter.post("/create_mentor", (req, res, next) => {
  // Getting details from request object
  const data = req.body;
  console.log(req.body);
  // Creating Mentor Model data
  const Mentor = new MentorModel({
    mentorName: data.mentorName,
    mentorEmail: data.mentorEmail,
  });

  // Save query
  Mentor.save()
    .then((response) => {
      if (response && response._id) {
        return res.status(200).json({
          success: true,
          message: "Mentor created successfully!!!",
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

//ASSIGN STUDENT TO MENTOR

MentorRouter.put("/:mentorId/assign-students", async (req, res, next) => {
  const { students } = req.body;
  const { mentorId } = req.params;
  const studentHasMentors = [];
  const updateMentorStudents = [];
  for (let studentId of students) {
    const response = await StudentModel.findOne({ _id: studentId });
    console.log(response);
    if (response && !response.mentorId) {
      updateMentorStudents.push(studentId);
    } else {
      studentHasMentors.push(studentId);
    }
  }
  console.log(updateMentorStudents, studentHasMentors);
  if (updateMentorStudents.length) {
    try {
      await MentorModel.findOneAndUpdate(
        { _id: mentorId },
        { students: updateMentorStudents }
      );
      for (let studentId of updateMentorStudents) {
        const findStudent = await StudentModel.findOneAndUpdate(
          { _id: studentId },
          { mentorId }
        );
      }
      return res.status(200).json({
        success: true,
        message: "Mentor assigned successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  } else {
    return res.status(400).json({
      success: true,
      message: "Given students are already has mentor",
    });
  }
});

//SHOW ALL THE STUDENTS OF PARTICULAR MENTOR

MentorRouter.get("/:mentorId/students", async (req, res, next) => {
  MentorModel.findOne({ _id: req.params.mentorId })
    .then((response) => {
      return res.status(200).json({
        data: response.students,
        success: true,
        message: "No Data Found!!!",
      });
    })
    .catch((err) => {
      return res.status(401).json({
        success: false,
        message: "Error Fetching Students Data!!!",
        error: err,
      });
    });
});

//TO SHOW PREVIOUSLY ASSIGNED MENTOR FOR PARTICULAR STUDENT

module.exports = MentorRouter;
