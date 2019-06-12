const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;
const port = process.env.PORT || 3000;
const http = require('http');
// const socket = require('../socket');

module.exports = app => {
  const server = http.createServer(app);
  //   const io = require('socket.io')(server);
  //   socket(io);

  server.listen(port, () =>
    console.log(`listening on http://localhost:${port}`),
  );
  mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASS}${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    {
      useNewUrlParser: true,
    },
  );
};
