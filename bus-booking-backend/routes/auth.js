const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const db = require("../db");


// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields (Name, Email, Password)"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long"
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users(name, email, password) VALUES(?, ?, ?)";

    db.query(sql, [name.trim(), email.trim().toLowerCase(), hash], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({
            message: "An account with this email already exists"
          });
        }
        return res.status(500).json({
          message: "Database error during registration"
        });
      }

      res.status(201).json({
        message: "Account created successfully! You can now log in."
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error during registration"
    });
  }
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter both email and password"
    });
  }

  const sql = "SELECT * FROM users WHERE LOWER(email) = LOWER(?)";

  db.query(sql, [email.trim()], async (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error during login"
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "No account found with this email"
      });
    }

    const valid = await bcrypt.compare(password, result[0].password);

    if (!valid) {
      return res.status(401).json({
        message: "Incorrect password. Please try again."
      });
    }

    res.json({
      message: "Login successful!",
      user: {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email
      }
    });
  });
});

module.exports = router;