import express from "express";
import jwt from "jsonwebtoken";
import { Content, Link, User } from "./db";
import z from "zod";
import bcrypt from "bcrypt";
import { verifyToken } from "./middleware";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
config();

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
const validate = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = validate.parse(req.body);
  try {
    const user = await User.findOne({ username });

    if (user) {
      return res.status(403).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    User.create({ username, password: hashedPassword });
    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/signin", async(req, res) => {
  const { username, password } = req.body;
  try {
    const user =await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //@ts-ignore
    const isPasswordValid =await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid password" });
    }
    //@ts-ignore
    const token =await jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/content", verifyToken, async (req, res) => {
  const { link, type } = req.body;
  try {
    await Content.create({
      link,
      type,
      //@ts-ignore
      userId: req.userId,
      title: req.body.title,
      tags: [],
    });
    return res.status(200).json({ message: "Content created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error"+err });
  }
});
app.get("/api/v1/content", verifyToken,async (req, res) => {
  try {
    //@ts-ignore
    const content =await Content.find({ userId: req.userId }).populate(
      "userId",
      "username"
    );
    return res.status(200).json({ content });
  } catch (err) {
    return res.status(500).json({message: "Internal server error" });
  }
});
app.delete("/api/v1/content", verifyToken, async (req, res) => {
  const contentId = req.body.contentId;
  try {
    await Content.deleteMany({
      _id: contentId,
      //@ts-ignore
      userId: req.userId,
    });
    return res.status(200).json({ message: "Content deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/brain/share", verifyToken, async (req, res) => {
  const share = req.body.share;
  if (share) {
    const existingLink = await Link.findOne({
      //@ts-ignore
      userId: req.userId,
    });
    if (existingLink) {
      return res.status(403).json({ message: "Share link already exists" });
    }
    const hash = Math.random().toString(36).substring(2, 15);
    await Link.create({
      hash,
      //@ts-ignore
      userId: req.userId,
    });
    return res
      .status(200)
      .json({ message: "Share link created successfully", hash });
  } else {
    await Link.deleteOne({
      //@ts-ignore
      userId: req.userId,
    });
    return res.status(200).json({ message: "Share link deleted successfully" });
  }
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await Link.findOne({ hash }).populate("userId", "username");
  if (!link) {
    return res.status(404).json({ message: "Share link not found" });
  }
  const contents = await Content.find({ userId: link.userId._id }).populate(
    "userId",
    "username"
  );
  
  return res
    .status(200)//@ts-ignore
    .json({ content: contents, username: link.userId.username });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
