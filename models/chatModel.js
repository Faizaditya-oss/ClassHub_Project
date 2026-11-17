// Model data awal untuk halaman AI Assistant.
// Jawaban AI dihasilkan oleh GeminiService menggunakan konteks dari PostgreSQL.

const initialMessages = [
  {
    sender: 'bot',
    text: 'Halo! Saya ClassHub AI Assistant. Saya dapat membantu menjawab pertanyaan seputar profil kelas, pengurus/anggota, dan kegiatan berdasarkan data resmi yang tersimpan di database kelas. Ada yang bisa saya bantu?',
    timestamp: 'Baru saja'
  }
];

const ChatModel = {
  getInitialMessages: () => initialMessages
};

module.exports = ChatModel;
