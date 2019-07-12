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
            <Link to="/" href="/">
              {translate('homepage')}
            </Link>
            <Link to="/contact" href="/contact">
              {translate('contacts')}
            </Link>
            <Link to="/reviews" href="/reviews">
              {translate('reviews')}
            </Link>
            <Link to="/agreement" href="/agreement">
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