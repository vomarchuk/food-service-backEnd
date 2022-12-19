const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const reviewsRouter = require('./router/api/reviews');
const categoriesRouter = require('./router/api/categories');
const app = express();
const formatLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());

app.use('/', (req, res, next) => {
  res.json({
    status: 'success',
    code: 200,
    date: {
      message: 'OK',
    },
  });
});
app.use('/api/categories', categoriesRouter);
app.use('/api/reviews', reviewsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
