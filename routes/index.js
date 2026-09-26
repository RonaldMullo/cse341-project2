const express = require('express');
const router = express.Router();

router.use('/patients', require('./patients'));
router.use('/sessions', require('./sessions'));

module.exports = router;