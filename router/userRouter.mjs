import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controller/userController.mjs";
import {
  validateGetUserRequest,
  validateLoginUserRequest,
  validateRegisterUserRequest,
} from "../middleware/userMiddleware.mjs";
import { validateToken } from "../util/helper.mjs";

const router = express.Router();
router
  .post("/register", validateRegisterUserRequest, registerUser)
  .post("/login", validateLoginUserRequest, loginUser)
  .get("/", validateToken, validateGetUserRequest, getUser);

export default router;
