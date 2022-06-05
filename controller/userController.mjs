import bcrypt from "bcrypt";
import Message from "../common/messages.mjs";
import Model from "../model/index.mjs";
import { generateToken } from "../util/helper.mjs";

async function registerUser(req, res) {
  let { email, password } = req.body;
  password = await bcrypt.hash(password, process.env.SALT_USER);
  const response = await Model.User.create({ email, password });
  res.send({ user: { id: response._id, email: response.email } });
}

async function loginUser(req, res) {
  let { email, password } = req.body;
  password = await bcrypt.hash(password, process.env.SALT_USER);

  const userRecord = await Model.User.findOne({
    email,
    password,
  });

  if (!userRecord) return logError(Message.invalidEmailPassword);
  const token = generateToken(userRecord._id.toString());
  res.cookie("token", token);
  res.send({ token });
}

async function getUser(req, res) {
  const { _id } = req.body;
  const userRecord = await Model.User.findOne({ _id });
  res.send({ user: { id: userRecord._id, email: userRecord.email } });
}

export { registerUser, loginUser, getUser };
