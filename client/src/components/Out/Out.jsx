import React, { useState } from 'react';
import Menu from '../Menu/index';
import Table from '../Table/index';
import log from '../../assets/profile/payeer-logo.png';
import get from '../../assets/profile/get.png';
import adv from '../../assets/profile/adv.png';
import perf from '../../assets/profile/perfect.jpg';
import qiwi from '../../assets/profile/qiwi.png';
import { useStateValue } from '../../context';
import './Out.scss';


const Out = () =>{    
    const [
        { user }
      ] = useStateValue();
    return(
        <React.Fragment>
        <div className="addcontainer">
            <div className="alladd">
                <Menu />
                <div className="design">
                    <img src={get} alt="money"/>
                </div>
        <div className="paymethod">
            <div className="amount">
            <p>Укажите сумму, которую хотите вывести</p>
    <span>Максимум: {user.balance}</span>
            </div>
            <div className="suminput">
                <input type="text" defaultValue={user.balance}/>
            </div>
        <div className="imgholder">
            <button><img src={log} alt="payeer" /></button>
            <button><img src={qiwi} alt="qiwi" /></button>
        </div>
        </div>
        <div className="tabl">
            <div className="header">
                <h3>История Выплат</h3>
            </div>
            <Table />
        </div>
            </div>
                </div>
        </React.Fragment>
    )
}

export default Out;