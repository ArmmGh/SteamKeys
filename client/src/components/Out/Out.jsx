import React, { useState } from 'react';
import Modal from 'react-modal';
import Moment from 'react-moment';
import { MdClose } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import Menu from '../Menu/index';
import log from '../../assets/profile/payeer-logo.png';
import get from '../../assets/profile/get.png';
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
    const [disableButton, disableButtons] = useState(false);
    const [modalIsOpen, setModal] = useState(false)
    const [amount, setAmount] = useState(Math.floor(user.balance * 100) / 100)

    const handeleChange = val => {
        if (val.match(/^([1-9][0-9.]*)*$/)) {
          setAmount(val);
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
    const checker = () => e =>{
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
                    disableButtons(false);
                })
                setModal(false);
                toast("Оплата пошла успешно")
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
            <div className="formik"><button onClick={checker()} disabled={disableButton}>Получить</button></div>
            </form>
          </div>
            </div>
        </div>
      </Modal>
      {!authenticated ? (
          <Auth />
      ) : (
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
            <span>Минимум: 1</span>
            <span>Максимум: {Math.floor(user.balance * 100) / 100}</span>
            </div>
            <div className="suminput">
                <input type="text" value={amount} onChange={e => handeleChange(e.target.value)}/>
            </div>
        <div className="imgholder">
            <div className="imgpos"><button onClick={openModal()}><img src={log} alt="payeer" /></button></div>
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
      )}
        </React.Fragment>
    )
}

export default Out;