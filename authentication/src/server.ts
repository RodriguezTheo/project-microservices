import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "@/environment/config";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Exemple de route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

const { port, startedMessage } = config as {
  port: string;
  startedMessage: string;
};

app.listen(port, () => {
  console.log(startedMessage);
});
