const express = require("express");
const router = express.Router();
const pool = require("../config/database");

router.get("/:userId", (req, res) => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  console.log(year, month, day);
  let todayDate = Date.parse(`${year}-${month}-${day}`) / 1000;
  pool.query(
    `SELECT * FROM orders_${todayDate} WHERE user_id = ${req.params.userId}`,
    (err, result, fields) => {
      if (err) res.status(500).send(err);
      res.send(result);
    }
  );
});

router.get("/:userId/:orderId", (req, res) => {
  pool.query(
    `SELECT * FROM orders WHERE id = ${req.params.orderId} AND user_id = ${req.params.userId}`,
    (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

module.exports = router;
