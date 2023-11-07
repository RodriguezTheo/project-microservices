import request from "supertest";
import { app } from "@/app";
import { credentialsSeed } from "@/lib/placeholder-data";
import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";
import * as authModel from "@/models/auth.models";

// signUp route
describe("Test the /signUp route", () => {
  it("should return a valid token with valid credentials", async () => {
    const credentials = credentialsSeed[0];
    const response = await request(app)
      .post("/signUp")
      .send(credentials)
      .expect(200);

    expect(response.body).toHaveProperty("token");
  });

  it("should return a 401 status with invalid credentials", async () => {
    const credentials = {
      email: credentialsSeed[0].email,
      password: "invalid_email@mail.com",
    };

    const res = await request(app)
      .post("/signUp")
      .send(credentials)
      .expect(401);
    expect(JSON.parse(res.text)).toEqual({
      error: "Invalid email or password",
    });
  });

  it("should return a 401 status with invalid credentials", async () => {
    const credentials = {
      email: "invalid_email@example.com",
      password: credentialsSeed[0].password,
    };

    const res = await request(app)
      .post("/signUp")
      .send(credentials)
      .expect(401);
    expect(JSON.parse(res.text)).toEqual({
      error: "Invalid email or password",
    });
  });

  it("should return a 401 status with invalid credentials", async () => {
    const credentials = {
      email: "invalid_email@example.com",
      password: "invalid_email@mail.com",
    };

    const res = await request(app)
      .post("/signUp")
      .send(credentials)
      .expect(401);
    expect(JSON.parse(res.text)).toEqual({
      error: "Invalid email or password",
    });
  });

  it("should return a 500 status with invalid token", async () => {
    const credentials = credentialsSeed[0];

    // Espionne la fonction jwt.sign et simule une erreur
    jest.spyOn(jwt, "sign").mockImplementation(() => {
      throw new Error("Error generating token");
    });

    const res = await request(app)
      .post("/signUp")
      .send(credentials)
      .expect(500);
    expect(JSON.parse(res.text)).toEqual({ error: "Error generating token" });
  });

  it("should return a 500 status with error server", async () => {
    const credentials = credentialsSeed[0];

    jest.spyOn(authModel, "findByEmail").mockImplementation(() => {
      throw new Error("Error from database");
    });

    const res = await request(app)
      .post("/signUp")
      .send(credentials)
      .expect(500);
    expect(JSON.parse(res.text)).toEqual({ error: "Error from login" });
  });
});
