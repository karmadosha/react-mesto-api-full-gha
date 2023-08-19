require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorhandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
/* const cors = require('./middlewares/cors'); */

const { PORT, DB } = process.env;

mongoose.connect(DB, {
  useNewUrlParser: true,
});

const app = express();

const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Слишком большое количество запросов с данного IP, повторите попытку позже.',
});

app.use(helmet());
app.use(limiter);
app.use(cors({ origin: ['https://mestokarma.nomoreparties.co/', 'http://localhost:3000'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('ok');
});
