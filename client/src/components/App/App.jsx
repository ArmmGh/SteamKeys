/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Route } from 'react-router-dom';
import { useStateValue } from '../../context';
import Header from '../Header';
import Game from '../Game';
import Livedrop from '../Livedrop';
import fetchApi from '../../utils/fetchApi';
import Profile from '../Profile';
import Cases from '../Cases';
import './App.scss';

function App() {
  const [{ user, socket }, dispatch] = useStateValue();

  const getUser = info => {
    dispatch({ type: 'getUser', payload: info });
  };
  const getFetch = () => {
    fetchApi('/auth/user', { method: 'GET', credentials: 'include' })
      .then(res => res)
      .then(data => {
        fetchApi('/auth/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(res => res)
          .then(info => {
            if (info && info.isLogged) {
              if (info.user) {
                window.localStorage.setItem('user', JSON.stringify(info));
                window.localStorage.setItem('token', info.token);
              }
              const infoUser = jwtDecode(info.user);
              const infoData = info;
              infoData.user = infoUser;
              getUser({
                user: infoData.user,
                fromStorage: true,
                token: infoData.token,
              });
            }
          });
      });
  };

  useEffect(() => {
    const userCheck = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('token');
    // eslint-disable-next-line no-unused-expressions
    userCheck
      ? getUser({
          user: jwtDecode(userCheck),
          fromStorage: true,
          token,
        })
      : getFetch();
  }, []);

  return (
    <div>
      <Header />
      <Livedrop />
      <main>
        <Route path="/SteamKeys/profile" component={Profile} />
        <Route path="/SteamKeys/case/:name" component={Game} />
        <Route exact path="/SteamKeys/" component={Game} />
        <Route exact path="/SteamKeys/" component={Cases} />
      </main>
    </div>
  );
}

export default App;
