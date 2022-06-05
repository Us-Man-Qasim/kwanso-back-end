import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { errorLog } from "../common/errorLog.mjs";
import Message from "../common/messages.mjs";

async function verifyUserAccessToken(req, res, next) {
  const { cookies } = req;
  try {
    jwt.verify(cookies.accessToken, process.env.SECRET);
    const decode = jwtDecode(cookies.accessToken);
    req.body._id = decode.id;
    next();
  } catch (error) {
    errorLog(Message.invalidToken, 401);
  }
}

export { verifyUserAccessToken };
