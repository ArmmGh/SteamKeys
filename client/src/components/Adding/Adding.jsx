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


const Adding = () =>{    
    const [amount, setAmount] = useState(100);
    const [infoId, setInfoid] = useState('');
    const [disableButton, disableButtons] = useState(false);
    const [isActive, setActive] = useState(false);
    const [modalIsOpen, setModal] = useState(false);
    const [ { user } ] = useStateValue();
    const [invoice, setInvoice] = useState(Math.floor(Math.random() * 1000));

    const opn = () => e =>{
      window.open("https://payeer.com/ru/account/history/", '_blank')
    }

    const opnI = () => e =>{
      window.open("https://payeer.com/ru/account/send/", '_blank')
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
          body: JSON.stringify({ amount, invoice: invoice}),
        }).then(data => {
          dispatch({ type: 'updateUser', payload: { ...data } });
          disableButtons(false);
        });
      };

      const alert = () => e =>{
        console.log("hello");
    }

      const handeleChange = val => {
        if (val.match(/^[0-9]+$/)) {
          setAmount(val);
        }
      };
      const handeleChanger = val => {
        if (val.match(/^[0-9]+$/)) {
          setInfoid(val);
        }
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
                <h3>Действие в Payeer</h3>
                <li>Перейдите на эту <Link onClick={opnI()}>страницу</Link></li>
                <li>В поле <span className="underline">Номер счета, e-mail или телефон</span> заполнитье: <span className="inform">P44911742</span></li>
                <li>В поле <span className="underline">Комментарий</span> заполнитье: <span className="inform">{invoice}</span></li>
                <li>В поле <span className="underline">Сумма</span> заполнитье: <span className="inform">{amount}</span></li>
                <li>Нажать <span className="underline">Перевести</span></li>
                <h3>Действие в нашем сайте</h3>
                <li>Перейдите на эту <Link onClick={opn()}>страницу</Link> </li>
                <li>Скопировать и вставить в нижнем форме <span className="underline">ID ТРАНЗАКЦИИ</span></li>
                <li>Нажать <span className="underline">Проверить</span></li>
              </ul>
            </div>
          <div className="informik">
            <form>
            <div className="formik"><input type="text" value={infoId} onChange={e => handeleChanger(e.target.value)} /></div>
            <div className="formik"><button>Проверить</button></div>
            </form>
          </div>
            </div>
        </div>
      </Modal>
        <div className="addcontainer">
            <div className="alladd">
                <Menu />
                <div className="design">
                    <img src={des} alt="money"/>
                </div>
        <div className="paymethod">
            <div className="amount">
            <p>Укажите сумму и способ пополнения</p>
            </div>
            <div className="suminput">
                <input type="text" value={amount} onChange={e => handeleChange(e.target.value)} />
            </div>
        <div className="imgholder">
            <button onClick={openModal()} disabled={disableButton} ><img src={log} alt="payeer" /></button>
        </div>
        </div>
        <div className="tabl">
            <div className="header">
                <h3>История Пополнении</h3>
            </div>
            <div className="addtable">
                {user.inHistory && (
                    <table className="table" id="tbl">
                    {user.inHistory.map((item, index) => (
                        <tr className="items" key={index}>
                    <td>{item.amount}</td>
                    <td>{item.action}</td>
                    <td><Moment format="YYYY-MM-DD  HH:mm:ss" date={item.date} /></td>
                        </tr>
                    ))}
                    </table>
                )}
                    </div>
        </div>
            </div>
                </div>
        </React.Fragment>
    )
}

export default Adding;