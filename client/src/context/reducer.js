import EN from './../trans/en.json';
import RU from './../trans/ru.json';

const translations = {
  en: EN,
  ru: RU,
};
const getTranslate = langCode => key => translations[langCode][key] || key;
export default (state, action) => {
  switch (action.type) {
    case 'GET_USER':
      if (action.payload.fromStorage) {
        return {
          ...state,
          user: action.payload.user.user || action.payload.user,
          token: action.payload.token,
          authenticated: true,
        };
      }
      return { ...state };
    case 'setLanguage':
      return {
        ...state,
        langCode: action.payload,
        translate: getTranslate(action.payload),
      };
    default:
      return state;
  }
};
