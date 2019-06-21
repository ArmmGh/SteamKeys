import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiPlusCircle } from 'react-icons/fi';
import fetchApi from '../../utils/fetchApi';
import { useStateValue } from '../../context';
import './Header.scss';

const Header = () => {
  const [
    { user, authenticated, strings, translate },
    dispatch,
  ] = useStateValue();

  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3000;
  const url =
    process.env.NODE_ENV === 'development'
      ? `http://${host}:${port}`
      : `http://${host}`;

  const authSteam = () => e => {
    window.open(`${url}/auth/steam`, '_self');
  };

  useEffect(() => {}, []);

  return (
    <header>
      <div className="main-width">
        <div className="header_holder">
          <ul className="nav">
            <li>
              <Link to="/roulette" href="/roulette">
                Homepage
              </Link>
            </li>
            <li>
              <Link to="/roulette" href="/roulette">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/roulette" href="/roulette">
                Faq & guarantees
              </Link>
            </li>
          </ul>
          <div className="actions">
            {authenticated ? (
              <React.Fragment>
                <div className="balance">
                  <p>
                    {translate('balance')}: <span>{user.balance}</span>
                  </p>
                  <FiPlusCircle />
                </div>
                <div className="avatar">
                  <Link to="/profile" href="/profile">
                    <img src={user.imgurl} alt="" />
                  </Link>
                </div>
                <div className="settings">
                  <Link to="/profile" href="/profile">
                    <FiSettings />
                    <p>{translate('profile')}</p>
                  </Link>
                </div>
              </React.Fragment>
            ) : (
              // <button onClick={logout()}>Logout</button>
              // <a href={user.profileurl} rel="noopener noreferrer" target="_blank">
              //   {user.username}
              // </a>
              <li>
                <button onClick={authSteam()}>Login</button>
              </li>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
