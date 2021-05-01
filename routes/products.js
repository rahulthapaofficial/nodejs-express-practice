const express = require("express");
const router = express.Router();
const pool = require("../config/database");

router.get("/", (req, res) => {
  pool.query(
    "SELECT * FROM products WHERE active = 1",
    (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

module.exports = router;
