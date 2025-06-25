const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect(process.env.MONGO_URI);

const User = mongoose.model("User", new mongoose.Schema({
  username: String,
  password: String
}));

(async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const user = new User({ username: "admin", password: hashedPassword });
  await user.save();
  console.log("Admin created ✅");
  process.exit();
})();
