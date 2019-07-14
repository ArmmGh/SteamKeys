import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiPlusCircle } from 'react-icons/fi';
import { Slider } from 'react-burgers';
import { FaSteam, FaVk } from 'react-icons/fa';
import fetchApi from '../../utils/fetchApi';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import { useStateValue } from '../../context';
import './Header.scss';

const Header = () => {
  const [{ user, games, authenticated, translate }, dispatch] = useStateValue();
  const [isActive, setActive] = useState(false);
  const [modalIsOpen, setModal] = useState(false);
  const [sum, setSum] = useState(1000);

  const url = window.location.origin.match('keyforu')
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

  const handeleChange = val => {
    if (val.match(/^[0-9]+$/)) {
      setSum(val);
    }
  };

  const openModal = () => e => {
    setModal(true);
    setSum(1000);
  };

  const addBalance = () => e => {
    fetchApi('/addbalance', {
      method: 'POST',
      body: JSON.stringify({ sum }),
    });
  };

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Modal
        closeTimeoutMS={200}
        ariaHideApp={false}
        onRequestClose={() => setModal(false)}
        shouldCloseOnOverlayClick={true}
        isOpen={modalIsOpen}
        className="Modal"
        overlayClassName="OverlayHeader"
      >
        <div className="header">
          <div />
          <h1>ПОПОЛНЕНИЕ БАЛАНСА</h1>
          <div className="close">
            <MdClose onClick={() => setModal(false)} />
          </div>
        </div>
        <div className="body">
          <h1>Введите сумму</h1>
          <div className="inpHolder">
            <input
              type="text"
              className="input"
              name="sum"
              value={sum}
              onChange={e => handeleChange(e.target.value)}
            />
            <button onClick={addBalance()}>Пополнить</button>
          </div>
          <div className="info">
            Средства приходят моментально, но могут быть задержки до 5-10 минут.
          </div>
        </div>
      </Modal>
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
                <Link to="/" href="/">
                  {translate('homepage')}
                </Link>
              </li>
              <li>
                <Link to="/reviews" href="/reviews">
                  {translate('reviews')}
                </Link>
              </li>
              <li>
                <Link to="/faq" href="/faq">
                  {translate('faqAndGuarant')}
                </Link>
              </li>
              <li>
                <Link to="/case/xujan" href="/case/xujan">
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
                    <FiPlusCircle onClick={openModal()} />
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
    </React.Fragment>
  );
};

export default Header;
