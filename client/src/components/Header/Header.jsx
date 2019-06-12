import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ info }) => {
  const logout = () => e => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
  };
  const haveJwt = window.localStorage.getItem('token');
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
            <a href="/auth">Login</a>
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
