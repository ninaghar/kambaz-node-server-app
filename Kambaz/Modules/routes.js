import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
      console.log("ModuleRoutes: Setting up DELETE route for /api/modules/:moduleId");
  // PUT route for updating modules
  app.put("/api/modules/:moduleId", async(req, res) => {
    // try {
      const { moduleId } = req.params;
      const moduleUpdates = req.body;
      console.log("Updating module:", moduleId, "with:", moduleUpdates);
      
      const status = await modulesDao.updateModule(moduleId, moduleUpdates);
      res.send(status);
    //   res.json(updatedModule);
    // } catch (error) {
    //   console.error("Error updating module:", error.message);
    //   res.status(500).json({ message: error.message });
    // }
  });

  // DELETE route for deleting modules
  app.delete("/api/modules/:moduleId", async(req, res) => {
     console.log("=== DELETE /api/modules/:moduleId HIT ===");
    console.log("Request params:", req.params);
    console.log("Module ID:", req.params.moduleId);
    try {
      const { moduleId } = req.params;
      console.log("Deleting module:", moduleId);
      console.log("modulesDao functions:", Object.keys(modulesDao));
    //   modulesDao.deleteModule(moduleId);
    const result = await modulesDao.deleteModule(moduleId);
      console.log("Delete successful, result:", result);
      res.sendStatus(204); // Success, no content
    } catch (error) {
      console.error("Error deleting module:", error.message);
      console.error("Error stack:", error.stack);
      res.status(500).json({ message: error.message });
    }
  });
}

// import * as modulesDao from "./dao.js";
// export default function ModuleRoutes(app) {
//  app.put("/api/modules/:moduleId", async (req, res) => {
//     const { moduleId } = req.params;
//     const moduleUpdates = req.body;
//     // const status = await modulesDao.updateModule(moduleId, moduleUpdates);
//     const status = dao.deleteModule(moduleId);
//     res.send(status);
//   });

//   app.delete("/api/modules/:moduleId", (req, res) => {
//     try {
//       const { moduleId } = req.params;
//       console.log("Deleting module:", moduleId);
//       dao.deleteModule(moduleId);
//       res.sendStatus(204);
//     } catch (error) {
//       console.error("Error deleting module:", error);
//       res.status(500).json({ message: error.message });
//     }
//   });
// //     app.delete("/api/modules/:moduleId", async (req, res) => {
// //    const { moduleId } = req.params;
// //    const status = await modulesDao.deleteModule(moduleId);
// //    res.send(status);
// // });
// }
