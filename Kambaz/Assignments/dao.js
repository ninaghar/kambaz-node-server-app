import assignmentModel from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const createAssignment = (assignment) => {
//   const newAssignment = { ...assignment, _id: assignment._id || uuidv4() };
  const newAssignment = { ...assignment }; 
  return assignmentModel.create(newAssignment);
};

export const findAllAssignments = () => assignmentModel.find();

export const findAssignmentsForCourse = (courseId) =>
  assignmentModel.find({ course: courseId });

export const findAssignmentById = (assignmentId) =>
  assignmentModel.findById(assignmentId);

export const updateAssignment = (assignmentId, assignment) =>
  assignmentModel.updateOne({ _id: assignmentId }, { $set: assignment });

export const deleteAssignment = (assignmentId) =>
  assignmentModel.deleteOne({ _id: assignmentId });


// // import Database from "../Database/index.js";
// import model from "./model.js";
// console.log(typeof model, Object.keys(model));
// import { v4 as uuidv4 } from "uuid";


// export const createAssignment = (assignment) => {
// //   const newAssignment = { ...assignment, _id: uuidv4() };
//   const newAssignment = { 
//     ...assignment, 
//     _id: assignment._id || uuidv4() 
//   };
//   return model.create(newAssignment);
// };

// // export const findAllAssignments = () => model.find();
// export const findAllAssignments = () => {
//   console.log("DAO: Finding all assignments");
//   console.log("DAO: Model available:", !!model);
//   console.log("DAO: Model.find available:", typeof model.find);
  
//   if (!model || typeof model.find !== 'function') {
//     throw new Error("Assignment model not properly initialized");
//   }
  
//   return model.find();
// };

// // export const findAssignmentsForCourse = (courseId) => 
// //   model.find({ course: courseId });

// // export const findAssignmentsForCourse = (courseId) => {
// //   console.log('Model type:', typeof model);
// //   console.log('Model constructor:', model?.constructor?.name);
// //   console.log('Has find method:', typeof model?.find);
  
// //   if (!model || typeof model.find !== 'function') {
// //     throw new Error('Assignment model not properly imported');
// //   }
  
// //   return model.find({ course: courseId });
// // };

// export const findAssignmentById = (assignmentId) => 
//   model.findById(assignmentId);

// export const updateAssignment = (assignmentId, assignment) => 
//   model.updateOne({ _id: assignmentId }, { $set: assignment });

// export const deleteAssignment = (assignmentId) => 
//   model.deleteOne({ _id: assignmentId });

// export const findAssignmentsForCourse = (courseId) => {
//     model.find({ course: courseId });
// };
