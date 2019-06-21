const db = require('../utils/db');

module.exports = io => {
  io.on('connection', socket => {
    console.log('a user connected');

    socket.on('disconnect', reason => {
      console.log('user disconnected');
    });

    socket.on('opened case', data => {
      db.setLivedrop(data).then(res => {
        socket.emit('update live', res);
      });
    });
  });
};
