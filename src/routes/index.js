const express = require('express');
const router = express.Router();
const courseRoutes = require('./courseRoutes');

router.use('/course', courseRoutes);

module.exports = router;