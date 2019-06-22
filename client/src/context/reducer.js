import EN from './../trans/en.json';
import RU from './../trans/ru.json';

const translations = {
  en: EN,
  ru: RU,
};
const getTranslate = langCode => key => translations[langCode][key] || key;
export default (state, action) => {
  switch (action.type) {
    case 'getUser':
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
    case 'setCase':
      return {
        ...state,
        cases: action.payload,
      };
    // case 'updateLive':
    //   if (action.payload.fromDb) {
    //     return {
    //       ...state,
    //       livedrop: [...action.payload, ...state.livedrop],
    //     };
    //   }
    //   if (state.livedrop.length >= 10) {
    //     state.livedrop.pop();
    //   }
    //   console.log(state);
    //   return {
    //     ...state,
    //     livedrop: [action.payload, ...state.livedrop],
    //   };
    default:
      return state;
  }
};
