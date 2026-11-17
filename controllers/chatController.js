const ChatModel = require('../models/chatModel');

exports.getChatPage = (req, res) => {
  try {
    const initialMessages = ChatModel.getInitialMessages();

    res.render('chat', {
      title: 'AI Assistant - CLASSHUB',
      activePage: 'chat',
      initialMessages
    });
  } catch (error) {
    console.error('Error rendering chat page:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.sendMessage = (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Pesan tidak boleh kosong'
      });
    }

    // Mendapatkan balasan placeholder
    const reply = ChatModel.generatePlaceholderReply(message);

    res.json({
      success: true,
      reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  } catch (error) {
    console.error('Error handling chat message:', error);
    res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan pada AI Assistant placeholder server.'
    });
  }
};
