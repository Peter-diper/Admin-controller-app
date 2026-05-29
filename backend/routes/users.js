const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DB_PATH = path.join(__dirname, "..", "db.json");

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

router.get("/", (req, res) => {
  res.json(readDB().users);
});

router.get("/:id", (req, res) => {
  const user = readDB().users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.post("/", (req, res) => {
  const db = readDB();
  const newUser = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
  };
  db.users.push(newUser);
  writeDB(db);
  res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
  const db = readDB();
  const index = db.users.findIndex((u) => u.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  db.users[index] = { ...db.users[index], ...req.body };
  writeDB(db);

  res.json(db.users[index]);
});

router.delete("/:id", (req, res) => {
  const db = readDB();
  db.users = db.users.filter((u) => u.id !== Number(req.params.id));
  writeDB(db);
  res.json({ message: "User deleted" });
});

module.exports = router;
