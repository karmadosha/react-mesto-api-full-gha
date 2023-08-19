const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Слишком большое количество запросов с данного IP, повторите попытку позже.',
});

module.exports = limiter;
