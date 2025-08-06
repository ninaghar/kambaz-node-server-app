import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// Helper function to convert object to array if needed
function ensureArray(data) {
  if (Array.isArray(data)) {
    return data;
  } else if (data && typeof data === 'object') {
    return Object.values(data);
  }
  return [];
}

export function findAssignmentsForCourse(courseId) {
  console.log("=== ASSIGNMENTS DAO DEBUG ===");
  console.log("Database.assignments:", Database.assignments);
  console.log("Type:", typeof Database.assignments);
  
  const assignmentsArray = ensureArray(Database.assignments);
  console.log("Converted to array:", assignmentsArray.length, "assignments");
  console.log("Looking for courseId:", courseId);
  
  const filteredAssignments = assignmentsArray.filter((assignment) => {
    console.log(`Assignment ${assignment._id}: course=${assignment.course}, matches=${assignment.course === courseId}`);
    return assignment.course === courseId;
  });
  
  console.log("Found assignments:", filteredAssignments);
  console.log("============================");
  
  return filteredAssignments;
}

export function createAssignment(assignment) {
  const newAssignment = { 
    ...assignment, 
    _id: uuidv4(),
    // Set default values to match your structure
    available: assignment.available || `Not available until ${new Date().toLocaleDateString()}`,
    due: assignment.due || `${new Date().toLocaleDateString()} at 11:59pm`,
    availableFrom: assignment.availableFrom || new Date().toISOString(),
    dueDate: assignment.dueDate || new Date().toISOString()
  };
  
  // Handle object or array structure
  if (Array.isArray(Database.assignments)) {
    Database.assignments = [...Database.assignments, newAssignment];
  } else {
    if (!Database.assignments) Database.assignments = {};
    Database.assignments[newAssignment._id] = newAssignment;
  }
  
  return newAssignment;
}

export function deleteAssignment(assignmentId) {
  if (Array.isArray(Database.assignments)) {
    Database.assignments = Database.assignments.filter(
      (assignment) => assignment._id !== assignmentId
    );
  } else if (Database.assignments && Database.assignments[assignmentId]) {
    delete Database.assignments[assignmentId];
  }
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  if (Array.isArray(Database.assignments)) {
    const assignment = Database.assignments.find((a) => a._id === assignmentId);
    if (assignment) {
      Object.assign(assignment, assignmentUpdates);
      return assignment;
    }
  } else if (Database.assignments && Database.assignments[assignmentId]) {
    Object.assign(Database.assignments[assignmentId], assignmentUpdates);
    return Database.assignments[assignmentId];
  }
  return null;
}

export function findAssignmentById(assignmentId) {
  const assignmentsArray = ensureArray(Database.assignments);
  return assignmentsArray.find((assignment) => assignment._id === assignmentId);
}