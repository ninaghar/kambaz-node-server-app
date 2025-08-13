import model from "./model.js";
// import Database from "../Database/index.js";
// import { v4 as uuidv4 } from "uuid";

// Helper function to convert object to array if needed
// function ensureArray(data) {
//   if (Array.isArray(data)) {
//     return data;
//   } else if (data && typeof data === 'object') {
//     return Object.values(data);
//   }
//   return [];
// }


// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
// }


// ADD these new functions:

// export function findAllEnrollments() {
//   return ensureArray(Database.enrollments);
// }

// export function findEnrollmentsForUser(userId) {
//   const enrollmentsArray = ensureArray(Database.enrollments);
//   return enrollmentsArray.filter((enrollment) => enrollment.user === userId);
// }

// export function findEnrollmentsForCourse(courseId) {
//   const enrollmentsArray = ensureArray(Database.enrollments);
//   return enrollmentsArray.filter((enrollment) => enrollment.course === courseId);
// }



// export function deleteEnrollment(enrollmentId) {
//   if (Array.isArray(Database.enrollments)) {
//     Database.enrollments = Database.enrollments.filter(
//       (enrollment) => enrollment._id !== enrollmentId
//     );
//   } else if (Database.enrollments && Database.enrollments[enrollmentId]) {
//     delete Database.enrollments[enrollmentId];
//   }
// }

    export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
    }
    // export async function findUsersForCourse(courseId) {
    //     const enrollments = await model.find({ course: courseId }).populate("user");
    //     return enrollments.map((enrollment) => enrollment.user);
    // }
    export async function findUsersForCourse(courseId) {
        console.log("DAO: Finding users for course:", courseId);
        const enrollments = await model.find({ course: courseId }).populate("user");
        console.log("DAO: Found enrollments:", enrollments.length);
        
        const users = enrollments
            .map((enrollment) => enrollment.user)
            .filter(user => user)
            .map(user => user.toObject ? user.toObject() : user);
        
        console.log("DAO: Returning users:", users.length);
        return users;
    }



    export function enrollUserInCourse(user, course) {
        const newEnrollment = { user, course, _id: `${user}-${course}` };
        return model.create(newEnrollment);
    // return model.create({ user, course, _id: `${user}-${course}` });
    }
    export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
    }



    // export function unenrollUserFromCourse(userId, courseId) {
// //   console.log("=== UNENROLL DEBUG ===");
// //   console.log("User:", userId, "Course:", courseId);
// //   console.log("Before unenroll:", Database.enrollments);
  
//   if (Array.isArray(Database.enrollments)) {
//     Database.enrollments = Database.enrollments.filter(
//       (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
//     );
//   } else if (Database.enrollments && typeof Database.enrollments === 'object') {
//     // For object structure, find and delete the enrollment
//     const enrollmentsArray = Object.values(Database.enrollments);
//     const enrollmentToDelete = enrollmentsArray.find(
//       (enrollment) => enrollment.user === userId && enrollment.course === courseId
//     );
    
//     if (enrollmentToDelete && Database.enrollments[enrollmentToDelete._id]) {
//       delete Database.enrollments[enrollmentToDelete._id];
//     }
//   }
  
// //   console.log("After unenroll:", Database.enrollments);
// //   console.log("=====================");
// }