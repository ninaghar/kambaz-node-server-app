import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Update an assignment
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    console.log("=== UPDATE ASSIGNMENT ===");
    console.log("Assignment ID:", assignmentId);
    console.log("Updates:", assignmentUpdates);
    
    const status = assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
    console.log("Update result:", status);
    console.log("========================");
    res.json(status);
  });

  // Delete an assignment
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    console.log("=== DELETE ASSIGNMENT ===");
    console.log("Assignment ID:", assignmentId);
    
    assignmentsDao.deleteAssignment(assignmentId);
    console.log("Assignment deleted");
    console.log("========================");
    res.sendStatus(204);
  });

  // Get a specific assignment by ID
  app.get("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    console.log("=== GET ASSIGNMENT ===");
    console.log("Assignment ID:", assignmentId);
    
    const assignment = assignmentsDao.findAssignmentById(assignmentId);
    console.log("Found assignment:", assignment);
    console.log("====================");
    res.json(assignment);
  });
}