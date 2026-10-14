const express = require("express");
const router = express.Router();

const db = require("../db");

// Get all buses

router.get("/", (req, res) => {

  db.query(
    "SELECT * FROM buses",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});

// Search buses
router.get("/search", (req, res) => {
  const { from, to } = req.query;

  let sql = "SELECT * FROM buses WHERE 1=1";
  const params = [];

  if (from && from.trim()) {
    sql += " AND LOWER(TRIM(from_city)) = LOWER(TRIM(?))";
    params.push(from.trim());
  }

  if (to && to.trim()) {
    sql += " AND LOWER(TRIM(to_city)) = LOWER(TRIM(?))";
    params.push(to.trim());
  }

  sql += " ORDER BY price ASC";

  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

module.exports = router;