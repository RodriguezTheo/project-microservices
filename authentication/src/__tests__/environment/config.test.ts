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

const testCasesDb = [
  {
    description: "should have a valid db host config",
    descriptionDelete: "should have a default db host if DB_HOST is undefined",
    env: { property: "host", name: "DB_HOST" },
    expected: "exemple",
    _default: "localhost",
  },
  {
    description: "should have a valid db uri config",
    descriptionDelete: "should have a default db uri if DB_URI is undefined",
    env: { property: "uri", name: "DB_URI" },
    expected: "postgresql://user2:password2@localhost3:5432/myDb?schema=public",
    _default: "postgresql://user:password@localhost:5432/myDb?schema=public",
  },
  {
    description: "should have a valid db user config",
    descriptionDelete: "should have a default db user if DB_USER is undefined",
    env: { property: "user", name: "DB_USER" },
    expected: "randomUser",
    _default: "user",
  },
  {
    description: "should have a valid db password config",
    descriptionDelete:
      "should have a default db password if DB_PASSWORD is undefined",
    env: { property: "password", name: "DB_PASSWORD" },
    expected: "randomPassword",
    _default: "password",
  },
  {
    description: "should have a valid db port config",
    descriptionDelete: "should have a default db port if DB_PORT is undefined",
    env: { property: "port", name: "DB_PORT" },
    expected: 4504,
    _default: "5432",
  },
  {
    description: "should have a valid db database config",
    descriptionDelete:
      "should have a default database port if DB_NAME is undefined",
    env: { property: "database", name: "DB_NAME" },
    expected: "randomDb",
    _default: "myDb",
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

        const { config } = await import("@/env/config");
        expect(config[env.property]).toEqual(expected);
      });

      it(descriptionDelete, async () => {
        process.env[env.name] = undefined;
        const { config } = await import("@/env/config");
        expect(config[env.property]).toEqual(_default);
      });
    }
  );

  testCasesDb.forEach(
    ({ description, descriptionDelete, env, expected, _default }) => {
      it(description, async () => {
        process.env[env.name] = String(expected);
        const { config } = await import("@/env/config");
        expect(config.db[env.property]).toEqual(expected);
      });

      it(descriptionDelete, async () => {
        process.env[env.name] = undefined;
        const { config } = await import("@/env/config");
        expect(config.db[env.property]).toEqual(_default);
      });
    }
  );
});
