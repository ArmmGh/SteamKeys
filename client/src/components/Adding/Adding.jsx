import React, { useState } from 'react';
import Menu from '../Menu/index';
import log from '../../assets/profile/payeer-logo.png';
import des from '../../assets/profile/money.png';
import { useStateValue } from '../../context';
import './Adding.scss';


const Adding = () =>{    
    const [
        { user }
      ] = useStateValue();
    return(
        <React.Fragment>
        <div className="addcontainer">
            <div className="alladd">
                <Menu />
                <div className="design">
                    <img src={des} alt="money"/>
                </div>
        <div className="paymethod">
            <div className="amount">
            <p>Укажите сумму, которую хотите вывести</p>
            <span>Максимум: {user.balance}</span>
            </div>
            <div className="suminput">
                <input type="text" />
            </div>
        <div className="imgholder">
            <img src={log} alt="payeer" />
        </div>
        </div>
            </div>
                </div>
        </React.Fragment>
    )
}

export default Adding;