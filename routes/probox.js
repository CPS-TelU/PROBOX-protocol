const express = require("express");
const proboxController = require("../controller/probox");

const router = express.Router();

router.post("/probox/history", proboxController.createHistoryController);

module.exports = router;
