import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

// let currentUser = null;

export default function UserRoutes(app) {
//   const createUser = async(req, res) => {
//     const user = await dao.createUser(req.body);
//     res.json(user);
//   };

const createUser = async (req, res) => {
    try {
      console.log("=== CREATE USER ROUTE CALLED ===");
      console.log("Request body:", req.body);
      
      // Remove _id from request body if it exists
      const { _id, ...userWithoutId } = req.body;
      
      const user = await dao.createUser(userWithoutId);
      console.log("User created successfully:", user._id);
      res.json(user);
    } catch (error) {
      console.error("=== ERROR IN CREATE USER ===");
      console.error("Error details:", error);
      
      // Handle duplicate key error specifically
      if (error.code === 11000) {
        console.log("Duplicate key error detected");
        if (error.message.includes('username')) {
          res.status(400).json({ message: "Username already exists" });
        } else if (error.message.includes('email')) {
          res.status(400).json({ message: "Email already exists" });
        } else {
          res.status(400).json({ message: "Duplicate entry" });
        }
      } else {
        res.status(500).json({ message: "Error creating user", error: error.message });
      }
    }
  };

  const deleteUser = async(req, res) => {
    const status = await dao.deleteUser(req.params.userId);
      res.json(status);
    // const { userId } = req.params;
    // dao.deleteUser(userId);
    // res.sendStatus(204);
  };

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    console.log("About to send:", users);
    res.json(users);
  };

  const findUserById = async(req, res) => {
    const { userId } = req.params;
    const user = await dao.findUserById(userId);
    res.json(user);
  };

  const updateUser = async(req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
        req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }

    // const currentUser = dao.findUserById(userId);
    // req.session["currentUser"] = currentUser;
    res.json(currentUser);

    // const { userId } = req.params;
    // const status = dao.updateUser(userId, req.body);
    // res.json(status);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    // console.log("Request body:", req.body);
    if (!req.body) {
    return res.status(400).json({ message: "Request body is required" });
    }
    const { username, password } = req.body;
    if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
    }
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
        // console.log("User found:", currentUser);
    //   currentUser = user;
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
        // console.log("User NOT found");
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    // currentUser = null;
    res.sendStatus(200);
  };

//   const profile = async (req, res) => {
//     res.json(currentUser);
//   };

    const profile = (req, res) => {
        console.log("Profile route hit");
        console.log("Session:", req.session);
        console.log("Current user in session:", req.session["currentUser"]);
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            console.log("No user in session, returning 401");
        res.sendStatus(401);
        return;
        }
        console.log("Returning user:", currentUser);
        res.json(currentUser);
    };

    // const findCoursesForEnrolledUser = (req, res) => {
    //     let { userId } = req.params;
    //     // console.log("URL param userId:", userId);
    //     if (userId === "current") {
    //     const currentUser = req.session["currentUser"];
    //     // console.log("Session currentUser:", currentUser);
    //     if (!currentUser) {
    //         // console.log("No session user - sending 401");
    //         res.sendStatus(401);
    //         return;
    //     }
    //     userId = currentUser._id;
    //     }
    //     // console.log("Final userId:", userId);
    //     const courses = courseDao.findCoursesForEnrolledUser(userId);
    //     // console.log("Found courses:", courses?.length || 0);
    //     res.json(courses);
    // };

    const createCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        const newCourse = courseDao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(newCourse);
    };

//   const profile = (req, res) => {
//     if (!currentUser) {
//       res.sendStatus(401);
//       return;
//     }
//     res.json(currentUser);
//   };

const findCoursesForEnrolledUser = async (req, res) => {
    try {
      const { uid } = req.params;
      console.log("Finding courses for enrolled user:", uid);
      
      // Use Enrollments DAO
      const courses = await enrollmentsDao.findCoursesForUser(uid);
      res.json(courses);
    } catch (error) {
      console.error("Error in findCoursesForEnrolledUser:", error);
      res.status(500).json({ message: "Error finding courses for enrolled user" });
    }
  };



const findCoursesForUser = async (req, res) => {
   const currentUser = req.session["currentUser"];
   if (!currentUser) {
     res.sendStatus(401);
     return;
   }
   if (currentUser.role === "ADMIN") {
     const courses = await courseDao.findAllCourses();
     res.json(courses);
     return;
   }
   let { uid } = req.params;
   if (uid === "current") {
     uid = currentUser._id;
   }
   const courses = await enrollmentsDao.findCoursesForUser(uid);
   res.json(courses);
 };


 const enrollUserInCourse = async (req, res) => {
   let { uid, cid } = req.params;
   if (uid === "current") {
     const currentUser = req.session["currentUser"];
     uid = currentUser._id;
   }
   const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
   res.send(status);
 };
 const unenrollUserFromCourse = async (req, res) => {
   let { uid, cid } = req.params;
   if (uid === "current") {
     const currentUser = req.session["currentUser"];
     uid = currentUser._id;
   }
   const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
   res.send(status);
 };
 app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
 app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);

  // Routes
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
//   app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
   app.get("/api/users/:uid/courses", findCoursesForUser);
//    app.get("/api/users/:uid/courses", findCoursesForUser);
//   app.get("/api/users/profile", profile);
  app.post("/api/users/profile", profile);

// enrollments
// Get current user's enrollments
  app.get("/api/users/current/enrollments", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const enrollments = enrollmentsDao.findCoursesForUser(currentUser._id);
    res.json(enrollments);
  });

  // Enroll current user in course
  app.post("/api/users/current/courses/:courseId", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const enrollment = enrollmentsDao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  });

  // Unenroll current user from course
  app.delete("/api/users/current/courses/:courseId", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    enrollmentsDao.unenrollUserFromCourse(currentUser._id, courseId);
    res.sendStatus(204);
  });

  // enrollments
const findCurrentUserEnrollments = (req, res) => {
    console.log("=== FIND CURRENT USER ENROLLMENTS ===");
    console.log("Session:", req.session);
    console.log("Current user:", req.session["currentUser"]);
    
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
    //   console.log(" No current user in session");
      res.sendStatus(401);
      return;
    }
    
    // Import enrollments DAO at top of file if not already imported
    const enrollments = enrollmentsDao.findEnrollmentsForUser(currentUser._id);
    // console.log("Found enrollments for user:", enrollments.length);
    console.log("Enrollments:", enrollments);
    res.json(enrollments);
  };

  // Register the route
  app.get("/api/users/current/enrollments", findCurrentUserEnrollments);

}

// import * as dao from "./dao.js";
// let currentUser = null;
// export default function UserRoutes(app) {
//   const createUser = (req, res) => { };
//   const deleteUser = (req, res) => { };
//   const findAllUsers = (req, res) => { };
//   const findUserById = (req, res) => { };
//   const updateUser = (req, res) => { };
//   const signup = (req, res) => { };
//   const signin = (req, res) => { };
//   const signout = (req, res) => { };
//   const profile = (req, res) => { };

// const signin = (req, res) => {
//     const { username, password } = req.body;
//     currentUser = dao.findUserByCredentials(username, password);
//     res.json(currentUser);
//   };


//   app.post("/api/users", createUser);
//   app.get("/api/users", findAllUsers);
//   app.get("/api/users/:userId", findUserById);
//   app.put("/api/users/:userId", updateUser);
//   app.delete("/api/users/:userId", deleteUser);
//   app.post("/api/users/signup", signup);
//   app.post("/api/users/signin", signin);
//   app.post("/api/users/signout", signout);
//   app.post("/api/users/profile", profile);
// }
