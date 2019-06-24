import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiPlusCircle } from 'react-icons/fi';
import { useStateValue } from '../../context';
import './Header.scss';

const Header = () => {
  const [{ user, authenticated, translate }, dispatch] = useStateValue();

  const url = window.location.origin.match('github')
    ? 'https://steam-keys.herokuapp.com'
    : 'http://localhost:3000';

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
              <Link to="/SteamKeys/" href="/SteamKeys/">
                {translate('homepage')}
              </Link>
            </li>
            <li>
              <Link to="/SteamKeys/roulette" href="/SteamKeys/roulette">
                {translate('reviews')}
              </Link>
            </li>
            <li>
              <Link to="/roulette" href="/roulette">
                {translate('faqAndGuarant')}
              </Link>
            </li>
            <li>
              <Link to="/roulette" href="/roulette">
                {translate('contacts')}
              </Link>
            </li>
            <li>
              <Link to="/roulette" href="/roulette">
                {translate('xujanKeys')}
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
