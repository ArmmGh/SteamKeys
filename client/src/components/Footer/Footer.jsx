import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaVk } from 'react-icons/fa';
import { useStateValue } from '../../context';
import './Footer.scss';

const Footer = () => {
  const [{ user, authenticated, translate }, dispatch] = useStateValue();

  const url = window.location.origin.match('github')
    ? 'https://steam-keys.herokuapp.com'
    : 'http://localhost:3000';

  useEffect(() => {}, []);

  return (
    <footer>
      <div className="main-width">
        <div className="links">
          <div className="urlLink">
            <Link to="/SteamKeys" href="/SteamKeys">
              {translate('homepage')}
            </Link>
            <Link to="/SteamKeys/contact" href="/SteamKeys/contact">
              {translate('contacts')}
            </Link>
            <Link to="/SteamKeys/reviews" href="/SteamKeys/reviews">
              {translate('reviews')}
            </Link>
            <Link to="/SteamKeys/agreement" href="/SteamKeys/agreement">
              {translate('agreement')}
            </Link>
          </div>
          <div className="socialLinks">
            <a href="vk.com">
              <FaVk /> {translate('onVk')}
            </a>
          </div>
        </div>
        <div className="text">{translate('warningSteamText')}</div>
      </div>
    </footer>
  );
};

export default Footer;
