const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const indexRouter = require('./routes');
const recipesRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');
const healthRouter = require('./routes/health');
const envfile = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const app = express();
const connectDB  = require('./config/db');

app.use(helmet()); // https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRouter);
app.use('/recipes', recipesRouter);
app.use('/users', usersRouter);
app.use('/health', healthRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// pass any unhandled errors to the error handler
app.use(errorHandler);
connectDB();

module.exports = app;
