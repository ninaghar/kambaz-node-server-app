import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {


  const createAssignment = async (req, res) => {
    const { courseId } = req.params;     
    const assignmentData = { 
    ...req.body, 
    course: courseId 
    };
 
    const assignment = await dao.createAssignment(req.body);

    res.json(assignment);
  };

  const findAllAssignments = async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.json(assignments);
  };

  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const findAssignmentById = async (req, res) => {
    const { assignmentId } = req.params;
    const assignment = await dao.findAssignmentById(assignmentId);
    res.json(assignment);
  };

  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.updateAssignment(assignmentId, req.body);
    res.json(status);
  };

  const deleteAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.deleteAssignment(assignmentId);
    res.json(status);
  };

  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.get("/api/assignments", findAllAssignments);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}






// import * as assignmentsDao from "./dao.js";

// export default function AssignmentRoutes(app) {
//   // Update an assignment
// //   app.put("/api/assignments/:assignmentId", (req, res) => {
// //     const { assignmentId } = req.params;
// //     const assignmentUpdates = req.body;
// //     // console.log("=== UPDATE ASSIGNMENT ===");
// //     // console.log("Assignment ID:", assignmentId);
// //     // console.log("Updates:", assignmentUpdates);
    
// //     const status = assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
// //     // console.log("Update result:", status);
// //     // console.log("========================");
// //     res.json(status);
// //   });

//   // Delete an assignment
// //   app.delete("/api/assignments/:assignmentId", (req, res) => {
// //     const { assignmentId } = req.params;
// //     // console.log("=== DELETE ASSIGNMENT ===");
// //     // console.log("Assignment ID:", assignmentId);
    
// //     assignmentsDao.deleteAssignment(assignmentId);
// //     // console.log("Assignment deleted");
// //     // console.log("========================");
// //     res.sendStatus(204);
// //   });

//   // Get a specific assignment by ID
// //   app.get("/api/assignments/:assignmentId", (req, res) => {
// //     const { assignmentId } = req.params;
// //     // console.log("=== GET ASSIGNMENT ===");
// //     // console.log("Assignment ID:", assignmentId);
    
// //     const assignment = assignmentsDao.findAssignmentById(assignmentId);
// //     // console.log("Found assignment:", assignment);
// //     // console.log("====================");
// //     res.json(assignment);
// //   });

// const findAssignmentsForCourse = async (req, res) => {
//     try {
//       const { courseId } = req.params;
//       console.log("Finding assignments for course:", courseId);
//       const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
//       const plainAssignments = assignments.map(assignment => 
//         assignment.toObject ? assignment.toObject() : assignment
//       );
//       res.json(plainAssignments);
//     } catch (error) {
//       console.error("Error finding assignments:", error);
//       res.status(500).json({ message: "Error finding assignments" });
//     }
//   };

//   const findAssignmentById = async (req, res) => {
//     try {
//       const { assignmentId } = req.params;
//       const assignment = await assignmentsDao.findAssignmentById(assignmentId);
//       if (!assignment) {
//         return res.status(404).json({ message: "Assignment not found" });
//       }
//       res.json(assignment);
//     } catch (error) {
//       console.error("Error finding assignment:", error);
//       res.status(500).json({ message: "Error finding assignment" });
//     }
//   };

// const createAssignment = async (req, res) => {
//     try {
//       const { courseId } = req.params;
//       const assignmentData = { ...req.body, course: courseId };
//       console.log("Creating assignment:", assignmentData);
//       const assignment = await assignmentsDao.createAssignment(assignmentData);
//       res.json(assignment);
//     } catch (error) {
//       console.error("Error creating assignment:", error);
//       res.status(500).json({ message: "Error creating assignment" });
//     }
//   };


//  const updateAssignment = async (req, res) => {
//     try {
//       const { assignmentId } = req.params;
//       console.log("Updating assignment:", aid);
//       const status = await assignmentsDao.updateAssignment(aid, req.body);
//       res.json(status);
//     } catch (error) {
//       console.error("Error updating assignment:", error);
//       res.status(500).json({ message: "Error updating assignment" });
//     }
//   };


// const deleteAssignment = async (req, res) => {
//     try {
//       const { assignmentId } = req.params;
//       console.log("Deleting assignment:", aid);
//       const status = await assignmentsDao.deleteAssignment(aid);
//       res.json(status);
//     } catch (error) {
//       console.error("Error deleting assignment:", error);
//       res.status(500).json({ message: "Error deleting assignment" });
//     }
//   };

//   // Routes
//   app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
//   app.get("/api/assignments/:assignmentId", findAssignmentById);
//   app.post("/api/courses/:courseId/assignments", createAssignment);
//   app.put("/api/assignments/:assignmentId", updateAssignment);
//   app.delete("/api/assignments/:assignmentId", deleteAssignment);





// }