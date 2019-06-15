import React, { useState, useEffect } from 'react';
import fetchApi from '../../utils/fetchApi';
import Item from './Item';
import { useStateValue } from '../../context';
import bf from '../../assets/bf.png';
import minecraft from '../../assets/minecraft.png';
import overwatch from '../../assets/overwatch.png';
import './Game.scss';

const Game = () => {
  const [{ user, authenticated }] = useStateValue();
  const [transition, setTrans] = useState(0);
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
  const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];

  const actionCase = [
    {
      name: 'overwatch',
      price: 1999,
      chance: 50,
      img: 'overwatch',
    },
    {
      name: 'minecraft',
      price: 1900,
      chance: 25,
      img: 'minecraft',
    },
    {
      name: 'battlefield1',
      price: 1499,
      chance: 15,
      img: 'bf',
    },
    {
      name: 'pubg',
      price: 1399,
      chance: 10,
      img: 'pubg',
    },
  ];
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
    // Request backend for case
    PerformAction(actionCase)
      .then(res => {
        const elementLeft = document.querySelectorAll(`.${res.img}`)[7]
          .offsetLeft;
        const divLeft = document.getElementById('spinner').offsetLeft;
        const elementRelativeTop = elementLeft - (divLeft - 45);
        const minusPos = elementRelativeTop;
        setMatrix(matrix - minusPos);
        return res;
      })
      .then(res =>
        setTimeout(() => {
          setWinner(res);
        }, 3000),
      );
  };

  useEffect(() => {
    setTrans(transition + 3);
  }, []);

  return (
    <div className="game">
      <div className="spinner_holder">
        <div className="spinner" id="spinner">
          <div
            className="list"
            id="list"
            style={{
              transform: `matrix(1, 0, 0, 1, ${matrix},0)`,
              transitionDuration: `${transition}s`,
            }}
          >
            {count.map((k, i) => (
              <Item key={i} />
            ))}
          </div>
        </div>
        {winner && <h2>{winner.name}</h2>}
      </div>
      <div className="action">
        <button onClick={openCase()}>Open case</button>
      </div>
    </div>
  );
};

export default Game;
