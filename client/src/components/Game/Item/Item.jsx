import React, { useState } from 'react';
import fetchApi from '../../../utils/fetchApi';
import { useStateValue } from '../../../context';
import './Item.scss';

const Item = () => {
  const [{ user, authenticated }] = useStateValue();

  function importAll(r) {
    const images = {};
    // eslint-disable-next-line array-callback-return
    r.keys().map((item, index) => {
      images[item.replace('./', '').replace('.png', '')] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context('../../../assets', false, /\.(png|jpe?g|svg)$/),
  );

  const actionCase = [
    {
      name: 'overwatch',
      price: 1999,
      chance: 90,
      img: 'overwatch',
    },
    {
      name: 'minecraft',
      price: 1900,
      chance: 2,
      img: 'minecraft',
    },
    {
      name: 'battlefield1',
      price: 1499,
      chance: 5,
      img: 'bf',
    },
    {
      name: 'pubg',
      price: 1399,
      chance: 3,
      img: 'pubg',
    },
  ];
  return actionCase.map((item, i) => (
    <div key={i} className={`item ${item.img}`}>
      <img src={images[item.img]} alt="" />
    </div>
  ));
};

export default Item;
