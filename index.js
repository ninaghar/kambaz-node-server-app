import "dotenv/config";
import session from "express-session";
import express from 'express';
import mongoose from "mongoose";
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING ||  "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);
const app = express();

// CORS configuration - MUST come before session
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173", // Local development
      "https://a5--superlative-figolla-b02519.netlify.app", 
      "https://a6--superlative-figolla-b02519.netlify.app",
      process.env.NETLIFY_URL,
    ].filter(Boolean),
  })
);

// Session configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz-super-secret-key-change-in-production",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  }
};

// Production-specific session settings
if (process.env.NODE_ENV === "production") {
  sessionOptions.proxy = true;
  sessionOptions.cookie.sameSite = "none";
  sessionOptions.cookie.secure = true;
  // Remove domain setting - let browser handle it automatically
  // sessionOptions.cookie.domain = process.env.NODE_SERVER_DOMAIN;
}

console.log("=== SERVER CONFIG ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("SESSION_SECRET exists:", !!process.env.SESSION_SECRET);
console.log("NETLIFY_URL:", process.env.NETLIFY_URL);
console.log("Cookie settings:", sessionOptions.cookie);
console.log("=====================");
app.use(session(sessionOptions));
app.use(express.json());



// Routes
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
Lab5(app);
Hello(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log("Environment:", process.env.NODE_ENV || "development");
});


app.get("/api/test-modules", (req, res) => {
  res.json({ message: "Module routes are working!" });
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
  console.log("Available routes:");
  console.log("- GET /api/test-modules");
  console.log("- DELETE /api/modules/:moduleId");
});

// // const express = require('express')
// import "dotenv/config";
// import session from "express-session";
// import express from 'express';
// import Hello from "./Hello.js"
// import Lab5 from "./Lab5/index.js";
// import cors from "cors";
// import CourseRoutes from "./Kambaz/Courses/routes.js";
// import UserRoutes from "./Kambaz/Users/routes.js";
// import ModuleRoutes from "./Kambaz/Modules/routes.js";
// import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
// import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";


// const app = express()


// app.use(
//   cors({
//     credentials: true,
//     origin: [
//       "http://localhost:5173", // Local
//       "https://a5--superlative-figolla-b02519.netlify.app", // Your Netlify URL
//       process.env.NETLIFY_URL,
//     ].filter(Boolean),
//   })
// );


// const sessionOptions = {
//   secret: process.env.SESSION_SECRET || "kambaz",
//   resave: false,
//   saveUninitialized: false,
// };
// if (process.env.NODE_ENV !== "development") {
//   sessionOptions.proxy = true;
//   sessionOptions.cookie = {
//     sameSite: "none",
//     secure: true,
//     domain: process.env.NODE_SERVER_DOMAIN,
//   };
// }

// app.use(
//   session(sessionOptions)
// );

// app.use(express.json());
// UserRoutes(app);
// CourseRoutes(app);
// ModuleRoutes(app);
// AssignmentRoutes(app);
// EnrollmentRoutes(app);
// Lab5(app);

// Hello(app)
// app.listen(process.env.PORT ||4000)