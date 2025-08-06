// Create a module object with string properties
const module = {
  id: "MOD123",
  name: "Introduction to React",
  description: "Learn the fundamentals of React development",
  course: "CS5610"
};

export default function WorkingWithModules(app) {
  // Route to get the entire module object
  app.get("/lab5/module", (req, res) => {
    res.json(module);
  });

  // Route to get just the module name
  app.get("/lab5/module/name", (req, res) => {
    res.send(module.name);
  });

  // Route to update the module name
  app.get("/lab5/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  });

  // Route to get module description
  app.get("/lab5/module/description", (req, res) => {
    res.send(module.description);
  });

  // Route to update the module description
  app.get("/lab5/module/description/:newDescription", (req, res) => {
    const { newDescription } = req.params;
    module.description = newDescription;
    res.json(module);
  });
}