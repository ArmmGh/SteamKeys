/* eslint-disable indent */
import React, { useEffect } from 'react';
import Moment from 'react-moment';
import { useStateValue } from '../../context';
import fetchApi from '../../utils/fetchApi';
import './Profile.scss';

const Profile = () => {
  const [{ user, translate }] = useStateValue();

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
      body: JSON.stringify({ game }),
    });
    console.log(game);
  };

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
            {user.gameHistory.map((item, i) => (
              <div key={i} className="gameItem">
                <div className="order">{item.order}</div>
                <div className="name">{item.name}</div>
                {item.action === 'waiting' ? (
                  <div className="action">
                    {(item.caseType === 'bronze' ||
                      item.caseType === 'metallic' ||
                      item.caseType === 'silver' ||
                      item.caseType === 'gold') && (
                      <button className="btn" onClick={sellGame(item)}>
                        Sell for 9
                      </button>
                    )}
                    <button className="btn">Give a key</button>
                  </div>
                ) : (
                  ''
                )}
                <div className="date">
                  <Moment format="YYYY-MM-DD  HH:mm:ss" date={item.date} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
