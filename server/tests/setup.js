import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

let mongoServer;
let userCounter = 0;

beforeAll(async () => {
  // Close any existing connections
  await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  if (mongoose.connection.readyState === 1) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
  userCounter = 0;
});

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

export const generateTestToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET || "test-secret", {});
};

export const createTestUser = async () => {
  const User = mongoose.model("user");
  userCounter++;
  const user = new User({
    email: `test${userCounter}@example.com`,
    password: "password123",
  });
  await user.save();
  return user;
};

export const createTestContact = async (userId) => {
  const Contact = mongoose.model("contact");
  const contact = new Contact({
    userId,
    name: "Test Contact",
    number: 1234567890,
    address: "Test Address",
  });
  await contact.save();
  return contact;
};
