import { config } from "@/environment/config";
import { app } from "@/app";

const { port, startedMessage } = config as {
  port: string;
  startedMessage: string;
};
app.listen(port, () => {
  console.log(startedMessage);
});
