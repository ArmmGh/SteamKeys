const db = require('../utils/db');

let userCount = 0;
module.exports = io => {
  io.on('connection', socket => {
    global.socket = socket;
    socket.on('disconnect', () => {
      userCount -= 1;
      io.emit('userCount', { userCount });
    });
    userCount += 1;
    io.emit('userCount', { userCount });

    socket.on('opened case', data => {
      if (data.game.type !== 'xujan') {
        db.setLivedrop(data).then(res => {
          setTimeout(() => {
            io.emit('update live', res);
          }, 5500);
        });
      }
    });

    socket.on('done benefit', data => {
        db.setProfit(data).then(res => {
            io.emit('update benefit', res);
        });
    });

    socket.on('done rev', data => {
      db.setCom(data).then(res => {
          io.emit('update rev', res);
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

    if (!socket.sentRev) {
      socket.on('emit getrev', res => {
        db.getRev().then(data => {
          data = data.reverse();
          socket.emit('get rev', data);
        });
      });
      socket.sentRev = true;
    }

    if (!socket.sentRes) {
      socket.on('emit getres', res => {
        db.getRes().then(data => {
          socket.emit('get res', data);
        });
      });
      socket.sentRes = true;
    }

    if (!socket.sentBenefit) {
      socket.on('emit getbenefit', res => {
        db.getProfit().then(data => {
          data = data.reverse().slice(0, 15);
          socket.emit('get benefit', data);
        });
      });
      socket.sentBenefit = true;
    }
  });
};
