/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable space-before-function-paren */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FiSettings, FiPlusCircle } from 'react-icons/fi';
import { FaSteam, FaVk } from 'react-icons/fa';
import { useStateValue } from '../../context';
import './Header.scss';

const Header = ({ history }) => {
  const [{ user, games, authenticated, translate }, dispatch] = useStateValue();
  const url = window.location.origin.match('github')
    ? 'https://steam-keys.herokuapp.com'
    : 'http://localhost:3000';
  const authSteam = () => e => {
    window.open(`${url}/auth/steam`, '_self');
  };

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
          </p>`;
          b.innerHTML += arr[i].name.substr(val.length);
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
    <header>
      <div className="main-width">
        <div className="header_holder">
          <ul className="nav">
            <li>
              <Link to="/SteamKeys/" href="/SteamKeys/">
                {translate('homepage')}
              </Link>
            </li>
            <li>
              <Link to="/SteamKeys/roulette" href="/SteamKeys/roulette">
                {translate('reviews')}
              </Link>
            </li>
            <li>
              <Link to="/roulette" href="/roulette">
                {translate('faqAndGuarant')}
              </Link>
            </li>
            <li>
              <Link to="/roulette" href="/roulette">
                {translate('xujanKeys')}
              </Link>
            </li>
            <li>
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
            </li>
          </ul>
          <div className="actions">
            {authenticated ? (
              <React.Fragment>
                <div className="balance">
                  <p>
                    {translate('balance')}: <span>{user.balance}</span>
                  </p>
                  <FiPlusCircle />
                </div>
                <div className="avatar">
                  <Link to="/SteamKeys/profile" href="/profile">
                    <img src={user.imgurl} alt="" />
                  </Link>
                </div>
                <div className="settings">
                  <Link to="/SteamKeys/profile" href="/profile">
                    <FiSettings />
                    <p>{translate('profile')}</p>
                  </Link>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button className="auth" onClick={authSteam()}>
                  <FaSteam />
                  {translate('login')} <span>steam</span>
                </button>
                <button className="auth" onClick={authSteam()}>
                  <FaVk />
                  {translate('login')} <span>vk</span>
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
