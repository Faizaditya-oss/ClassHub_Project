// CLASSHUB AI Assistant Client Interface

document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const sendBtn = document.getElementById('sendBtn');
  const quickPrompts = document.querySelectorAll('.quick-prompt');

  // Helper scroll to bottom
  const scrollToBottom = () => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Append user bubble
  const appendUserMessage = (text, timeStr) => {
    const bubble = document.createElement('div');
    bubble.className = 'flex items-start justify-end gap-3 max-w-2xl ml-auto chat-bubble-animate';
    bubble.innerHTML = `
      <div class="space-y-1 text-right">
        <div class="bg-brand-600 text-white p-4 rounded-2xl rounded-tr-none shadow-sm text-sm leading-relaxed text-left">
          ${escapeHtml(text)}
        </div>
        <span class="text-[10px] text-slate-400 block px-1">${timeStr}</span>
      </div>
      <div class="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-sm">
        Anda
      </div>
    `;
    chatMessages.appendChild(bubble);
    scrollToBottom();
  };

  // Append bot bubble
  const appendBotMessage = (text, timeStr) => {
    const bubble = document.createElement('div');
    bubble.className = 'flex items-start gap-3 max-w-2xl chat-bubble-animate';
    bubble.innerHTML = `
      <div class="w-8 h-8 rounded-xl bg-brand-600 text-white flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-sm">
        AI
      </div>
      <div class="space-y-1">
        <div class="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200/80 shadow-sm text-sm text-slate-800 leading-relaxed whitespace-pre-line">
          ${escapeHtml(text)}
        </div>
        <span class="text-[10px] text-slate-400 block px-1">${timeStr}</span>
      </div>
    `;
    chatMessages.appendChild(bubble);
    scrollToBottom();
  };

  // Typing indicator
  const showTypingIndicator = () => {
    const indicator = document.createElement('div');
    indicator.id = 'typingIndicator';
    indicator.className = 'flex items-center gap-2 max-w-xs text-xs text-slate-400 pl-11 chat-bubble-animate';
    indicator.innerHTML = `
      <span class="flex items-center gap-1 bg-white px-3 py-2 rounded-xl border border-slate-200/60 shadow-xs">
        <span class="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:0.2s]"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:0.4s]"></span>
        <span class="ml-1 text-slate-500">Mengetik respons...</span>
      </span>
    `;
    chatMessages.appendChild(indicator);
    scrollToBottom();
  };

  const removeTypingIndicator = () => {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
      indicator.remove();
    }
  };

  // Sanitizer
  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Send handler
  const handleSendMessage = async (messageText) => {
    const text = messageText.trim();
    if (!text) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // UI update
    appendUserMessage(text, currentTime);
    chatInput.value = '';
    chatInput.disabled = true;
    sendBtn.disabled = true;
    showTypingIndicator();

    try {
      const response = await fetch('/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      removeTypingIndicator();

      if (data.success) {
        appendBotMessage(data.reply, data.timestamp || currentTime);
      } else {
        appendBotMessage("Maaf, terjadi kendala: " + (data.error || "Gagal memproses pesan."), currentTime);
      }
    } catch (err) {
      console.error('Chat error:', err);
      removeTypingIndicator();
      appendBotMessage("Maaf, koneksi ke server ClassHub terputus. Silakan coba lagi.", currentTime);
    } finally {
      chatInput.disabled = false;
      sendBtn.disabled = false;
      chatInput.focus();
    }
  };

  // Submit listener
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSendMessage(chatInput.value);
    });
  }

  // Quick prompt buttons
  quickPrompts.forEach(button => {
    button.addEventListener('click', () => {
      const promptText = button.textContent.trim();
      chatInput.value = promptText;
      handleSendMessage(promptText);
    });
  });

  scrollToBottom();
});
