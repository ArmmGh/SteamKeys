import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import accept from '../../assets/profile/accept.png';
import { FaVk } from 'react-icons/fa';
import { useStateValue } from '../../context';
import './Footer.scss';

const Footer = () => {
  const [{ user, authenticated, translate }, dispatch] = useStateValue();

  useEffect(() => {}, []);

  return (
    <footer>
      <div className="main-width">
        <div className="links">
          <div className="urlLink">
            <Link to="/" href="/">
              {translate('homepage')}
            </Link>
            <Link to="https://vk.com/id553108227" href="https://vk.com/id553108227">
              {translate('contacts')}
            </Link>
          </div>
        </div>
        <div className="text"><img src={accept} alt="payeer"/></div>
      </div>
    </footer>
  );
};

export default Footer;
