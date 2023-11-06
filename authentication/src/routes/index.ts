import express, { Application, Request, Response } from "express";
import loginRoutes from "@/routes/login/login.routes";

const app: Application = express();

const helloWorld = (req: Request, res: Response) => {
  res.send("Hello world");
};

app.get("/", helloWorld);
app.use("/", loginRoutes);

export default app;
