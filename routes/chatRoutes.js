const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const validateChatInput = require('../middleware/validateChatInput');

router.get('/', chatController.getChatPage);
router.post('/send', validateChatInput, chatController.sendMessage);

module.exports = router;
