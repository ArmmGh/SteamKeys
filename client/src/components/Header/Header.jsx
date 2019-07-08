import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiPlusCircle } from 'react-icons/fi';
import { Slider } from 'react-burgers';
import { FaSteam, FaVk } from 'react-icons/fa';
import { useStateValue } from '../../context';
import './Header.scss';

const Header = () => {
  const [{ user, games, authenticated, translate }, dispatch] = useStateValue();
  const [isActive, setActive] = useState(false);

  const url = window.location.origin.match('github')
    ? 'https://steam-keys.herokuapp.com'
    : 'http://localhost:3000';
  const authSteam = () => e => {
    window.open(`${url}/auth/steam`, '_self');
  };
  const authVk = () => e => {
    window.open(`${url}/auth/vkontakte`, '_self');
  };

  function importAll(r) {
    const images = {};
    // eslint-disable-next-line array-callback-return
    r.keys().map((item, index) => {
      images[item.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '')] = r(
        item,
      );
    });
    return images;
  }

  const images = importAll(
    require.context('../../assets/profile', false, /\.(png|jpe?g|svg)$/),
  );

  useEffect(() => {}, []);

  return (
    <header>
      <div className="main-width">
        <div className="header_holder">
          <div className={`menu_bar ${isActive ? 'active' : ''}`}>
            <Slider
              width={30}
              lineHeight={3}
              lineSpacing={5}
              padding="10px"
              onClick={() => setActive(!isActive)}
              active={isActive}
            />
          </div>
          <ul className={`nav mobile_menu ${isActive ? 'show' : 'hide'}`}>
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
              <Link to="/SteamKeys/faq" href="/faq">
                {translate('faqAndGuarant')}
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
                <button className="auth" onClick={authVk()}>
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
