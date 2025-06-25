require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const User = mongoose.model("User", new mongoose.Schema({
  username: String,
  password: String
}));

app.use(express.json());
app.use(express.static("public"));

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid username or password" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Invalid username or password" });

  res.status(200).json({ message: "Login successful" });
});

app.get("/dashboard", (req, res) => {
  res.send("<h1>Welcome to Admin Dashboard 🍰</h1>");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
