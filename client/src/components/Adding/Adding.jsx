import React, { useState } from 'react';
import Menu from '../Menu/index';
import Table from '../Table/index';
import log from '../../assets/profile/payeer-logo.png';
import des from '../../assets/profile/money.png';
import adv from '../../assets/profile/adv.png';
import perf from '../../assets/profile/perfect.jpg';
import qiwi from '../../assets/profile/qiwi.png';
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
            <p>Укажите сумму и способ пополнения</p>
            </div>
            <div className="suminput">
                <input type="text" defaultValue={user.balance}/>
            </div>
        <div className="imgholder">
            <img src={log} alt="payeer" />
            <img src={adv} alt="advacash" />
            <img src={perf} alt="perfect" />
            <img src={qiwi} alt="qiwi" />
        </div>
        </div>
        <div className="tabl">
            <div className="header">
                <h3>История Пополнении</h3>
            </div>
            <Table />
        </div>
            </div>
                </div>
        </React.Fragment>
    )
}

export default Adding;