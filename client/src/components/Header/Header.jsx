import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiPlusCircle } from 'react-icons/fi';
import { FaSteam, FaVk } from 'react-icons/fa';
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
            {/* <li>
              <Link to="/roulette" href="/roulette">
                {translate('contacts')}
              </Link>
            </li> */}
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
                  <Link to="/SteamKeys/profile" href="/profile">
                    <img src={user.imgurl} alt="" />
                  </Link>
                </div>
                <div className="settings">
                  <Link to="/SteamKeys/profile" href="/profile">
                    <FiSettings />
                    <p>{translate('profile')}</p>
                  </Link>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button className="auth" onClick={authSteam()}>
                  <FaSteam />
                  {translate('login')} <span>steam</span>
                </button>
                <button className="auth" onClick={authSteam()}>
                  <FaVk />
                  {translate('login')} <span>vk</span>
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
