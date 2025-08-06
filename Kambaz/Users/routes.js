import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

let currentUser = null;

export default function UserRoutes(app) {
  const createUser = (req, res) => {
    const user = dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = (req, res) => {
    const { userId } = req.params;
    dao.deleteUser(userId);
    res.sendStatus(204);
  };

  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  };

  const findUserById = (req, res) => {
    const { userId } = req.params;
    const user = dao.findUserById(userId);
    res.json(user);
  };

  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);

    // const { userId } = req.params;
    // const status = dao.updateUser(userId, req.body);
    // res.json(status);
  };

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = (req, res) => {
    // console.log("Request body:", req.body);
    if (!req.body) {
    return res.status(400).json({ message: "Request body is required" });
    }
    const { username, password } = req.body;
    if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
    }
    const currentUser = dao.findUserByCredentials(username, password);
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
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
        res.sendStatus(401);
        return;
        }
        res.json(currentUser);
    };

    const findCoursesForEnrolledUser = (req, res) => {
        let { userId } = req.params;
        // console.log("URL param userId:", userId);
        if (userId === "current") {
        const currentUser = req.session["currentUser"];
        // console.log("Session currentUser:", currentUser);
        if (!currentUser) {
            // console.log("No session user - sending 401");
            res.sendStatus(401);
            return;
        }
        userId = currentUser._id;
        }
        // console.log("Final userId:", userId);
        const courses = courseDao.findCoursesForEnrolledUser(userId);
        // console.log("Found courses:", courses?.length || 0);
        res.json(courses);
    };

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

  // Routes
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);

// enrollments
// Get current user's enrollments
  app.get("/api/users/current/enrollments", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const enrollments = enrollmentsDao.findEnrollmentsForUser(currentUser._id);
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
