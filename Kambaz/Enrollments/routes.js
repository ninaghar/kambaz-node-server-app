import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  // Get all enrollments
  app.get("/api/enrollments", (req, res) => {
    const enrollments = enrollmentsDao.findAllEnrollments();
    res.json(enrollments);
  });

  // Get enrollments for a specific user
  app.get("/api/users/:userId/enrollments", (req, res) => {
    const { userId } = req.params;
    const enrollments = enrollmentsDao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  });

  // Get enrollments for a specific course
  app.get("/api/courses/:courseId/enrollments", (req, res) => {
    const { courseId } = req.params;
    const enrollments = enrollmentsDao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  });

  // Enroll user in course
  app.post("/api/users/:userId/courses/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    console.log(`Enrolling user ${userId} in course ${courseId}`);
    
    const enrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  });

  // Unenroll user from course
  app.delete("/api/users/:userId/courses/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    console.log(`Unenrolling user ${userId} from course ${courseId}`);
    
    enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(204);
  });

  // Delete enrollment by ID
  app.delete("/api/enrollments/:enrollmentId", (req, res) => {
    const { enrollmentId } = req.params;
    enrollmentsDao.deleteEnrollment(enrollmentId);
    res.sendStatus(204);
  });
}