import moment from "moment";

const requestLogger = (req, res, next) => {
  const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  const method = req.method;
  const url = req.originalUrl;

  console.log(`[movie-server] [${currentTime}] ${method} ${url}`);

  next();
};

export default requestLogger;
