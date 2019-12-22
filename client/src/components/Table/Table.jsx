import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tilt from 'react-tilt';
import { MdClose } from 'react-icons/md';
import otherCases from '../../utils/otherCases.json';
import fetchApi from '../../utils/fetchApi';
import { useStateValue } from '../../context';
import './Table.scss';

const Cases = ({ history }) => {
  const [{ user, translate, games, cases }, dispatch] = useStateValue();
  const [count, setCount] = useState(15);
  const [{ socket }] = useStateValue();
  const [benefit, setBenefit] = useState([]);
  const [showMore, setShowmore] = useState(false);
  const [hideAlert, toggleAlert] = useState(
    window.localStorage.getItem('closeAlert'),
  );

  function importAll(r) {
    const images = {};
    // eslint-disable-next-line array-callback-return
    r.keys().map((item, index) => {
      images[item.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '')] = r(
        item,
      );
    });
    return images;
  }

  const images = importAll(
    require.context('../../assets/profile', false, /\.(png|jpe?g|svg)$/),
  );

  const imagesCases = importAll(
    require.context('../../assets/cases', false, /\.(png|jpe?g|svg)$/),
  );

  const onShowMore = () => e => {
    if (showMore) {
      setCount(15);
      setShowmore(false);
    } else {
      setCount(cases.length);
      setShowmore(true);
    }
  };

  useEffect(() => {
    socket.emit('emit getbenefit');
    socket.on('get benefit', payload => {
      setBenefit([...payload]);
    });

    return () => {};
  }, []);

  useEffect(() => {
    socket.on('update benefitlive', payload => {
      if (payload.type !== 'xujan' && livedrop.length >= 10) {
        if (document.getElementById('helper')) {
          document.getElementById('helper').remove();
        }
        const elems = document.querySelectorAll('table#tbl tr');
        let lastElem;
        if (window.innerWidth >= 1616) {
          lastElem = elems[15];
        } else if (window.innerWidth >= 1456) {
          lastElem = elems[14];
        } else if (window.innerWidth >= 1296) {
          lastElem = elems[13];
        } else if (window.innerWidth >= 1136) {
          lastElem = elems[12];
        } else if (window.innerWidth >= 976) {
          lastElem = elems[11];
        } else if (window.innerWidth >= 816) {
          lastElem = elems[10];
        } else if (window.innerWidth >= 656) {
          lastElem = elems[9];
        } else if (window.innerWidth >= 486) {
          lastElem = elems[8];
        } else if (window.innerWidth >= 326) {
          lastElem = elems[7];
        } else {
          lastElem = elems[0];
        }
        const firstElem = elems[0];
        const newElem = document.createElement('tr');
        window.addEventListener('resize', () => {
          newElem.remove();
        });
        newElem.setAttribute('id', 'helper');
        newElem.classList.add('animated', 'helper');
        lastElem.classList.add('animated', 'fadeOutDown', 'hideElem');
        if (window.innerWidth < 1616) {
          lastElem.after(newElem);
        }
        lastElem.addEventListener('animationend', () => {
          firstElem.classList.add('animated', 'flipInX', 'showElem');
          newElem.classList.add('mainWidth', 'animated', 'widthDown');
          firstElem.addEventListener('animationend', () => {
            firstElem.classList.remove('animated', 'flipInX', 'showElem');
            newElem.remove();
          });
          lastElem.classList.remove('animated', 'fadeOutDown', 'hideElem');
          benefit.pop();
          setBenefit([payload, ...benefit]);
        });
      }
    });

    return () => {};
  }, [benefit]);

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
            history.push(`/case/${arr[i].url}`);
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

  const closeAlert = () => e => {
    toggleAlert(true);
    window.localStorage.setItem('closeAlert', true);
  };

  return (
    <div className="cases_holder">
      <div className="main-width">
        <h1>{translate('keys')}</h1>
        <ul className="ourKeys">
          {otherCases.map((item, i) => (
            <li key={i} className="item">
              <Link to={`/case/${item.url}`} href={`/case/${item.url}`}>
                <div className="image">
                  <img src={imagesCases[item.img]} alt={item.name} />
                </div>
                <div className="info">
                  <div className="name">
                    {translate(item.name)} {translate('key')}
                  </div>
                  <div className="price">{item.priceRUB}₽</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="gameKeysHolder">
          <h1>{translate('chooseGame')}</h1>
          {!hideAlert && (
            <div className="alert">
              <div className="close" onClick={closeAlert()}>
                <MdClose />
              </div>
              <div className="title">Внимание!!!</div>
              <div className="text">
                Нижние цены написано для одного открывания кейса
              </div>
            </div>
          )}
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
          <div className="addtable">
          {benefit && (
            <table className="table" id="tbl">
              {benefit.map((item, index) => (
                <tr className="item" key={index}>
              <td>{item.name}</td>
              <td>{item.rub}</td>
              <td>{item.wallet}</td>
                </tr>
              ))}
            </table>
          )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Cases);
