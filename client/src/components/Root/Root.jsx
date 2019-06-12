/* eslint-disable indent */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { hot } from 'react-hot-loader';
import './Root.scss';
import Header from '../Header';
import fetchApi from '../../utils/fetchApi';

class Root extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      token: null,
    };

    this.loginSteam = this.loginSteam.bind(this);
  }
  componentWillMount() {
    const userCheck = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('token');
    // eslint-disable-next-line no-unused-expressions
    userCheck
      ? this.getUser({
          user: jwtDecode(userCheck),
          fromStorage: true,
          token,
        })
      : this.getFetch();
    // if (window.location.pathname !== '/crash') {
    //   this.props.history.push('/roulette');
    // }
  }
  getUser(info) {
    console.log(info);
  }
  getFetch() {
    fetchApi('/user', { method: 'GET' })
      .then(res => res.data)
      .then(data => {
        console.log(data);
        fetchApi('/login', { method: 'POST', data })
          .then(res => res.data)
          .then(info => {
            if (info.user) {
              window.localStorage.setItem('user', info.user);
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
          });
      });
  }

  loginSteam() {}

  render() {
    return (
      <div>
        {/* <Header /> */}
        <main>
          {/* <Route path="/roulette" component={RollContainer} />
          <Route path="/crash" component={Crash} /> */}
        </main>
      </div>
    );
  }
}

export default hot(module)(Root);
