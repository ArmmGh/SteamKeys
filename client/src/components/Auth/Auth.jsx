import React, { useState } from 'react';
import { FaSteam, FaVk } from 'react-icons/fa';
import { useStateValue } from '../../context';
import './Auth.scss';

const Auth = () => {
    const [
        { user, authenticated, translate, cases, socket },
        dispatch,
      ] = useStateValue();


    const url = window.location.origin.match('keyforu')
    ? 'https://steam-keys.herokuapp.com'
    : 'http://localhost:3000';

    const authSteam = () => e => {
      window.open(`${url}/steam`, '_self');
    };
    const authVk = () => e => {
      window.open(`${url}/vkontakte`, '_self');
    };
    return(
        <React.Fragment>
            <div className="alerting">
      <div className="alertinginfo">
          <div className="alertico">
            <IoMdAlert />
          </div>
          <div className="alertinfo">
            Войдите, чтобы продолжить.
          </div>
      </div>
        <div className="actions">
        <button className="auth" onClick={authSteam()}>
             <FaSteam />
                 {translate('login')} <span>steam</span>
        </button>
          <button className="auth" onClick={authVk()}>
          <FaVk />
          {translate('login')} <span>vk</span>
            </button>
        </div>
        </div>
        </React.Fragment>
    )
}


export default Auth;