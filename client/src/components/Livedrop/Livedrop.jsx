/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import './Livedrop.scss';
import { useStateValue } from '../../context';

function Livedrop() {
  const [{ socket, livedrop }, dispatch] = useStateValue();
  function importAll(r) {
    const images = {};
    // eslint-disable-next-line array-callback-return
    r.keys().map((item, index) => {
      images[item.replace('./', '').replace('.png', '')] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context('../../assets/profile', false, /\.(png|jpe?g|svg)$/),
  );
  useEffect(() => {
    socket.on('update live', payload => {
      dispatch({ type: 'updateLive', payload });
    });
  }, []);
  return (
    <div className="livedrop">
      <h1>Last drops</h1>
      {livedrop && (
        <ul>
          {livedrop.map((item, index) => (
            <li className="item" key={index}>
              <img src={images[item.img]} alt={item.img} />
              <p className="fullname">{item.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Livedrop;
