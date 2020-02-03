import React, { useState } from 'react';
import Modal from 'react-modal';
import Menu from '../Menu/index';
import Moment from 'react-moment';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import log from '../../assets/profile/payeer-logo.png';
import des from '../../assets/profile/money.png';
import { useStateValue } from '../../context';
import './Adding.scss';
import fetchApi from '../../utils/fetchApi';
import { toast } from 'react-toastify';
import Auth from '../Auth/index';


const Adding = () =>{
    const [system, setSystem] = useState('');    
    const [amount, setAmount] = useState(100);
    const [id, setId] = useState('');
    const [infoId, setInfoid] = useState('');
    const [disableButton, disableButtons] = useState(false);
    const [isActive, setActive] = useState(false);
    const [modalIsOpen, setModal] = useState(false);
    const [
      { user, authenticated, translate, cases, socket },
      dispatch,
    ] = useStateValue();
    const [hideAlert, toggleAlert] = useState(
      window.localStorage.getItem('closeAlertA'),
    );
    const [invoice, setInvoice] = useState(Math.floor(Math.random() * 1000));

    const opn = () => e =>{
      window.open("https://payeer.com/ru/account/history/", '_blank')
    }

    const opnI = () => e =>{
      window.open("https://payeer.com/ru/account/send/", '_blank')
    }

    const openImage = () => e =>{
      window.open(`https://snipboard.io/pkz0DU.jpg`, '_blank')
    }

    const openModal = () => e => {
        setModal(true);
        disableButtons(true);
        fetchApi('/investin', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({amount: (Math.floor(amount * 100) / 100), invoice: invoice}),
        }).then(data => {
          dispatch({ type: 'updateUser', payload: { ...data } });
          disableButtons(false);
        });
      };

      const hisopenModal = item => e => {
        if(amount == ''){
          toast("Поле не может быть пустым")
        }else{
          setModal(true);
        }
        setInvoice(item.invoice);
        setAmount(item.amount)
        setId(item)
      };

      const brain = brainact => e =>{
        disableButtons(true);
        fetchApi('/check', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...brainact, infoId: infoId}),
        }).then(data => {
          dispatch({ type: 'updateUser', payload: { ...data } });
          disableButtons(false);
        });
      }

      const alert = () => e =>{
        console.log("hello");
    }

      const handeleChange = val => {
        if (val.match(/^([1-9][0-9.]*)*$/)) {
          setAmount(val);
        }
      };
      const handeleChanger = val => {
        if (val.match(/^[0-9]*$/)) {
          setInfoid(val);
        }
      };

      const closeAlert = () => e => {
        toggleAlert(true);
        window.localStorage.setItem('closeAlertA', true);
      };

      const url = window.location.origin.match('keyforu')
      ? 'https://steam-keys.herokuapp.com'
      : 'http://localhost:3000';

      const authSteam = () => e => {
        window.open(`${url}/steam`, '_self');
      };
      const authVk = () => e => {
        window.open(`${url}/vkontakte`, '_self');
      };

    return(
        <React.Fragment>
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
          <h1>ПОПОЛНЕНИЕ БАЛАНСА</h1>
          <div className="close">
            <MdClose onClick={() => setModal(false)} />
          </div>
        </div>
        <div className="body">
            <div className="checkpoint">
              <ul>
                <li>Перейдите на эту <Link onClick={opnI()}>страницу</Link></li>
                <li>В поле <span className="underline">Номер счета, e-mail или телефон</span> заполнитье: <span className="inform">P44911742</span></li>
                <li>В поле <span className="underline">Комментарий</span> заполнитье: <span className="inform">{invoice}</span></li>
                <li>В поле <span className="underline">Сумма</span> заполнитье: <span className="inform">{(Math.floor(amount * 100) / 100)}</span></li>
                <li>Нажать <span className="underline">Перевести</span></li>
                <li><Link onClick={openImage()}>Пример</Link></li>
                <li>После оплаты на верху появиться сообщение с ID транзакции или перейдите на эту <Link onClick={opn()}>страницу</Link></li>
                <li>Скопировать и вставить в нижнем форме в нашем сайте <span className="underline">ID ТРАНЗАКЦИИ</span></li>
                <li>Нажать <span className="underline">Проверить</span></li>
                <li>Проверка будет автоматична</li>
              </ul>
            </div>
          <div className="informik">
            <form>
            <div className="formik"><input type="text" placeholder="пример:911858579" value={infoId} onChange={e => handeleChanger(e.target.value)} /></div>
            <div className="formik"><button onClick={brain(id)}>Проверить</button></div>
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
          <div className="selection">
            <h3>Система</h3>
          <select id="tiv" value={system} onChange={e => setSystem(e.target.value)}>
          <option value="100">Payeer</option>
          </select>
          </div>
          <div className="koch">
          <button onClick={openModal()}>Пополнить</button>
          </div>
          <div className="note">
            <p>Если вы не успели <br/> подвердить оплату <br />
              Чек для подтверждение <br/> можно найти <Link to="/" href="/">Здесь</Link></p>
          </div>
           </div>
         </div>
        </React.Fragment> 
      )}
        </React.Fragment>
    )
}

export default Adding;