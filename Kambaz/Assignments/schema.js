import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
//   _id: String,  
  _id: { 
    type: String, 
    default: function() { 
      return new mongoose.Types.ObjectId().toString(); 
    }
  },
  title: { type: String, required: true },
  description: String,
  points: Number,
  dueDate: Date,
  course: String
}, { collection: "assignments" ,
    strict: false // Allow additional fields
 });

export default assignmentSchema;

// import mongoose from "mongoose";

// const assignmentSchema = new mongoose.Schema({
//   _id: String,
//   title: { type: String, required: true },
//   course: { type: String, ref: "CourseModel", required: true },
//   description: String,
//   available: String, // "Not available until May 6 at 12:00am"
//   availableFrom: String, // "2025-05-06T00:00:00"
//   due: String, // "May 13 at 11:59pm" 
//   dueDate: String, // "2025-05-13T23:59:00"
//   points: { type: Number, default: 100 },
//   // Optional additional fields
//   assignmentGroup: {
//     type: String,
//     enum: ["ASSIGNMENTS", "EXAMS", "PROJECTS", "QUIZZES"],
//     default: "ASSIGNMENTS"
//   },
//   submissionType: {
//     type: String,
//     enum: ["ONLINE", "PAPER"],
//     default: "ONLINE"
//   }
// }, {
//   collection: "assignments"
// });

// export default assignmentSchema;