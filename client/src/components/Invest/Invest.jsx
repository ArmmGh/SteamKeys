import React, { useReducerm, useState } from 'react';
import Menu from '../Menu/index';
import Timer from 'react-compound-timer';
import { MdClose } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import Moment from 'react-moment';
import investlog from '../../assets/profile/invest.png';
import fetchApi from '../../utils/fetchApi';
import './Invest.scss';
import '../toast/toast.scss';
import { useStateValue } from '../../context';
import { Link } from 'react-router-dom';
import Auth from '../Auth/index';


const Invest = () => {
    const [
        { user, authenticated, translate, cases, socket },
        dispatch,
      ] = useStateValue();
      const [disableButton, disableButtons] = useState(false);
      const [disble, setDisble] = useState(false);
      const [storage, setStorage] = useState(user.walletp)
      const [amount, setAmount] = useState('');
      const [hideAlert, toggleAlert] = useState(
        window.localStorage.getItem('closeAlertI'),
      );

      const handeleChange = val => {
        if (val.match(/^([1-9][0-9.]*)*$/)) {
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
            body: JSON.stringify({ ...items, amount: (Math.floor(items.amount * 100) / 100) }),
            }).then(data => {
                dispatch({ type: 'updateUser', payload: { ...data } });
                disableButtons(false);
            })
            toast("Средства перечислен")
    }

    const invest = () => res => {
            if(user.payment === 'yes'){
                if(user.walletp == '' || user.walletp == null){
                    toast("Сохраняйте кошелек в кабинет")
                }else{
                    if (amount !== ''){
                        if(user.balance >= amount){
                    setDisble(true);
                    fetchApi('/setbenefit', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount: (Math.floor(amount * 100) / 100)}),
                  }).then(data => {
                    dispatch({ type: 'updateUser', payload: { ...data } });
                    setDisble(false);
                    res.rub = amount;
                    res.wallet = user.walletp;
                    res.time = new Date();
                    socket.emit('done benefit', {
                     profit: res,
                    });
                    toast("Вклад принят")
                  })      
                    }else{
                        toast("Недостаточно средств")
                    }
                }else{
                    toast("Поле не может быть пустым")
                }
        }
            }else{
                toast("С начала пополнитье баланс")
            }
    }
    const closeAlert = () => e => {
        toggleAlert(true);
        window.localStorage.setItem('closeAlertI', true);
      };
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
          {!authenticated ? (
              <Auth />
          ) : (
            <React.Fragment>
            {!hideAlert && (
            <div className="alert">
              <div className="close" onClick={closeAlert()}>
                <MdClose />
              </div>
              <div className="title">Внимание!!!</div>
              <div className="text">
              Прежде чем вкладивать в проекте внимательно читайте <Link to="/agreement" href="/agreement">Правила</Link> и <Link to="/agreement" href="/agreement">Условия</Link> сайта.
              </div>
            </div>
          )}
            <Menu />
            <div className="investcontainer">
                <div className="investall">
                    <div className="investlog">
                        <img src={investlog} alt="invest" />
                    </div>
                    <div className="txt">
                        <p>Укажите сумму, которую хотите вкладивать</p>
                        <span>Минимум: 1</span>
                        <span>Максимум: {Math.floor(user.balance * 100) / 100}</span>
                    </div>
                    <div className="sumbit">
                        <div><input type="text" value={amount} onChange={e => handeleChange(e.target.value)} /></div>
                        <div className="btnholder"><button disabled={disble} onClick={invest()}>Вкладивать</button></div>
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
          )}
        </React.Fragment>
    )
}

export default Invest;