import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSteam, FaVk } from 'react-icons/fa';
import { useStateValue } from '../../context';
import './Footer.scss';

const Footer = () => {
  const [{ user, authenticated, translate }, dispatch] = useStateValue();

  const url = window.location.origin.match('github')
    ? 'https://steam-keys.herokuapp.com'
    : 'http://localhost:3000';

  useEffect(() => {}, []);

  return <footer>Footer</footer>;
};

export default Footer;
