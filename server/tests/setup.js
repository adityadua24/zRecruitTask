import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

let mongoServer;
let userCounter = 0;

// Connect to the in-memory database before all tests
beforeAll(async () => {
  // Close any existing connections
  await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// Clear all test data between tests
beforeEach(async () => {
  if (mongoose.connection.readyState === 1) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
  // Reset user counter
  userCounter = 0;
});

// Disconnect and stop the server after all tests
afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

// Helper function to generate test JWT tokens
export const generateTestToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET || "test-secret", {});
};

// Helper function to create a test user
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

// Helper function to create a test contact
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
