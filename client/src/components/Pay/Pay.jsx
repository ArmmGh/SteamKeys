import React, { useState } from 'react';
import Modal from 'react-modal';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import Timer from 'react-compound-timer';
import Menu from '../Menu';
import fetchApi from '../../utils/fetchApi';
import { useStateValue } from '../../context';
import './Pay.scss';


const Pay = () => {
    const [
        { user, authenticated, translate, cases, socket },
        dispatch,
      ] = useStateValue();
    return(
        <React.Fragment>
            <Menu />
            <div className="checkmain">
                <div className="checkall">
                    <div className="checkhead">
                        <div className="head"><Link to="/check" href="/check">ПОПОЛНЕНИЯ</Link></div>
                        <div className="br"></div>
                        <div className="head"><Link to="/in" href="/in">ВЫПЛАТА</Link></div>
                        <div className="br"></div>
                        <div className="head"><Link to="/in" href="/in">ВКЛАД</Link></div>
                    </div>
                    <div className="checktabl">
                    {user.outHistory && (
                    <table className="table" id="tbl">
                    <tr>
                    <th>Сумма</th>
                    <th>Кошелек</th>
                    <th>Дата</th>
                        </tr>
                    {user.outHistory.map((item, index) => (
                <tr className="items" key={index}>
                    <td>{item.amount}</td>
                    <td>{item.wallet}</td>
                    <td><Moment format="YYYY-MM-DD/HH:mm:ss" date={item.date} /></td>
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

export default Pay;
