// Model logic untuk AI Assistant
// Saat ini menyediakan simulasi respons placeholder cerdas
// Integrasi langsung dengan Google Gemini API akan dihubungkan pada tahap selanjutnya.

const initialMessages = [
  {
    sender: "bot",
    text: "Halo! Saya ClassHub AI Assistant. Saya dapat membantu memberikan informasi seputar profil kelas, jadwal kegiatan, struktur organisasi, dan agenda akademik. Ada yang bisa saya bantu hari ini?",
    timestamp: "Baru saja"
  }
];

const placeholderKnowledge = [
  {
    keywords: ["profil", "kelas", "apa itu", "tentang"],
    response: "Kelas Teknik Informatika 2024-A (TI-24A) adalah komunitas akademik yang fokus pada teknologi digital, rekayasa perangkat lunak, dan kecerdasan buatan dengan 36 anggota aktif."
  },
  {
    keywords: ["ketua", "pimpinan", "struktur", "wakil"],
    response: "Ketua kelas kami adalah Arya Pratama dan Wakil Ketua adalah Nabila Putri. Mereka didukung oleh sekretaris, bendahara, dan beberapa koordinator divisi."
  },
  {
    keywords: ["kegiatan", "acara", "agenda", "workshop"],
    response: "Kegiatan terbaru kami meliputi Workshop AI & LLM, Study Group Algoritma, Class Bonding di Sentul, dan program Bakti Sosial Digital mendatang."
  },
  {
    keywords: ["anggota", "jumlah", "berapa"],
    response: "Total anggota kelas saat ini adalah 36 mahasiswa aktif yang terbagi dalam berbagai divisi dan minat keahlian teknologi."
  }
];

const ChatModel = {
  getInitialMessages: () => initialMessages,
  generatePlaceholderReply: (userQuery) => {
    if (!userQuery || userQuery.trim() === "") {
      return "Silakan ketik pertanyaan Anda mengenai profil atau kegiatan kelas.";
    }

    const queryLower = userQuery.toLowerCase();
    const matched = placeholderKnowledge.find(item => 
      item.keywords.some(keyword => queryLower.includes(keyword))
    );

    if (matched) {
      return `[Demo Mode] ${matched.response} \n\n(Catatan: Respons ini berasal dari placeholder engine. Google Gemini API akan dihubungkan penuh pada tahap selanjutnya).`;
    }

    return `[Demo Mode] Terima kasih atas pertanyaan Anda: "${userQuery}". Saat ini fitur AI sedang berjalan dalam mode placeholder. Pada tahap integrasi berikutnya, Google Gemini API akan menjawab pertanyaan secara dinamis dan komprehensif!`;
  }
};

module.exports = ChatModel;
