import React, { useState, useEffect } from 'react';
import fetchApi from '../../utils/fetchApi';
import Item from './Item';
import { useStateValue } from '../../context';
import point from '../../assets/game-point.png';
import './Game.scss';

const Game = params => {
  const [{ user, authenticated, cases, socket }, dispatch] = useStateValue();
  const [matrix, setMatrix] = useState(0);
  const [winner, setWinner] = useState(null);

  function importAll(r) {
    const images = {};
    // eslint-disable-next-line array-callback-return
    r.keys().map((item, index) => {
      images[item.replace('./', '').replace('.png', '')] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context('../../assets/slots', false, /\.(png|jpe?g|svg)$/),
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
    PerformAction(cases)
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
          socket.emit('opened case', {
            game: res,
          });
        }, 5500),
      );
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
    <div className="game">
      <div className="main-width game_holder">
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
                  transition: 'all 5.5s cubic-bezier(0.32, 0.64, 0.45, 1) -0ms',
                  // transitionDuration: `${transition}s`,
                }}
              >
                {count.map((k, i) => (
                  <Item key={i} />
                ))}
              </div>
            </div>
          </div>
          {winner && <h2>{winner.name}</h2>}
          <div className="action">
            <button className="btn" onClick={openCase()}>
              Open case
            </button>
          </div>
        </div>
      </div>
      <div className="caseItems">
        <div className="main-width">
          {window.location.pathname !== '/' &&
            window.location.pathname === params.match.url && (
              <div className="caseOverview">
                {cases &&
                  cases.map((item, i) => (
                    <div className="item" key={i}>
                      <p className="price">{item.priceRUB} ₽</p>
                      <img src={images[item.img]} alt={item.name} />
                    </div>
                  ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Game;
