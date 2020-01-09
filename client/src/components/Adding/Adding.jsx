import React, { useState } from 'react';
import Modal from 'react-modal';
import Menu from '../Menu/index';
import Table from '../Table/index';
import { MdClose } from 'react-icons/md';
import log from '../../assets/profile/payeer-logo.png';
import des from '../../assets/profile/money.png';
import { useStateValue } from '../../context';
import './Adding.scss';


const Adding = () =>{    
    const [amount, setAmount] = useState(100);
    const [isActive, setActive] = useState(false);
    const [modalIsOpen, setModal] = useState(false);
    const [ { user } ] = useStateValue();
    const [invoice, setInvoice] = useState(Math.floor(Math.random() * 1000))

    const openModal = () => e => {
        setModal(true);
      };

      const alert = () => e =>{
        console.log("hello");
    }

      const handeleChange = val => {
        if (val.match(/^[0-9]+$/)) {
          setAmount(val);
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
        <div className="header">
          <div />
          <h1>ПОПОЛНЕНИЕ БАЛАНСА</h1>
          <div className="close">
            <MdClose onClick={() => setModal(false)} />
          </div>
          <div className="body">
            <div className="checkpoint">
            <p>Сумма к выплате: <span>{amount}</span></p>
            <p>Invoice code:</p> <span>{invoice}</span>
            <p>Система: <span>Payeer</span></p>
            </div>
          </div>
          <div className="info">
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
            <button onClick={openModal()}><img src={log} alt="payeer" /></button>
        </div>
        </div>
        <div className="tabl">
            <div className="header">
                <h3>История Пополнении</h3>
            </div>
            <Table />
        </div>
            </div>
                </div>
        </React.Fragment>
    )
}

export default Adding;