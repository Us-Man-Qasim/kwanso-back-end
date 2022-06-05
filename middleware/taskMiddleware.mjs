import Joi from "joi";
import { errorLog } from "../common/errorLog.mjs";

async function validateCreateTaskRequest(req, res, next) {
  const schema = Joi.object({
    _id: Joi.string().required().trim(),
    name: Joi.string().required(),
  });
  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    errorLog(error.message);
  }
}

async function validateListTasksRequest(req, res, next) {
  const schema = Joi.object({
    _id: Joi.string().required().trim(),
  });
  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    errorLog(error.message);
  }
}

export { validateCreateTaskRequest, validateListTasksRequest };
