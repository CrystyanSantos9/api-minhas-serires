const express = require("express");
const router = express.Router();

const Count = require("../models/count");

const CountController = require("../controllers/counts");

const models = {
  Count,
};



router.get("/", CountController.list.bind(null, models));
router.post("/", CountController.create.bind(null, models));

module.exports = router;
