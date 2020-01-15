import React, { useState } from 'react';
import Menu from '../Menu/index';
import log from '../../assets/profile/payeer-logo.png';
import get from '../../assets/profile/get.png';
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
        </div>
        <div className="addtable">
                {user.outHistory && (
                    <table className="table" id="tbl">
                    {user.outHistory.map((item, index) => (
                <tr className="items" key={index}>
                    <td>{item.amount}</td>
                    <td>{item.wallet}</td>
                    <td><Moment format="YYYY-MM-DD  HH:mm:ss" date={item.date} /></td>
                </tr>
                    ))}
                    </table>
                )}
                    </div>
            </div>
                </div>
        </React.Fragment>
    )
}

export default Out;