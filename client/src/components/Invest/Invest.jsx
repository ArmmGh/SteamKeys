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
      const [vib, setVib] = useState('');
      const [disableButton, disableButtons] = useState(false);
      const [disble, setDisble] = useState(false);
      const [storage, setStorage] = useState(user.walletp)
      const [amount, setAmount] = useState(0);
      const [amountplus, setAmountplus] = useState(0)

      const handeleChange = val => {
        if (val.match(/^([1-9][0-9.]*)*$/)) {
            const start = parseFloat(val);
            const tax = Math.floor(start * 0.2 * 100) / 100 + start;
            const end = Math.round(tax * 100) / 100;
            setAmount(val)
            if(isNaN(start)){
              setAmountplus(0)
            }else{
              setAmountplus(end)
            }
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
            disableButtons(true)
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
                    window.location.reload();
                    disableButtons(false) 
                  })    
                    }else{
                        alert("Недостаточно средств")
                    }
                }else{
                    alert("Поле не может быть пустым")
                }
        }
            }else{
                alert("С начала пополнитье баланс")
            }
    }
    return(
        <React.Fragment>
          {!authenticated ? (
              <Auth />
          ) : (
        <React.Fragment>
        <Menu />
        <div className="cont">
          <div className="cont1">
          <div className="sum">
            <h3>Вкладу</h3>
            <input type="text" value={amount} onChange={e => handeleChange(e.target.value)}/>
          </div>
          <div className="sum">
            <h3>Получу</h3>
            <input type="text" value={amountplus} />
          </div>
          <div className="selection">
            <h3>Профит</h3>
          <select id="tiv" value={vib} onChange={e => setVib(e.target.value)}>
          <option value="100">20%</option>
          </select>
          </div>
          <div className="koch">
          <button disabled={disableButton} onClick={invest()}>Вложить</button>
          </div>
          <div className="note">
            <p>Сумма вклада будет вычислен <br/> 
                на баланс автоматически</p>
            <p>Чек вычислены можно найти <Link to="/" href="/">Здесь</Link></p>
          </div>
           </div>
         </div>
        </React.Fragment>
          )}
        </React.Fragment>
    )
}

export default Invest;