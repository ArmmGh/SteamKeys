/* eslint-disable indent */
import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { Switch, Route } from 'react-router-dom';
import { useStateValue } from '../../context';
import Header from '../Header';
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

  return (
    <div className="profile">
      <div className="main-width">
        <div className="info">
          <div className="name">
            <p>{user.username}</p>
          </div>
          <div className="avatar">
            <img src={user.imgurl} alt="" />
          </div>
          <div className="actions">
            <button className="auth">{translate('add_balance')}</button>
            <button className="auth" onClick={logout()}>
              Logout
            </button>
          </div>
          <div className="games">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
