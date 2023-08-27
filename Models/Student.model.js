const mongoose = require("mongoose");
const { Schema } = mongoose;

// CREATING MONGOOSE SCHEMA
// SCHEMA IS THE BLUE PRINT OF THE DATA THAT WE NEED TO STORE
const StudentSchema = new Schema({
  studentName: {
    type: String,
    required: true,
    set: function (name) {
      this._previousName = this.name;
      return name;
    },
  },
  studentEmail: {
    type: String,
    required: true,
  },
  mentorId: {
    type: Schema.Types.ObjectId,
    ref: "mentor",
  },
});

module.exports = mongoose.model("student", StudentSchema);
