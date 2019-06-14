const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  port = 3000,
} = process.env;
// const socket = require('../socket');

module.exports = app => {
  //   const io = require('socket.io')(server);
  //   socket(io);

  app.listen(port, () => console.log(`listening on http://localhost:${port}`));
  mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASS}${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    {
      useNewUrlParser: true,
      useFindAndModify: true,
    },
  );
};
