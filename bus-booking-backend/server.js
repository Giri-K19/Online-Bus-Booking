require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/buses", require("./routes/buses"));

app.get("/", (req, res) => {
    res.send("Backend Running");
});

// GET all users (id, name, email)
app.get("/users", (req, res) => {
    db.query("SELECT id, name, email FROM users", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});