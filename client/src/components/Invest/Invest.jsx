import React, { useReducerm, useState } from 'react';
import Menu from '../Menu/index';
import Timer from 'react-compound-timer';
import { ToastContainer, toast } from 'react-toastify';
import Moment from 'react-moment';
import investlog from '../../assets/profile/invest.png';
import fetchApi from '../../utils/fetchApi';
import './Invest.scss';
import '../toast/toast.scss';
import { useStateValue } from '../../context';


const Invest = () =>{
    const [
        { user, authenticated, translate, cases, socket },
        dispatch,
      ] = useStateValue();
      const [disableButton, disableButtons] = useState(false);
      const [storage, setStorage] = useState(user.walletp)
      const [amount, setAmount] = useState('');

      const handeleChange = val => {
        if (val.match(/^([1-9][0-9]*)*$/)) {
          setAmount(val);
        }
      };

    const get = items => e => {
        disableButtons(true);
        fetchApi('/getmoney', {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...items, amount: items.amount }),
            }).then(data => {
                dispatch({ type: 'updateUser', payload: { ...data } });
                disableButtons(false);
            })
            toast("Средства перечислен")
    }

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
            }else{
                toast("Недостаточно средств")
            }
        }else{
            toast("Поле не может быть пустым")
        }
    }
    return(
        <React.Fragment>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
            />
            <ToastContainer />
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
                        <div><input type="text" value={amount} onChange={e => handeleChange(e.target.value)} /></div>
                        <div className="btnholder"><button onClick={invest()}>Вкладивать</button></div>
                    </div>
                    <div className="tbleheader">
                        <h3>Вклады</h3>
                    </div>
                    <div className="addtable">
                {user.benefitHistory && (
                    <table className="table" id="tbl">
                        <tr>
                            <th>Сумма</th>
                            <th>Статус</th>
                            <th>Дата</th>
                        </tr>
                    {user.benefitHistory.map((items, index) => (
                        <tr className="items" key={index}>
                    <td>{items.amount}</td>
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