const express = require('express');
const router = express.Router();

const authRoutes = require("./auth.js");

const { getStats } = require("../controller/stats");

router.use('/auth', authRoutes);
router.get('/stats', getStats);

module.exports = router;