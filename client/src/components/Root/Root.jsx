import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import { StateProvider } from '../../context';
import App from '../App';
import EN from '../../trans/en.json';
import RU from '../../trans/ru.json';

const Root = () => {
  const translations = {
    en: EN,
    ru: RU,
  };
  const getTranslate = langCode => key => translations[langCode][key] || key;
  const initialState = {
    user: {},
    token: null,
    authenticated: false,
    langCode: 'en',
    translate: getTranslate('en'),
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
