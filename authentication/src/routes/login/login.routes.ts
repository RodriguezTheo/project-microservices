import express, { RequestHandler } from "express";
import { auth } from "@/controller/auth.controller";

const loginRoutes = express.Router();

loginRoutes.post("/signUp", auth as RequestHandler);
loginRoutes.post("/signOut", (req, res) => {
  res.status(200).json({ message: "Coucou" });
});

export default loginRoutes;
