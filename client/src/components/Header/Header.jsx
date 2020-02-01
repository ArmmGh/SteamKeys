import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiPlusCircle } from 'react-icons/fi';
import { Slider } from 'react-burgers';
import { FaSteam, FaVk } from 'react-icons/fa';
import { MdClose, MdAccessTime, MdAccountCircle} from 'react-icons/md';
import Modal from 'react-modal';
import fetchApi from '../../utils/fetchApi';
import axios from 'axios';
import uuid from 'uuid/v4';
import { useStateValue } from '../../context';
import './Header.scss';
import Logo from '../../assets/logo.png';

const Header = () => {
  const [
    { user, socket, authenticated, translate },
    dispatch,
  ] = useStateValue();
  const [local, setLocal] = useState(new Date().toLocaleTimeString())
  const [isActive, setActive] = useState(false);
  const [modalIsOpen, setModal] = useState(false);
  const [sum, setSum] = useState(1000);
  const [random, setRandom] = useState(
    Math.floor(100000 + Math.random() * 900000),
  );


  const url = window.location.origin.match('keyforu')
    ? 'https://steam-keys.herokuapp.com'
    : 'http://localhost:3000';
  const authSteam = () => e => {
    window.open(`${url}/steam`, '_self');
  };
  const authVk = () => e => {
    window.open(`${url}/vkontakte`, '_self');
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

  setInterval( () => {
    setLocal(new Date().toLocaleTimeString())
  },1000)

  const addBalance = () => e => {};

  const openModal = () => e => {
    fetchApi('/addbalance').then(res => console.log(res));
    setModal(true);
    setSum('');
  };
  const storeData = () => e => {
    // console.log(data);
    fetchApi('/storedata', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.userID,
        sum,
        pay_id: user.userID,
      }),
    });
  };

  useEffect(() => {
    socket.on('aaa', data => console.log(data));
  }, []);

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
            <form action="https://any-pay.org/merchant" method="post">
              <input type='hidden' name="merchant_id" defaultValue="4183" id="merchant_id" />
              <input type='hidden' name="secret_key" defaultValue={process.env.api_key} id="secret_key" />
              <input type='hidden' name="pay_id" defaultValue={user.userID} id="pay_id"/>'
              <input type='text' name="amount" value={sum} onChange={e => handeleChange(e.target.value)} id="amount"/>
              <button onClick={storeData()} type="submit">
                Пополнить
              </button>
            </form>
          </div>
          <div className="info">
            Средства приходят моментально, но могут быть задержки до 5-10 минут.
          </div>
        </div>
      </Modal>
              {authenticated ? (
                <div className="header2">
        <header>
            <div className="design">
                <div className="GTC">
                <div className="logon">
                    <img src={Logo} alt="logo"/>
                </div>
                <div className="outauth">
                  <div className="UTC">
                  <div className="timer">
                        <p>{local}</p>
                    </div>
                    <div className="icona">
                        <div className="children">
                    <MdAccessTime />
                        </div>  
                    </div>
                  </div>
                    <div className="prof">
                      <div className="ile">
                      <MdAccountCircle />
                      </div>
                      <div className="link">
                        <Link to="/adding" href="/adding">
                          ПРОФИЛЬ
                        </Link>
                      </div>
                    </div>
                </div>
                  <div className="bal">
                    <div className="num">
                    <p>баланс:</p>
                    <div className="cenzur">
                    <span>{(Math.floor(user.balance * 100) / 100)}</span>
                    </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="headercont">
                <div className="botcont">
                    <ul>
                <li>
                <Link to="/" href="/">
                Главная
                </Link>
                </li>
                <li>
                    <Link to="/reviews" href="/reviews">
                    Отзывы
                    </Link>
                </li>
                <li>
                    <Link to="/faq" href="/faq">
                        FAQ
                    </Link>
                </li>
                <li>
                    <Link to="/contact" href="/contact">
                        Контакты
                    </Link>
                </li>
                    </ul>
                </div>
            </div>
            </header>
            </div>
              ) : (
        <React.Fragment>
        <div className="header2">
        <header>
            <div className="design">
                <div className="GTC">
                <div className="logon">
                    <img src={Logo} alt="logo"/>
                </div>
                <div className="outauth">
                    <div className="timer">
                        <p>{local}</p>
                    </div>
                    <div className="icona">
                        <div className="children">
                    <MdAccessTime />
                        </div>  
                    </div>
                </div>
                <div className="authen">
                    <div className="authbut">
                    <button onClick={authVk()}>
                        <div className="ici">
                       <div className="vk"><FaVk /></div> 
                       <div className="login">Войти</div>
                       </div>
                    </button>
                    </div>
                </div>
                </div>
            </div>
            <div className="headercont">
                <div className="botcont">
                    <ul>
                <li>
                <Link to="/" href="/">
                Главная
                </Link>
                </li>
                <li>
                    <Link to="/reviews" href="/reviews">
                    Отзывы
                    </Link>
                </li>
                <li>
                    <Link to="/faq" href="/faq">
                        FAQ
                    </Link>
                </li>
                <li>
                    <Link to="/contact" href="/contact">
                        Контакты
                    </Link>
                </li>
                    </ul>
                </div>
            </div>
            </header>
            </div>
                </React.Fragment>
              )}
    </React.Fragment>
  );
};

export default Header;
