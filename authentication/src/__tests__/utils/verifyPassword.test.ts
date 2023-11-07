import bcrypt from "bcrypt";
import { verifyPassword } from "@/utils/verifyPassword";

describe("Test VerifyPassword function", () => {
  it("Should return true if hashedPassword is the same as Password", async () => {
    const password = "myPassword";
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await verifyPassword(password, hashedPassword);
    expect(result).toBe(true);
  });

  it("Should return false if hashedPassword is different from Password", async () => {
    const password = "myPassword";
    const hashedPassword = await bcrypt.hash("differentPassword", 10);

    const result = await verifyPassword(password, hashedPassword);
    expect(result).toBe(false);
  });

  it("Should return false if an error occurs during comparison", async () => {
    const password = "myPassword";
    const hashedPassword = "hashedPassword";

    (bcrypt.compare as jest.Mock) = jest
      .fn()
      .mockRejectedValue(new Error("Random error"));

    const result = await verifyPassword(password, hashedPassword);
    expect(result).toBe(false);
  });
});
