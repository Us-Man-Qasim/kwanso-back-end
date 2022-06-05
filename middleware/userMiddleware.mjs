import Joi from "joi";
import { errorLog } from "../common/errorLog.mjs";
import messages from "../common/messages.mjs";
import Model from "../model/index.mjs";

async function checkEmailAlreadyExist(email) {
  const response = await Model.User.findOne({ email });
  if (response) errorLog(messages.emailAlreadyExist);
  return email;
}

async function validateRegisterUserRequest(req, res, next) {
  const schema = Joi.object({
    email: Joi.string()
      .min(3)
      .required()
      .email()
      .external(checkEmailAlreadyExist),
    password: Joi.string().min(3).required(),
  });
  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    errorLog(error.message);
  }
}

async function validateLoginUserRequest(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    errorLog(error.message);
  }
}
async function validateGetUserRequest(req, res, next) {
  const schema = Joi.object({
    _id: Joi.string().required(),
  });
  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    errorLog(error.message);
  }
}

export {
  validateRegisterUserRequest,
  validateLoginUserRequest,
  validateGetUserRequest,
};
