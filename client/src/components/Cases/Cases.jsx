import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-tilt';
import fetchApi from '../../utils/fetchApi';
import { useStateValue } from '../../context';
import free from '../../assets/cases/free.png';
import './Cases.scss';

const Cases = () => {
  const [{ user, translate, games, cases }, dispatch] = useStateValue();

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
  useEffect(() => {}, []);

  return (
    <div className="cases_holder">
      <div className="main-width">
        <h1>Keys</h1>
        <ul className="ourKeys">
          <li className="item">
            <Link to="/SteamKeys/case/bomj" href="/SteamKeys/case/bomj">
              <div className="image">
                <img src={free} alt="free" />
              </div>
              <div className="info">
                <div className="name">Bomj</div>
                <div className="price">0₽</div>
              </div>
            </Link>
          </li>
          <li className="item">
            <Link to="/SteamKeys/case/simple" href="/SteamKeys/case/simple">
              <div className="image">
                <img src={free} alt="free" />
              </div>
              <div className="info">
                <div className="name">Simple Key</div>
                <div className="price">99₽</div>
              </div>
            </Link>
          </li>
          <li className="item">
            <Link to="/SteamKeys/case/lucky" href="/SteamKeys/case/lucky">
              <div className="image">
                <img src={free} alt="" />
              </div>
              <div className="info">
                <div className="name">Lucky Key</div>
                <div className="price">259₽</div>
              </div>
            </Link>
          </li>
          <li className="item">
            <div className="image">
              <img src={free} alt="" />
            </div>
            <div className="info">
              <div className="name">Elite Key</div>
              <div className="price">399₽</div>
            </div>
          </li>
        </ul>
        <div className="gameKeysHolder">
          <h1>{translate('chooseGame')}</h1>
          <ul className="gameKeys">
            {games.length &&
              games.map((item, i) => (
                <Tilt key={i} className="Tilt">
                  <Link
                    to={`/SteamKeys/case/${item.url}`}
                    href={`/SteamKeys/case/${item.url}`}
                  >
                    <li className="Tilt-inner item">
                      <div className="image">
                        <img src={images[item.img]} alt={item.name} />
                      </div>
                      <div className="info">
                        <div className="name">{item.name}</div>
                        <div className="price">{item.priceRUB}₽</div>
                      </div>
                    </li>
                  </Link>
                </Tilt>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cases;
