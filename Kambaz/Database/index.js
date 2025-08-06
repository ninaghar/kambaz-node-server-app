import courses from "./courses.js";
import modules from "./modules.js";
import assignments from "./assignments.js";
import users from "./users.js";
// import grades from "./grades.js";
import enrollments from "./enrollments.js";
// export default { courses, modules, assignments, users, grades, enrollments };
export default { courses, modules, assignments, users, enrollments };


console.log("=== DATABASE DEBUG ===");
console.log("Courses:", courses?.length || 0);
console.log("Users:", users?.length || 0);  
console.log("Enrollments:", enrollments?.length || 0);
console.log("Sample course:", courses?.[0]);
console.log("Sample user:", users?.[0]);
console.log("Sample enrollment:", enrollments?.[0]);
console.log("=====================");