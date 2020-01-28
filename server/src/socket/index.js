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
        db.setBenefit(data).then(res => {
            io.emit('update benefit', res);
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

    if (!socket.sentBenefit) {
      socket.on('emit getbenefit', res => {
        db.getBenefit().then(data => {
          if(data.length <= 28){
            data = data.reverse().slice(0, 20);
          }else{
            data = data.slice(0, 20).reverse();
          }
          socket.emit('get benefit', data);
        });
      });
      socket.sentBenefit = true;
    }
  });
};
