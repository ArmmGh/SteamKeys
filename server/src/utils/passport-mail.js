const passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy;
const axios = require('axios');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const User = require('../models/User');



passport.use('mail', new CustomStrategy(
    function(req, callback) {
        const date = req.query.code
        const url1 = "https://oauth.mail.ru/token?client_id=3c4c8430046f410d9aa30a07bac55bad&client_secret=157d036e926043f3bed67151aaadbf71&code="
        const expert = url1.concat(date);
        const ending = "&redirect_uri=https://steam-keys.herokuapp.com/callback&grant_type=authorization_code"
        const end = expert.concat(ending)
        axios.post(`${end}`).then((res, req) => {
        const result = res;
        const tok = res.data.access_token;
        axios.get(`https://oauth.mail.ru/userinfo?access_token=${tok}`).then((response) =>{
          const result = response;
        }).catch(function (error) {
          console.log(error);
        })
      })
      callback(null, user);
    }
  ));
