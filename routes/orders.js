const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const todayDate = require("../helpers/todaydate");

router.get("/", (req, res) => {
  pool.query(`SELECT * FROM orders_${todayDate}`, (err, result, fields) => {
    if (err) res.status(500).send(err);
    res.send({
      success: true,
      data: result,
    });
  });
});

router.get("/:userId", (req, res) => {
  pool.query(
    `SELECT * FROM orders_${todayDate} WHERE user_id = ${req.params.userId}`,
    (err, result, fields) => {
      if (err) res.status(500).send(err);
      res.send({
        success: true,
        data: result,
      });
    }
  );
});

router.get("/:userId/:orderId", (req, res) => {
  pool.query(
    `SELECT * FROM orders WHERE id = ${req.params.orderId} AND user_id = ${req.params.userId}`,
    (err, result, fields) => {
      if (err) throw err;
      res.send({
        success: true,
        data: result,
      });
    }
  );
});

module.exports = router;
