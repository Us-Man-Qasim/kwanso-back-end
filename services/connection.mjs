import mongoose from "mongoose";
import { errorLog } from "../common/errorLog.mjs";

async function connect() {
  try {
    return await mongoose.connect("mongodb://localhost:27017/kwanso");
  } catch (error) {
    errorLog(error);
  }
}

export default connect();
