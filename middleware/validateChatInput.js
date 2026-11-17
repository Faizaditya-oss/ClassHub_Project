const MAX_MESSAGE_LENGTH = 500;

module.exports = (req, res, next) => {
  const message = req.body ? req.body.message : undefined;

  if (typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Pesan tidak boleh kosong.'
    });
  }

  const trimmed = message.trim();

  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      success: false,
      error: `Pesan terlalu panjang. Maksimal ${MAX_MESSAGE_LENGTH} karakter.`
    });
  }

  req.body.message = trimmed;
  return next();
};
