import React, { useState, useEffect } from 'react';
import { FaSteam, FaVk } from 'react-icons/fa';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import fetchApi from '../../utils/fetchApi';
import Item from './Item';
import { useStateValue } from '../../context';
import point from '../../assets/game-point.png';
import './Game.scss';

const Game = params => {
  const [
    { user, authenticated, translate, cases, socket },
    dispatch,
  ] = useStateValue();
  const [matrix, setMatrix] = useState(0);
  const [winner, setWinner] = useState(null);
  const [caseOpening, setOpening] = useState(false);
  const [demoOpen, setDemoOpen] = useState('false');
  const [modalIsOpen, setModal] = useState(false);

  const url = window.location.origin.match('github')
    ? 'https://steam-keys.herokuapp.com'
    : 'http://localhost:3000';

  const authSteam = () => e => {
    window.open(`${url}/auth/steam`, '_self');
  };

  function importAll(r) {
    const images = {};
    // eslint-disable-next-line array-callback-return
    r.keys().map(item => {
      images[item.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '')] = r(
        item,
      );
    });
    return images;
  }

  const images = importAll(
    require.context('../../assets/slots', false, /\.(png|jpe?g|svg)$/),
  );

  const profImages = importAll(
    require.context('../../assets/profile', false, /\.(png|jpe?g|svg)$/),
  );

  const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  async function PerformAction(actions) {
    const totalChance = actions.reduce(
      (accum, current) => accum + current.chance,
      0,
    );

    if (totalChance > 100) {
      throw Error('Total chance cannnot exceed 100%');
    }
    if (totalChance < 100) {
      actions.push({
        chance: 100 - totalChance,
      });
    }

    let outcome = Math.random() * 100;

    const game = actions.find(current => {
      outcome -= current.chance;
      return outcome <= 0;
    });
    return game;
  }

  const openCase = () => e => {
    if (user.balance >= cases.priceRUB || cases.type === 'demo') {
      setOpening(true);
      const d = Math.random();
      let randomMargin = 0;
      if (d < 0.75) {
        randomMargin = 165;
      } else if (d < 0.5) {
        randomMargin = 85;
      } else if (d < 0.25) {
        randomMargin = 42;
      } else {
        randomMargin = 15;
      }
      // Request backend for case
      PerformAction(cases.data)
        .then(res => {
          const elementLeft = document.querySelectorAll(`.${res.img}`)[10]
            .offsetLeft;
          const minusPos = elementLeft - (772 - randomMargin);
          setMatrix(matrix - minusPos);

          if (cases.type !== 'demo') {
            fetchApi('/opencase', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ winner: res, case: cases }),
            }).then(data => {
              dispatch({ type: 'updateUser', payload: { ...data } });
              res.type = cases.type;
              res.caseName = cases.name;
              res.time = new Date();
              socket.emit('opened case', {
                game: res,
              });
            });
          }
          return res;
        })
        .then(res =>
          setTimeout(() => {
            setWinner(res);
            setOpening(false);
            if (cases.type === 'demo') {
              setDemoOpen(true);
            }
          }, 5500),
        );
    }
  };

  const tryAgain = () => e => {
    // If balance
    setWinner(null);
    setMatrix(0);
  };

  const addBalance = () => e => {};

  useEffect(() => {
    if (params.match.params.name === 'xujan') {
      // Modal.setAppElement('#yourAppElement');
      setModal(true);
    }
    const caseUrl = authenticated ? 'bronze' : 'demo';
    switch (window.location.pathname) {
      case '/SteamKeys':
        fetchApi(`/cases/${caseUrl}`, {
          method: 'POST',
          credentials: 'include',
        }).then(res => {
          dispatch({ type: 'setCase', payload: res.encrypted });
        });
        break;
      case params.match.url:
        fetchApi(`/cases/${params.match.params.name}`, {
          method: 'POST',
          credentials: 'include',
        }).then(res => {
          dispatch({ type: 'setCase', payload: res.encrypted });
        });
        break;
      default:
        break;
    }
  }, [authenticated, params.match.url]);

  return (
    <React.Fragment>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        // onAfterOpen={this.afterOpenModal}
        // onRequestClose={this.closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="header">
          <h1>Внимание!!!</h1>
        </div>
        <div className="body">
          <div className="text">
            В этом кейсе существует контент для взрослых, пожалуйста если вы
            меньше 18 просим вас покинуть данный раздел.
            <span>Игры из этого кейса не входят в Лайв ленту</span>
          </div>
        </div>
        <div className="actions">
          <button className="success" onClick={() => setModal(false)}>
            Мне 18 или больше
          </button>
          <button
            className="danger"
            onClick={() => params.history.push('/SteamKeys')}
          >
            Мне меньше 18
          </button>
        </div>
      </Modal>
      <div className="game">
        {(authenticated || (!authenticated && cases)) && (
          <div className="main-width game_holder">
            {winner ? (
              <div className="winner">
                <h1>
                  {translate('youWon')} - {winner.name}
                </h1>
                <img
                  className="animated pulse"
                  src={images[winner.img]}
                  alt={winner.name}
                />
                {(cases.type === 'demo' && demoOpen) ||
                (!authenticated && cases.type !== 'demo') ? (
                  <div className="notLogged">
                    <h2 className="needAuth">{translate('needAuth')}</h2>
                    <div className="actions">
                      <button className="auth" onClick={authSteam()}>
                        <FaSteam />
                        {translate('login')} <span>steam</span>
                      </button>
                      <button className="auth" onClick={authSteam()}>
                        <FaVk />
                        {translate('login')} <span>vk</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="actions">
                    <button onClick={tryAgain()} className="tryAgain">
                      {translate('tryAgain')}
                    </button>
                    <Link to="/SteamKeys/profile" href="/SteamKeys/profile">
                      {(winner.name === 'other' ||
                        (winner.type === 'bronze' ||
                          winner.type === 'metalliic' ||
                          winner.type === 'silver' ||
                          winner.type === 'gold')) &&
                        'Продать или '}
                      Взять ключ можно в профиле
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="game_inner">
                <h1>{translate('tryYourLuck')}</h1>
                <div className="spinner_holder">
                  <img src={point} alt="point" className="point" />

                  <div className="spinner" id="spinner">
                    <div
                      className="list"
                      id="list"
                      style={{
                        transform: `matrix(1, 0, 0, 1, ${matrix},0)`,
                        transition:
                          'all 5.5s cubic-bezier(0.32, 0.64, 0.45, 1) -0ms',
                      }}
                    >
                      {count.map((k, i) => (
                        <Item key={i} />
                      ))}
                    </div>
                  </div>
                </div>

                {authenticated && user && cases && !caseOpening && (
                  <div className="action">
                    {user.balance >= cases.priceRUB ? (
                      <button className="btn" onClick={openCase()}>
                        {`Открыть кейс за ${cases.priceRUB}₽`}
                      </button>
                    ) : (
                      <React.Fragment>
                        <div className="text">
                          Цена кейса: <span>{cases.priceRUB}₽</span>
                        </div>
                        <button className="btn" onClick={addBalance()}>
                          {translate('addBalance')}
                        </button>
                      </React.Fragment>
                    )}
                  </div>
                )}
                {!authenticated &&
                  cases &&
                  !caseOpening &&
                  cases.type === 'demo' && (
                    <div className="action">
                      <button className="btn" onClick={openCase()}>
                        {translate('demoCase')}
                      </button>
                    </div>
                  )}

                {!authenticated &&
                  ((cases.type === 'demo' && demoOpen && winner) ||
                    cases.type !== 'demo') && (
                    <div className="notLogged">
                      {cases.type !== 'demo'}
                      <h2 className="needAuth">{translate('needAuth')}</h2>
                      <div className="actions">
                        <button className="auth" onClick={authSteam()}>
                          <FaSteam />
                          {translate('login')} <span>steam</span>
                        </button>
                        <button className="auth" onClick={authSteam()}>
                          <FaVk />
                          {translate('login')} <span>vk</span>
                        </button>
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        )}
      </div>
      {cases &&
        cases.type !== 'demo' &&
        window.location.pathname !== '/SteamKeys' && (
          <div className="caseItems">
            <div className="main-width">
              <h1>Что можно выиграть</h1>
              <div className="caseOverview">
                {cases.data.map((item, i) => (
                  <div className="item" key={i}>
                    <p className="price">{item.priceRUB} ₽</p>
                    <img src={images[item.img]} alt={item.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </React.Fragment>
  );
};

export default Game;
