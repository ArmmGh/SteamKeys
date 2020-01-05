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

    const openModal = () => e => {
        setModal(true);
        setSum('');
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
        </div>
        <div className="body">
          <h1>Введите сумму</h1>
          <div className="inpHolder">
            <form action="https://any-pay.org/merchant" method="post">
              <input type='hidden' name="merchant_id" defaultValue="4183" id="merchant_id" />
              <input type='hidden' name="secret_key" defaultValue={process.env.api_key} id="secret_key" />
              <input type='hidden' name="pay_id" defaultValue={user.userID} id="pay_id"/>'
              <input type='text' name="amount" value={sum} onChange={e => handeleChange(e.target.value)} id="amount"/>
              <button type="submit">
                Пополнить
              </button>
            </form>
          </div>
          <div className="info">
            Средства приходят моментально, но могут быть задержки до 5-10 минут.
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