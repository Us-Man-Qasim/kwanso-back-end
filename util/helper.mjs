import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { tokenExpiryTime } from "../common/constants.mjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: tokenExpiryTime,
  });
};

const validateToken = (req, res, next) => {
  const { token } = req.body;
  jwt.verify(token, process.env.JWT_SECRET);
  const decode = jwtDecode(token);
  req.body._id = decode.id;
  delete req.body.token;
  next();
};

export { generateToken, validateToken };
