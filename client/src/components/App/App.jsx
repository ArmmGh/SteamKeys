/* eslint-disable indent */
import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useStateValue } from '../../context';
import Header from '../Header';
import fetchApi from '../../utils/fetchApi';

function App() {
  const [{ user }, dispatch] = useStateValue();

  const getUser = info => {
    dispatch({ type: 'GET_USER', payload: info });
  };
  const getFetch = () => {
    fetchApi('/auth/user', { method: 'GET', credentials: 'include' })
      .then(res => res.data)
      .then(data => {
        fetchApi('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then(info => {
          console.log(info);
          if (info.isLoggedIn) {
            if (info.user) {
              window.localStorage.setItem('user', info);
              window.localStorage.setItem('token', info.token);
            }
            const infoUser = jwtDecode(info.user);
            const infoData = info;
            infoData.user = infoUser;
            this.getUser({
              user: infoData.user,
              fromStorage: true,
              token: infoData.token,
            });
          }
        });
      });
  };
  // console.log(user);
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
  });

  return (
    <div>
      <Header />
      <main />
    </div>
  );
}

export default App;
