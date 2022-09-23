const express = require('express');
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get('/', mainController.principal);

module.exports = router;