const request = require("supertest");
const User = require("../../models/User");
const { Genre } = require("../../models/Genre");
let server;

describe("auth middleware", () => {
  beforeEach(() => {
    server = require("../../server");
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  let token;

  const exec = () => {
    return request(server)
      .post("/api/genres") // corrected the route
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };

  beforeEach(() => {
    token = new User({ isAdmin: true }).generateToken();
  });

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401); // uncommented the expectation
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 201 if token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(201);
  });
});
