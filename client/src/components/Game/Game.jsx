import React, { useState, useEffect } from 'react';
import { FaSteam, FaVk } from 'react-icons/fa';
import fetchApi from '../../utils/fetchApi';
import Item from './Item';
import { useStateValue } from '../../context';
import point from '../../assets/game-point.png';
import './Game.scss';

const Game = params => {
  const [
    { authenticated, translate, cases, socket },
    dispatch,
  ] = useStateValue();
  const [matrix, setMatrix] = useState(0);
  const [winner, setWinner] = useState(null);
  const [caseOpening, setOpening] = useState(false);
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
      images[item.replace('./', '').replace('.png', '')] = r(item);
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

        return res;
      })
      .then(res =>
        setTimeout(() => {
          setWinner(res);
          setOpening(false);
          socket.emit('opened case', {
            game: res,
          });
        }, 5500),
      );
  };

  const tryAgain = () => e => {
    // If balance
    setWinner(null);
    setMatrix(0);
  };

  useEffect(() => {
    switch (window.location.pathname) {
      case '/SteamKeys/':
        fetchApi('/cases/demo', {
          method: 'POST',
        }).then(res => {
          dispatch({ type: 'setCase', payload: res });
        });
        break;
      case params.match.url:
        fetchApi(`/cases/${params.match.params.name}`, {
          method: 'POST',
        }).then(res => {
          dispatch({ type: 'setCase', payload: res });
        });
        break;
      default:
        break;
    }
  }, []);

  return (
    <React.Fragment>
      <div className="game">
        {window.location.pathname === '/SteamKeys/' && (
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
                <button onClick={tryAgain()} className="tryAgain">
                  {translate('tryAgain')}
                </button>
              </div>
            ) : (
              <div className="game_inner">
                <h1>Испытай Удачу</h1>
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
                {!caseOpening && (
                  <div className="action">
                    <button className="btn" onClick={openCase()}>
                      Open case
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {window.location.pathname !== '/SteamKeys/' && cases && (
          <div className="caseInfo">
            <h1 className="gameName">{cases.name}</h1>
            <img src={profImages[cases.img]} alt={cases.name} />
          </div>
        )}
        {/* {window.location.pathname !== '/SteamKeys/' && authenticated && (
          // ruletka
        )} */}

        {window.location.pathname !== '/SteamKeys/' && !authenticated && (
          <div className="main-width">
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
          </div>
        )}
      </div>
      {window.location.pathname !== '/SteamKeys/' &&
        window.location.pathname === params.match.url && (
          <div className="caseItems">
            <div className="main-width">
              <div className="caseOverview">
                {cases &&
                  cases.data &&
                  cases.data.map((item, i) => (
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
