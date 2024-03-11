const request = require("supertest");
const { Genre } = require("../../models/Genre");
const User = require("../../models/User");
let server;

// TODO: Refactor the test code with mosh's technique

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../server");
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  // get all genres
  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
      const res = await request(server).get("/api/genres");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);

      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  // create a genre
  describe("POST /", () => {
    it("should return 401 if client is not logged in", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "genre1" });
      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is invalid or less than 3 characters", async () => {
      const token = new User({ isAdmin: true }).generateToken();

      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "g1" });

      expect(res.status).toBe(400);
    });

    it("should return 400 if genre more that 30 characters", async () => {
      const token = new User({ isAdmin: true }).generateToken();
      const name = new Array(32).join("a");

      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });

      expect(res.status).toBe(400);
    });

    it("should save the genre if it is valid", async () => {
      const token = new User({ isAdmin: true }).generateToken();

      await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "genre1" });

      const genre = await Genre.find({ name: "genre1" });
      expect(genre).not.toBeNull();
    });

    it("should return the genre if it is valid", async () => {
      const token = new User({ isAdmin: true }).generateToken();

      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "genre1" });

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });

  // get single genre
  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 400 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");
      expect(res.status).toBe(400);
    });

    it("should return 404 if genre does not exist", async () => {
      const res = await request(server).get(
        "/api/genres/65cd13d324420bb8b58dca1b"
      );
      expect(res.status).toBe(404);
    });
  });

  // TODO: PUT and DELETE method need to be implemented
});
