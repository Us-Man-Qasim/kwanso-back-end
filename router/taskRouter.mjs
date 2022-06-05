import express from "express";
import { validateToken } from "../util/helper.mjs";
import {
  validateCreateTaskRequest,
  validateListTasksRequest,
} from "../middleware/taskMiddleware.mjs";

import { createTask, listTasks } from "../controller/taskController.mjs";

const router = express.Router();
router
  .post("/create-task", validateToken, validateCreateTaskRequest, createTask)
  .post("/list-tasks", validateToken, validateListTasksRequest, listTasks);

export default router;
