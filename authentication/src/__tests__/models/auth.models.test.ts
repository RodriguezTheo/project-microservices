import { findByEmail, findById } from "@/models/auth.models";
import { credentialsSeed } from "@/lib/placeholder-data";
import { v4 } from "uuid";

describe("findById", () => {
  it("should return the user with the specified ID", async () => {
    const getId = await findByEmail(credentialsSeed[0].email);
    if (!getId) {
      throw new Error(
        "Error: Unable to retrieve an ID before testing the model."
      );
    }

    const user = await findById(getId.id);

    if (!user) {
      throw new Error("Error: The user with the specified ID was not found.");
    }

    expect(user).toBeDefined();
    expect(user.id).toBe(getId.id);
    expect(user.email).toBeDefined();
    expect(user.password).toBeDefined();
    expect(user.reset_password_requested).toBeDefined();
    expect(user.reset_password_required).toBeDefined();
    expect(user.is_active).toBeDefined();
  });

  it("should return null for an invalid ID", async () => {
    const nonExistentId = v4();
    const user = await findById(nonExistentId);
    expect(user).toBeNull();
  });
});
