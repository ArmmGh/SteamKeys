/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable space-before-function-paren */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tilt from 'react-tilt';
import fetchApi from '../../utils/fetchApi';
import { useStateValue } from '../../context';
import free from '../../assets/cases/free.png';
import './Cases.scss';

const Cases = ({ history }) => {
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

  // Autocomplete
  function autocomplete(inp, arr) {
    let currentFocus;
    inp.addEventListener('input', function(e) {
      let b;
      const val = this.value;
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      const a = document.createElement('DIV');
      a.setAttribute('id', `${this.id}autocomplete-list`);
      a.setAttribute('class', 'autocomplete-items');
      this.parentNode.appendChild(a);
      for (let i = 0; i < arr.length; i += 1) {
        if (
          arr[i].name.substr(0, val.length).toUpperCase() === val.toUpperCase()
        ) {
          b = document.createElement('DIV');
          b.classList.add('search_item_holder');
          b.innerHTML += `<img src="${images[arr[i].img]}" />`;
          b.innerHTML += `<p>
            <strong>${arr[i].name.substr(0, val.length)}</strong>
            ${arr[i].name.substr(val.length)}
          </p>`;
          b.innerHTML += `<input type='hidden' value='${arr[i].name}'>`;
          // eslint-disable-next-line no-loop-func
          b.addEventListener('click', function() {
            history.push(`/SteamKeys/case/${arr[i].url}`);
            inp.value = this.getElementsByTagName('input')[0].value;
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    inp.addEventListener('keydown', function(e) {
      let x = document.getElementById(`${this.id}autocomplete-list`);
      if (x) x = x.getElementsByTagName('div');
      if (e.keyCode === 40) {
        currentFocus += 1;
        addActive(x);
      } else if (e.keyCode === 38) {
        currentFocus -= 1;
        addActive(x);
      } else if (e.keyCode === 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      x[currentFocus].classList.add('autocomplete-active');
    }
    function removeActive(x) {
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove('autocomplete-active');
      }
    }
    function closeAllLists(elmnt) {
      const x = document.getElementsByClassName('autocomplete-items');
      for (let i = 0; i < x.length; i++) {
        if (elmnt !== x[i] && elmnt !== inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener('click', e => {
      closeAllLists(e.target);
    });
  }
  if (document.getElementById('myInput')) {
    autocomplete(document.getElementById('myInput'), games);
  }

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
          <form className="search" autoComplete="off">
            <div className="autocomplete">
              <input
                id="myInput"
                type="text"
                name="myCountry"
                placeholder="Поиск игры..."
              />
            </div>
          </form>
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

export default withRouter(Cases);
