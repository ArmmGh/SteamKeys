import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-tilt';
import fetchApi from '../../utils/fetchApi';
import { useStateValue } from '../../context';
import free from '../../assets/cases/free.png';
import './Cases.scss';

const Cases = () => {
  const [{ user, translate, cases }, dispatch] = useStateValue();
  const [games, setgames] = useState([]);

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
    fetchApi('/games', { method: 'GET', credentials: 'include' }).then(res => {
      setgames([...res]);
    });
  }, []);
  const arr = [1, 2, 3];

  return (
    <div className="cases_holder">
      <div className="main-width">
        <h1>Keys</h1>
        <ul className="ourKeys">
          <li className="item">
            <Link to="/case/simple" href="/case/simple">
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
            <Link to="/case/lucky" href="/case/lucky">
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
        <ul className="gameKeys">
          {arr.map(() =>
            games.map((item, i) => (
              <Tilt key={i} className="Tilt">
                <li className="Tilt-inner item">
                  <div className="image">
                    <img src={images[item.img]} alt={item.name} />
                  </div>
                  <div className="info">
                    <div className="name">{item.name}</div>
                    <div className="price">{item.priceRUB}₽</div>
                  </div>
                </li>
              </Tilt>
            )),
          )}
        </ul>
      </div>
    </div>
  );
};

export default Cases;
