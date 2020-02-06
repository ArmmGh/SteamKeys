import React, { useState } from 'react';
import Modal from 'react-modal';
import Moment from 'react-moment';
import { MdClose } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import Menu from '../Menu/index';
import {Link} from 'react-router-dom';
import fetchApi from '../../utils/fetchApi';
import { useStateValue } from '../../context';
import '../toast/toast.scss';
import './Out.scss';
import Auth from '../Auth/index';


const Out = () =>{    
    const [
        { user, authenticated, translate, cases, socket },
        dispatch,
      ] = useStateValue();
    const [sel, setSel] = useState('');
    const [wallet, setWallet] = useState('');
    const [disableButton, disableButtons] = useState(false);
    const [modalIsOpen, setModal] = useState(false)
    const [amount, setAmount] = useState(Math.floor(user.balance * 100) / 100)

    const handeleChange = val => {
        if (val.match(/^([1-9][0-9.]*)*$/)) {
          const pars = parseFloat(val);
          if(isNaN(pars)){
            setAmount(100)
          }else{
          setAmount(val);
          }
        }
      };

    const handeleChangep = val => {
        if (val.match(/^([P][0-9]*)*$/)) {
          setWallet(val);
        }
      };

    const openModal = () => e => {
    if(user.walletp == '' || user.walletp == null){
        toast("С начала сохраняйте кошелек в кабинет")
    }else{
        if(amount == 0 || amount == ''){
            toast("Поле не может быть пустым")
        }else{
        if(user.payment === 'yes'){
            if(amount <= user.balance){
                setModal(true);
                }else{
                    toast("Недостаточно средств");
                }         
        }else{
            toast("С начала пополнитье баланс")
                }
             }
        }
    }
    const checkin = () => e =>{
        disableButtons(true);
        fetchApi('/outin', {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: (Math.floor(amount * 100) / 100), wallet: user.walletp }),
            }).then(data => {
                dispatch({ type: 'updateUser', payload: { ...data } });
            })
            window.location.reload()
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
        <Modal
        closeTimeoutMS={200}
        ariaHideApp={false}
        onRequestClose={() => setModal(false)}
        shouldCloseOnOverlayClick={true}
        isOpen={modalIsOpen}
        className="Modal"
        overlayClassName="OverlayHeader"
      >
          <div className="gener">
        <div className="header">
          <div />
          <h1>Выплата</h1>
          <div className="close">
            <MdClose onClick={() => setModal(false)} />
          </div>
        </div>
    <div className="body">
        <div className="modout">
            <div className="textout">
                <p>Сумма:</p>
                <p>Кошелек:</p>
            </div>
            <div className="infout">
                <div className="preinfo">
                <span>{Math.floor(amount * 100) / 100}</span>
                <span>{user.walletp}</span>
                </div>
            </div>
            </div>
          <div className="informik">
            <form>
            <div className="formik"><button onClick={() => {alert("exp")}} disabled={disableButton}>Получить</button></div>
            </form>
          </div>
            </div>
        </div>
      </Modal>
      {!authenticated ? (
          <Auth />
      ) : (
        <React.Fragment>
        <Menu />
        <div className="cont">
          <div className="cont1">
          <div className="sum">
            <h3>Сумма</h3>
            <input type="text" value={amount} onChange={e => handeleChange(e.target.value)}/>
          </div>
          <div className="sum">
            <h3>Кошелек</h3>
            <input type="text" value={wallet} onChange={e => handeleChangep(e.target.value)}/>
          </div>
          <div className="selection">
            <h3>Система</h3>
          <select id="tiv" value={sel} onChange={e => setSel(e.target.value)}>
          <option value="100">Payeer</option>
          </select>
          </div>
          <div className="koch">
          <button disabled={disableButton} onClick={checkin()}>Получить</button>
          </div>
          <div className="note">
            <p>Чек выплаты можно найти <Link to="/pay" href="/pay">Здесь</Link></p>
          </div>
           </div>
         </div>
        </React.Fragment> 
      )}
        </React.Fragment>
    )
}

export default Out;