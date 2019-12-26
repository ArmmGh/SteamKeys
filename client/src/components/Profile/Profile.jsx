/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Menu from '../Menu/index';
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
            <Menu />
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
