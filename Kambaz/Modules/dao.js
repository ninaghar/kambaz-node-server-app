// import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
// export function updateModule(moduleId, moduleUpdates) {
//   const { modules } = Database;
//   const module = modules.find((module) => module._id === moduleId);
//   Object.assign(module, moduleUpdates);
//   return module;
// }

// export function deleteModule(moduleId) {
//  const { modules } = Database;
//  Database.modules = modules.filter((module) => module._id !== moduleId);
// }


// console.log("DAO: Loading modules DAO");
// console.log("Database modules count:", Database.modules ? Database.modules.length : "undefined");

export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);
//   console.log("DAO: Updating module", moduleId, "with", moduleUpdates);
//   const { modules } = Database;
//   const module = modules.find((module) => module._id === moduleId);
  
//   if (!module) {
//     throw new Error(`Module with ID ${moduleId} not found`);
//   }
  
//   Object.assign(module, moduleUpdates);
//   console.log("DAO: Updated module:", module);
//   return module;
}

export function deleteModule(moduleId) {

     return model.deleteOne({ _id: moduleId });
 // const { modules } = Database;
 // Database.modules = modules.filter((module) => module._id !== moduleId);

//   console.log("DAO: Deleting module with ID:", moduleId);
//   console.log("Current modules count:", Database.modules.length);
  
//   const { modules } = Database;
//   const moduleExists = modules.find(m => m._id === moduleId);
  
//   if (!moduleExists) {
//     console.log("Module not found:", moduleId);
//     throw new Error(`Module with ID ${moduleId} not found`);
//   }
  
//   Database.modules = modules.filter((module) => module._id !== moduleId);
//   console.log("Modules after deletion:", Database.modules.length);
//   return { status: "OK" }; // Add return value for confirmation
}

export function createModule(module) {
  const newModule = { ...module, _id: uuidv4() };
  return model.create(newModule);
//   Database.modules = [...Database.modules, newModule];
//   return newModule;
}

export function findModulesForCourse(courseId) {
//   const { modules } = Database;
    return model.find({ course: courseId });
//   return modules.filter((module) => module.course === courseId);
}
