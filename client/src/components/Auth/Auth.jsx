import React, { useState } from 'react';
import { IoMdAlert } from "react-icons/io";
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

    return(
        <React.Fragment>
            <div className="alerting">
      <div className="alertinginfo">
          <div className="alertinfo">
            Войдите, чтобы продолжить.
          </div>
      </div>
        </div>
        </React.Fragment>
    )
}


export default Auth;