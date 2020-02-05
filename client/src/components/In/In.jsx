import React, { useState } from 'react';
import Modal from 'react-modal';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import Timer from 'react-compound-timer';
import Menu from '../Menu';
import fetchApi from '../../utils/fetchApi';
import { useStateValue } from '../../context';
import './In.scss';



const In = () => {
    const [
        { user, authenticated, translate, cases, socket },
        dispatch,
      ] = useStateValue();

      const [disableButton, disableButtons] = useState(false);

      const get = items => e => {
        disableButtons(true);
        fetchApi('/getmoney', {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...items, amount: (Math.floor(items.amount * 100) / 100) }),
            }).then(data => {
                dispatch({ type: 'updateUser', payload: { ...data } });
                disableButtons(false);
            })
            alert("Средства перечислен")
    }

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
                    {user.benefitHistory && (
                    <table className="table" id="table">
                        <tr>
                            <th>Сумма</th>
                            <th>Статус</th>
                            <th>Дата</th>
                        </tr>
                    {user.benefitHistory.map((items, index) => (
                        <tr className="items" key={index}>
                    <td>{(Math.floor(items.amount * 100) / 100)}</td>
                    <td id="geting">
                        {items.action === 'paid' ? (
                            <span>Выплачено</span>
                        ) : items.time <= new Date().getTime() && items.action === 'waiting' ? (
                            <button 
                            disabled={disableButton}
                            onClick={get(items)}>Получить</button>
                        ) : items.action === 'waiting' ? (
                            <Timer
                            initialTime={items.time - new Date().getTime()}
                            direction="backward"
                         >   
                            <Timer.Hours />:
                            <Timer.Minutes />:
                            <Timer.Seconds />
                        </Timer>
                        ) : (
                            ''
                        )
                    }
                    </td>
                    <td><Moment format="YYYY-MM-DD/HH:mm:ss" date={items.date} /></td>
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

export default In;