import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import io from 'socket.io-client';
import { StateProvider } from '../../context';
import App from '../App';
import EN from '../../trans/en.json';
import RU from '../../trans/ru.json';

const Root = () => {
  const storageLang = window.localStorage.getItem('lang');
  const browserLang =
    window.navigator.language.substring(0, 2) ||
    window.navigator.userLanguage.substring(0, 2);
  if (storageLang !== browserLang) {
    window.localStorage.setItem('lang', browserLang);
  }
  const translations = {
    en: EN,
    ru: RU,
  };
  const getTranslate = langCode => key =>
    translations[langCode === 'ru' ? 'ru' : 'en'][key] || key;

  const initialState = {
    user: {},
    token: null,
    authenticated: false,
    langCode: browserLang,
    translate: getTranslate(browserLang),
    socket: io(
      `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
    ),
    livedrop: [],
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
