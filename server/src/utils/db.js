const User = require('../models/User');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { ADMIN1, ADMIN2 } = process.env;

const register = async data => {
  const user = await new User({
    username: data.username,
    steamid: data.steamid,
    imgurl: data.imgurl,
    admin: false,
    profileurl: data.profileurl,
    balance: 0,
  });
  // eslint-disable-next-line no-unused-expressions
  data.steamid === ADMIN1 || data.steamid === ADMIN2
    ? (user.admin = await true)
    : null;
  await user.save();
  return user;
};

const login = steamid => User.findOne({ steamid });

const update = async user => {
  login(user.steamid).then(data => {
    if (data !== null) {
      if (data.username !== user.username) {
        console.log('Changed name');
        User.findOneAndUpdate(
          { steamid: user.steamid },
          { $set: { username: user.username } },
          { new: true },
          (err, doc) => doc,
        );
      }
      if (data.imgurl !== user.imgurl) {
        console.log('Changed image');
        User.findOneAndUpdate(
          { steamid: user.steamid },
          { $set: { imgurl: user.imgurl } },
          { new: true },
          (err, doc) => doc,
        );
      }
    } else {
      console.log('New User');
    }
  });
};

module.exports = {
  login,
  register,
  update,
};
