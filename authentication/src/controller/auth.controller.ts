import { Request, Response } from "express";
import { CredentialsLogin } from "@/lib/definitions/Credentials-auth";
import { findByEmail } from "@/models/auth.models";
import { verifyPassword } from "@/utils/verifyPassword";
import jwt from "jsonwebtoken";
import type { JwtPayload, SignOptions } from "jsonwebtoken";
import { config } from "@/environment/config";

const { jwtSecret } = config;

async function auth(req: Request, res: Response) {
  const { email, password } = req.body as CredentialsLogin;
  try {
    const data = await findByEmail(email);
    if (!data) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await verifyPassword(password, data.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    try {
      const payload: JwtPayload = {
        id: data.id,
      };
      const signOptions: SignOptions = {
        algorithm: "HS256",
        expiresIn: "24h",
      };
      const token = jwt.sign(payload, jwtSecret, signOptions);
      res.status(200).json({ token });
    } catch (e) {
      res.status(500).json({ error: "Error generating token" });
    }
  } catch (error) {
    console.error("Error from login");
    res.status(500).json({ error: "Error from login", data: error });
  }
}

export { auth };
