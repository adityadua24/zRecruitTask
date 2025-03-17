import request from "supertest";
import mongoose from "mongoose";
import { generateTestToken, createTestUser, createTestContact } from "./setup.js";
import { app } from "../index.js";
import User from "../model/user.js";
import Contact from "../model/contact.js";

describe("Contacts API", () => {
  let testUser;
  let testToken;
  let testContact;

  beforeEach(async () => {
    testUser = await createTestUser();
    testToken = generateTestToken(testUser._id);
    testContact = await createTestContact(testUser._id);
  });

  describe("GET /api/v1/contacts/all", () => {
    it("should return all contacts for authenticated user", async () => {
      const response = await request(app).get("/api/v1/contacts/all").set("Authorization", `Bearer ${testToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.contacts)).toBe(true);
      expect(response.body.contacts.length).toBe(1);
      expect(response.body.contacts[0].name).toBe("Test Contact");
    });

    it("should return 401 if not authenticated", async () => {
      const response = await request(app).get("/api/v1/contacts/all");
      expect(response.status).toBe(401);
    });
  });

  describe("POST /api/v1/contacts/create", () => {
    it("should create a new contact", async () => {
      const newContact = {
        name: "New Contact",
        number: "9876543210",
        address: "New Address",
      };

      const response = await request(app)
        .post("/api/v1/contacts/create")
        .set("Authorization", `Bearer ${testToken}`)
        .send(newContact);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.contact.name).toBe(newContact.name);
      expect(response.body.contact.userId.toString()).toBe(testUser._id.toString());
    });
  });

  describe("PUT /api/v1/contacts/update/:id", () => {
    it("should update an existing contact", async () => {
      const updates = {
        name: "Updated Contact",
        number: "9876543210",
      };

      const response = await request(app)
        .put(`/api/v1/contacts/update/${testContact._id}`)
        .set("Authorization", `Bearer ${testToken}`)
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.contact.name).toBe(updates.name);
    });
  });

  describe("DELETE /api/v1/contacts/delete/:id", () => {
    it("should delete an existing contact", async () => {
      const response = await request(app)
        .delete(`/api/v1/contacts/delete/${testContact._id}`)
        .set("Authorization", `Bearer ${testToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Verify contact is deleted
      const getResponse = await request(app).get("/api/v1/contacts/all").set("Authorization", `Bearer ${testToken}`);

      expect(getResponse.body.contacts.length).toBe(0);
    });
  });
});
