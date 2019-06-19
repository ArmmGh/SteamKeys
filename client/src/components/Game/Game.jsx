import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import fetchApi from '../../utils/fetchApi';
import Item from './Item';
import { useStateValue } from '../../context';
import point from '../../assets/game-point.png';
import './Game.scss';

const Game = () => {
  const [{ user, authenticated, cases }, dispatch] = useStateValue();
  const [matrix, setMatrix] = useState(0);
  const [winner, setWinner] = useState(null);

  // const actionCase = [
  //   { name: 'overwatch', price: 1999, chance: 0.1 },
  //   { name: 'minecraft', price: 1900, chance: 0.1 },
  //   { name: 'battlefield1', price: 1499, chance: 0.1 },
  //   { name: 'dayz', price: 1199, chance: 0.2 },
  //   { name: 'witcher3', price: 1199, chance: 0.6 },
  //   { name: 'csgo', price: 1020, chance: 0.1 },
  //   { name: 'gta5', price: 999, chance: 0.7 },
  //   { name: 'pubg', price: 949, chance: 0.8 },
  //   { name: 'quantumbreak', price: 699, chance: 0.9 },
  //   { name: 'rust', price: 649, chance: 0.9 },
  //   { name: 'payday2', price: 599, chance: 1 },
  //   { name: 'other', price: 399, chance: 85 },
  //   { name: 'portal2', price: 399, chance: 4 },
  //   { name: 'overwatch', price: 249, chance: 6 },
  // ];
  const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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
        }, 5500),
      );
  };

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        fetchApi('/cases/demo', { method: 'POST' }).then(res => {
          dispatch({ type: 'setCase', payload: res });
        });
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="game">
      <div className="main-width">
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
          <button onClick={openCase()}>Open case</button>
        </div>
      </div>
    </div>
  );
};

export default Game;
