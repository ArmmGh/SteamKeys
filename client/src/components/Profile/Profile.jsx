/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { MdPerson, MdInput, MdClose } from "react-icons/md";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import Modal from 'react-modal';
import { useStateValue } from '../../context';
import fetchApi from '../../utils/fetchApi';
import './Profile.scss';

const Profile = () => {
  const [{ user, translate }, dispatch] = useStateValue();
  const [count, setCount] = useState(10);
  const [showMore, setShowmore] = useState(false);
  const [disableButton, disableButtons] = useState(false);
  const [modalIsOpen, setModal] = useState(false);
  const [sum, setSum] = useState(1000);

  const logout = () => e => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    fetchApi('/logout', { method: 'GET', credentials: 'include' }).then(res => {
      if (!res.isLogged) {
        window.open(`${window.location.origin}/`, '_self');
      }
    });
  };

  const sellGame = game => e => {
    disableButtons(true);
    fetchApi('/sellgame', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...game }),
    }).then(data => {
      dispatch({ type: 'updateUser', payload: { ...data } });
      disableButtons(false);
    });
  };

  const getKey = game => e => {
    disableButtons(true);
    fetchApi('/getkey', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...game }),
    }).then(data => {
      dispatch({ type: 'updateUser', payload: { ...data } });
      disableButtons(false);
    });
  };

  const onShowMore = () => e => {
    if (showMore) {
      setCount(10);
      setShowmore(false);
    } else {
      setCount(user.gameHistory.length);
      setShowmore(true);
    }
  };

  const openModal = () => e => {
    setModal(true);
    setSum(1000);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <div className="profile">
        <div className="main-width">
          <div className="info">
            <h1 className="name">{user.username}</h1>
            <div className="avatar">
              <img src={user.imgurl} alt="" />
            </div>
            <div className="actions">
            <ul>
              <div className="profitem"><li>
                  <div className="ico"><GiPayMoney /></div>
                  <div className="infm">
                  <Link
                    to="/adding" href="adding">
                  пополнить
                   </Link>
                  </div>
                  </li></div>
               <div className="profitem"><li>
                   <div className="ico"><GiReceiveMoney /></div>
                   <div className="infm">
                   <Link to="/output" href="/output">
                   ввывести
                   </Link>
                   </div>
                   </li></div>
               <div className="profitem"><li>
                   <div className="ico"><GiTakeMyMoney /></div>
                   <div className="infm">
                   <Link to="/invest" href="/invest">
                 вкладивать
                   </Link>
                   </div>
                   </li></div>
               <div className="profitem"><li>
                   <div className="ico">
                       <MdPerson />
                   </div>
                   <div className="infm">
                   <Link to="/cabinet" href="/cabinet">
                   кабинет
                   </Link>
                   </div>
                   </li></div>
               <div className="profitem"><li>
                  <div className="ico">
                      <MdInput />
                   </div>
                  <div className="infm">
                  <Link to="/logout" href="/logout">
                  выход
                   </Link>
                 </div>
                 </li></div>
           </ul>
            </div>
            <div className="gamesHistory">
              <div className="tableHeader">
                <div className="order">#</div>
                <div className="name">Имя</div>
                <div className="action">Действие</div>
                <div className="date">Дата</div>
              </div>
              {user.gameHistory &&
                user.gameHistory.slice(0, count).map((item, i) => (
                  <div key={i} className="gameItem">
                    <div className="order">{item.order}</div>
                    <div className="name">
                      {item.name === 'other' ? 'Игра до 419 рублей' : item.name}
                    </div>
                    {item.key ? (
                      <div className="action">
                        <p>{item.key}</p>
                      </div>
                    ) : item.action === 'waiting' ? (
                      <div className="action">
                        {(item.caseType === 'bronze' ||
                          item.caseType === 'metallic' ||
                          item.caseType === 'silver' ||
                          item.caseType === 'gold' ||
                          item.name === 'other') && (
                          <button
                            disabled={disableButton}
                            className="btn"
                            onClick={sellGame(item)}
                          >
                            Продать за {item.sellPrice}
                          </button>
                        )}
                        <button
                          disabled={disableButton}
                          className="btn"
                          onClick={getKey(item)}
                        >
                          Взять ключ
                        </button>
                      </div>
                    ) : item.action === 'selled' ? (
                      <div className="action">
                        <p>Продано</p>
                      </div>
                    ) : item.action === 'key' ? (
                      <div className="action">
                        <p>{item.key || 'Wait For Key'}</p>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="date">
                      <Moment format="YYYY-MM-DD  HH:mm:ss" date={item.date} />
                    </div>
                  </div>
                ))}

              <button className="showMore" onClick={onShowMore()}>
                {showMore ? translate('showLess') : translate('showMore')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
