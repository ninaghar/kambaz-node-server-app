// import Database from "../Database/index.js";
// ​​import * as enrollmentsDao from "../Enrollments/dao.js"
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js"; 
export default function CourseRoutes(app) {
    app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
        await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
    }
    res.json(course);
    });
    

    // export default function CourseRoutes(app) {
    app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
    });



    app.post("/api/courses/:courseId/modules", async(req, res) => {
        const { courseId } = req.params;
        const module = {
        ...req.body,
        course: courseId,
        };
        const newModule = await modulesDao.createModule(module);
        res.send(newModule);
    });

    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    app.delete("/api/courses/:courseId",async(req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteCourse(courseId);
        res.send(status);
    });

    app.put("/api/courses/:courseId", async(req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = await dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });



    
  app.get("/api/courses", async(req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });

// assignment routes
    // app.get("/api/courses/:courseId/assignments", (req, res) => {
    //     const { courseId } = req.params;
    //     const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
    //     res.json(assignments);
    // });

    // app.post("/api/courses/:courseId/assignments", (req, res) => {
    //     const { courseId } = req.params;
    //     const assignment = {
    //     ...req.body,
    //     course: courseId,
    //     };
    //     const newAssignment = assignmentsDao.createAssignment(assignment);
    //     res.json(newAssignment);
    // });

const findAssignmentsForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      console.log("Courses Route: Finding assignments for course:", courseId);
      
      // Temporarily bypass authentication for testing
      console.log("Bypassing authentication for assignment testing...");
      
      const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
      console.log("Courses Route: Found assignments:", assignments.length);
      
      const plainAssignments = assignments.map(assignment => 
        assignment.toObject ? assignment.toObject() : assignment
      );
      res.json(plainAssignments);
    } catch (error) {
      console.error("Courses Route: Error finding assignments:", error);
      res.status(500).json({ message: "Error finding assignments for course", details: error.message });
    }
  };

  // Create assignment for a course (add this to Courses routes)
  const createAssignmentForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      console.log("Courses Route: Creating assignment for course:", courseId);
      const assignmentData = { ...req.body, course: courseId };
      const assignment = await assignmentsDao.createAssignment(assignmentData);
      
      const plainAssignment = assignment.toObject ? assignment.toObject() : assignment;
      res.json(plainAssignment);
    } catch (error) {
      console.error("Courses Route: Error creating assignment:", error);
      res.status(500).json({ message: "Error creating assignment" });
    }
  };

const findUsersForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      console.log("Finding users for course:", courseId);
      const users = await enrollmentsDao.findUsersForCourse(courseId);
      console.log("Found users:", users.length);
      res.json(users);
    } catch (error) {
      console.error("Error finding users for course:", error);
      res.status(500).json({ message: "Error finding users for course" });
    }
  };

  // Add this route
  app.get("/api/courses/:courseId/users", findUsersForCourse);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse); // Add this
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse)


}
