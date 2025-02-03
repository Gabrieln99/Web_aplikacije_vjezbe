// middleware/logger.js

export const timer = (req, res, next) => {
  console.log(`Trenutno vrijeme: ${new Date().toLocaleTimeString()}`);
  next();
};

export const requestLogger = (req, res, next) => {
  const date = new Date().toLocaleDateString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${date}] : ${method} ${url}`);
  next();
};
