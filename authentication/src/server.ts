import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "@/environment/config";
import routes from "@/routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/", routes);

const { port, startedMessage } = config as {
  port: string;
  startedMessage: string;
};

app.listen(port, () => {
  console.log(startedMessage);
});
