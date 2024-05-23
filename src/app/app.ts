/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { studentRoutes } from "./modules/student/student.route";
import { userRoutes } from "./modules/user/user.route";
import errorHandle from "./middleware/globalErrorHandle";
import notFound from "./middleware/noFound";
import router from "./routes";
const app = express();
app.use(express.json());
app.use(cors());

//application routes

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!!");
});

app.use(errorHandle);
app.use(notFound);

export default app;
