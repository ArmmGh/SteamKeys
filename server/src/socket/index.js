const db = require('../utils/db');

module.exports = io => {
  io.on('connection', socket => {
    socket.on('disconnect', reason => {});

    socket.on('opened case', data => {
      db.setLivedrop(data).then(res => {
        io.emit('update live', res);
      });
    });

    if (!socket.sentLivedrop) {
      socket.on('emit getlive', res => {
        db.getLivedrop().then(data => {
          data = data.reverse().slice(0, 10);
          socket.emit('get live', data);
        });
      });
      socket.sentLivedrop = true;
    }
  });
};
