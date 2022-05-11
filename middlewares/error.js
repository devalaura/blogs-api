module.exports = async (error, _req, res, _next) => {
  const { status, code, message } = error;
  
  if (status && code) return res.status(status).json({ ERROR: message, CODE: code });

  return res.status(500).json({ message });
};