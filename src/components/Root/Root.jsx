import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './Root.scss';

class Root extends Component {
  constructor() {
    super();
    const url =
      location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : 'https://inchat-back.herokuapp.com';
    // this.socket = io(url, {
    //   transports: ['websocket', 'polling', 'flashsocket'],
    // });
  }

  render() {
    return <p>gqgqg</p>;
  }
}

export default hot(module)(Root);
