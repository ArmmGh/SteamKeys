import React, { useState } from 'react';
import Menu from '../Menu/index';
import log from '../../assets/profile/payeer-logo.png';
import get from '../../assets/profile/get.png';
import qiwi from '../../assets/profile/qiwi.png';
import { useStateValue } from '../../context';
import './Out.scss';


const Out = () =>{    
    const [{ user }, dispatch] = useStateValue();
    const [modalIsOpen, setModal] = useState(false)
    const [amount, setAmount] = useState(user.balance)

    const handeleChange = val => {
        if (val.match(/^[0-9]+$/)) {
          setAmount(val);
        }
      };
    
      const openModal = () => e => {
        setModal(true);
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
            <p>{amount}</p>
            <p>{user.walletp}</p>
            </div>
          <div className="informik">
            <form>
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
                    <img src={get} alt="money"/>
                </div>
        <div className="paymethod">
            <div className="amount">
            <p>Укажите сумму, которую хотите вывести</p>
    <span>Максимум: {user.balance}</span>
            </div>
            <div className="suminput">
                <input type="text" value={amount} onChange={e => handeleChange(e.target.value)}/>
            </div>
        <div className="imgholder">
            <div className="imgpos"><button onClick={openModal()}><img src={log} alt="payeer" /></button></div>
            <div className="imgpos"><button><img src={qiwi} alt="qiwi" /></button></div>
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
                    {user.outHistory.map((item, index) => (
                <tr className="items" key={index}>
                    <td>{item.amount}</td>
                    <td>{item.wallet}</td>
                    <td><Moment format="YYYY-MM-DD  HH:mm:ss" date={item.date} /></td>
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

export default Out;