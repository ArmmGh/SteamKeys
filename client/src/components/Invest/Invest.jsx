import React, { useReducerm, useState } from 'react';
import Menu from '../Menu/index';
import Timer from 'react-compound-timer';
import Moment from 'react-moment';
import investlog from '../../assets/profile/invest.png';
import fetchApi from '../../utils/fetchApi';
import './Invest.scss';
import { useStateValue } from '../../context';


const Invest = () =>{
    const [
        { user, authenticated, translate, cases, socket },
        dispatch,
      ] = useStateValue();
      const [storage, setStorage] = useState(user.walletp)
      const [amount, setAmount] = useState('');

      const handeleChange = val => {
        if (val.match(/^[0-9]+$/)) {
          setAmount(val);
        }
      };

    const invest = () => e => {
        if (amount !== ''){
            if(user.balance >= amount){
            fetchApi('/setbenefit', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount}),
          }).then(fetchApi('/benefit', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rub: amount, wallet: user.walletp }),
          }))
            }
        }
    }
    return(
        <React.Fragment>
            <Menu />
            <div className="investcontainer">
                <div className="investall">
                    <div className="investlog">
                        <img src={investlog} alt="invest" />
                    </div>
                    <div className="txt">
                        <p>Укажите сумму, которую хотите вкладивать</p>
                        <span>Максимум: {user.balance}</span>
                    </div>
                    <div className="sumbit">
                    <form>
                        <div><input type="text" value={amount} onChange={e => handeleChange(e.target.value)} /></div>
                        <div className="btnholder"><button onClick={invest()}>Вкладивать</button></div>
                    </form>
                    </div>
                    <div className="tbleheader">
                        <h3>Вклады</h3>
                    </div>
                    <div className="addtable">
                {user.benefitHistory && (
                    <table className="table" id="tbl">
                    {user.benefitHistory.reverse().map((items, index) => (
                        <tr className="items" key={index}>
                    <td>{items.amount}</td>
                    <td id="geting">
                        {items.time <= new Date().getTime() && items.action === 'waiting' ? (
                            <button onClick={
                                fetchApi('/getmoney', {
                                    method: 'POST',
                                    credentials: 'include',
                                    headers: {
                                    'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ ...items, amount: items.amount }),
                                    }).then(data => {
                                        dispatch({ type: 'updateUser', payload: { ...data } });
                                       })
                            }>Получить</button>
                        ) : items.action === 'waiting' ? (
                        <Timer
                           initialTime={items.time - new Date().getTime()}
                           direction="backward"
                        >   
                           <Timer.Hours />:
                           <Timer.Minutes />:
                           <Timer.Seconds />
                       </Timer>
                        ) : items.action === 'paid' ? (
                            <span>Выплачено</span>
                        ) : (
                            ''
                        )
                    }
                    </td>
                    <td><Moment format="YYYY-MM-DD  HH:mm:ss" date={items.date} /></td>
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

export default Invest;