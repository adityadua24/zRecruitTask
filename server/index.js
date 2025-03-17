import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/user.js";
import contactRouter from "./routes/contacts.js";
import user from "./model/user.js";

export const app = express();

const port = 4500;

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("db connected");
  } catch (error) {
    console.log("db not connected", error);
  }
};

// Only connect to MongoDB if not in test mode
if (process.env.NODE_ENV !== "test") {
  mongoDB();
}

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/contacts", contactRouter);

app.get("/", (req, res) => {
  res.send("API is working");
});

// Only start the server if this file is run directly and not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
