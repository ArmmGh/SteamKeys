/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useStateValue } from '../../context';
import fetchApi from '../../utils/fetchApi';
import './Profile.scss';

const Profile = () => {
  const [{ user, translate }, dispatch] = useStateValue();
  const [count, setCount] = useState(10);
  const [showMore, setShowmore] = useState(false);

  const logout = () => e => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    fetchApi('/auth/logout', { method: 'GET', credentials: 'include' }).then(
      res => {
        if (!res.isLogged) {
          window.open(`${window.location.origin}/`, '_self');
        }
      },
    );
  };

  const sellGame = game => e => {
    fetchApi('/sellgame', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...game }),
    }).then(data => {
      dispatch({ type: 'updateUser', payload: { ...data } });
    });
  };

  const getKey = game => e => {
    fetchApi('/getkey', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...game }),
    }).then(data => {
      dispatch({ type: 'updateUser', payload: { ...data } });
    });
  };

  const onShowMore = () => e => {
    if (showMore) {
      setCount(15);
      setShowmore(false);
    } else {
      setCount(user.gameHistory.length);
      setShowmore(true);
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="profile">
      <div className="main-width">
        <div className="info">
          <h1 className="name">{user.username}</h1>
          <div className="avatar">
            <img src={user.imgurl} alt="" />
          </div>
          <div className="actions">
            <button className="auth">{translate('add_balance')}</button>
            <button className="auth" onClick={logout()}>
              Logout
            </button>
          </div>
          <div className="gamesHistory">
            <div className="tableHeader">
              <div className="order">#</div>
              <div className="name">Name</div>
              <div className="action">Action</div>
              <div className="date">Data</div>
            </div>
            {user.gameHistory.slice(0, count).map((item, i) => (
              <div key={i} className="gameItem">
                <div className="order">{item.order}</div>
                <div className="name">{item.name}</div>
                {item.key ? (
                  <div className="action">
                    <p>{item.key}</p>
                  </div>
                ) : item.action === 'waiting' ? (
                  <div className="action">
                    {(item.caseType === 'bronze' ||
                      item.caseType === 'metallic' ||
                      item.caseType === 'silver' ||
                      item.caseType === 'gold') && (
                      <button className="btn" onClick={sellGame(item)}>
                        Sell for {item.sellPrice}
                      </button>
                    )}
                    <button className="btn" onClick={getKey(item)}>
                      Give a key
                    </button>
                  </div>
                ) : item.action === 'selled' ? (
                  <div className="action">
                    <p>Selled</p>
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
  );
};

export default Profile;
