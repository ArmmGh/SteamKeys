/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Route, Redirect, useParams } from 'react-router-dom';
import { useStateValue } from '../../context';
import Header from '../Header';
import Livedrop from '../Livedrop';
import Footer from '../Footer';
import fetchApi from '../../utils/fetchApi';
import './App.scss';
import Table from '../Table';
import Adding from '../Adding';
import Out from '../Out';
import Invest from '../Invest';
import Cabinet from '../Cabinet';
import Menu from '../Menu';
import Check from '../Check';
import In from '../In';
import Pay from '../Pay';

function App() {
  const [{ user, socket, authenticated }, dispatch] = useStateValue();

  const getGames = () => {
    fetchApi('/games', {
      method: 'GET',
      credentials: 'include',
    }).then(payload => {
      dispatch({ type: 'setGames', payload: payload.encrypted });
    });
  };
  const getUser = info => {
    getFetch();
    dispatch({ type: 'getUser', payload: info });
  };
  const getFetch = () => {
    fetchApi('/user', { method: 'GET', credentials: 'include' })
      .then(res => res)
      .then(data => {
        fetchApi('/login', {
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
    const query = new URLSearchParams(window.location.search)
    const num = query.get('r');
      if(num == null){
        console.log('null')
      }else{
        console.log(num)
      }
    userCheck
      ? getUser({
          user: jwtDecode(userCheck),
          fromStorage: true,
          token,
        })
      : getFetch();
    getFetch();
    getGames();
  }, []);

  return (
    <div>
      <Header />
      <Livedrop />
      <main>
        {authenticated ? (
          <Route path="/pay" component={Pay} />
        ) : (
          <Route path="/pay" component={<Redirect to="/" />} />
        )}
        <Route path="/pay" component={Pay} />
        <Route path="/in" component={In} />
        <Route path="/check" component={Check} />
        <Route path="/callback" component={Menu} />
        <Route path="/cabinet" component={Cabinet} />
        <Route path="/invest" component={Invest} />
        <Route path="/output" component={Out} />
        <Route path="/adding" component={Adding} />
        <Route path="/table" component={Table} />
        <Route exact path="/" component={Table} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
