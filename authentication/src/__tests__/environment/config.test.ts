const testCases = [
  {
    description: "should have a valid name config",
    descriptionDelete:
      "should have a default name if SERVICE_NAME is undefined",
    env: { property: "name", name: "SERVICE_NAME" },
    expected: "MyServiceName",
    _default: "Default Name",
  },
  {
    description: "should have a valid service route config",
    descriptionDelete:
      "should have a default route if SERVICE_ROUTE is undefined",
    env: { property: "baseAPIRoute", name: "SERVICE_ROUTE" },
    expected: "http://example.com",
    _default: "http://localhost:8080/",
  },
  {
    description: "should have a valid port config",
    descriptionDelete: "should have a default port if PORT is undefined",
    env: { property: "port", name: "PORT" },
    expected: 3000,
    _default: "8080",
  },
  {
    description: "should have a valid JWT secret config",
    descriptionDelete:
      "should have a default JWT secret if JWT_SECRET is undefined",
    env: { property: "jwtSecret", name: "JWT_SECRET" },
    expected: "MySecret",
    _default: "MySecretKey",
  },
];

describe("Configuration Test", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  testCases.forEach(
    ({ description, descriptionDelete, env, expected, _default }) => {
      it(description, async () => {
        process.env[env.name] = String(expected);
        const { config } = await import("@/env//config");
        expect(config[env.property]).toEqual(expected);
      });

      it(descriptionDelete, async () => {
        process.env[env.name] = undefined;
        const { config } = await import("@/env//config");
        expect(config[env.property]).toEqual(_default);
      });
    }
  );
});
