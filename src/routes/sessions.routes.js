const { Router } = require("express");
const Route = require("express/lib/router/route");

const SessionsController = require("../controllers/SessionsController");
const sessionsController = new SessionsController();

const sessionRoutes = Router();

sessionRoutes.post("/", sessionsController.create);

module.exports = sessionRoutes;