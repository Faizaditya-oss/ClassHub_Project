const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/', chatController.getChatPage);
router.post('/send', chatController.sendMessage);

module.exports = router;
