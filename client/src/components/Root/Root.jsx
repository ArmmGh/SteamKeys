import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import { StateProvider } from '../../context';
import App from '../App';

const Root = () => {
  const initialState = {
    user: {},
    token: null,
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
