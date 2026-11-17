const express = require('express');
const router = express.Router();

const homeRoutes = require('./homeRoutes');
const profileRoutes = require('./profileRoutes');
const memberRoutes = require('./memberRoutes');
const activityRoutes = require('./activityRoutes');
const chatRoutes = require('./chatRoutes');

router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/members', memberRoutes);
router.use('/activities', activityRoutes);
router.use('/chat', chatRoutes);

module.exports = router;
