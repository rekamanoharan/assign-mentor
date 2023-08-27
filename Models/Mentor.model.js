const mongoose = require("mongoose");
const { Schema } = mongoose;

// CREATING MONGOOSE SCHEMA
// SCHEMA IS THE BLIUE PRINT OF THE DATA THAT WE NEED TO STORE
const MentorSchema = new Schema({
  mentorName: {
    type: String,
    required: true,
  },
  mentorEmail: {
    type: String,
    required: true,
  },
  students: [{ type: Schema.Types.ObjectId, ref: "student" }],
});

module.exports = mongoose.model("mentor", MentorSchema);
