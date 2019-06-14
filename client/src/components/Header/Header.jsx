import React from 'react';
import { Link } from 'react-router-dom';
import fetchApi from '../../utils/fetchApi';

const Header = ({ info }) => {
  const haveJwt = window.localStorage.getItem('token');
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3000;
  const url =
    process.env.NODE_ENV === 'development'
      ? `http://${host}:${port}`
      : `http://${host}`;
  const logout = () => e => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
  };
  const authSteam = () => e => {
    window.open(`${url}/auth/steam`, '_self');
  };

  return (
    <header>
      <ul>
        {haveJwt ? (
          <li>
            <a href="/logout" onClick={logout()}>
              Logout
            </a>
            <img
              style={{ width: 70, height: 70 }}
              src={info.user.imgurl}
              alt=""
            />
            <a
              href={info.user.profileurl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {info.user.username}
            </a>
          </li>
        ) : (
          <li>
            {/* <a href="/auth">Login</a> */}
            <button onClick={authSteam()}>AUTH</button>
          </li>
        )}
        <li>
          {/* <Link to="/roulette" href="/roulette">
            Roulette
          </Link>
          <Link to="/crash" href="/crash">
            Crash
          </Link> */}
        </li>
      </ul>
    </header>
  );
};

export default Header;