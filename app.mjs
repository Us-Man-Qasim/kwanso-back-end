import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import ErrorHandler from "./controller/errorController.mjs";
import router from "./router/index.mjs";
import AppError from "./util/AppError.mjs";

const app = express();

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3001"],
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/user", router.userRouter);
app.use("/api/v1/task", router.taskRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(ErrorHandler);

export default app;
