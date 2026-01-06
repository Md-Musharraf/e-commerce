const jsonServer = require("json-server"); // Import JSON Server
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Aapki database file
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000; // Render ka PORT use karein

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
