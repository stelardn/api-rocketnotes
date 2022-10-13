const { Router } = require("express");

const usersRouter = require("./users.routes.js");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/notes", notesRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/tags", tagsRouter);

module.exports = routes;