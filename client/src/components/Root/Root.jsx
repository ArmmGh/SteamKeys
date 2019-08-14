import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import io from 'socket.io-client';
import fetchApi from '../../utils/fetchApi';
import App from '../App';
// import '../../../71520c5957f682a7807934a73c201932.txt';

const Root = () => {
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || ':3000';
  const ref = process.env.REF || 'http';

  const url = window.location.origin.match('keyforu')
    ? 'https://steam-keys.herokuapp.com'
    : 'http://localhost:3000';

  const initialState = {
    user: {},
    token: null,
    authenticated: false,
    langCode: browserLang,
    translate: getTranslate(browserLang),
    socket: io(url),
    games: [],
  };

  return (
    <Router>
      <StateProvider initialState={initialState}>
        <App />
      </StateProvider>
    </Router>
  );
};

export default hot(Root);
