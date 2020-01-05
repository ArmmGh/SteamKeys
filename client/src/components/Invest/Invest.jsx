import React, { useReducerm, useState } from 'react';
import Menu from '../Menu/index';
import Moment from 'react-moment';
import investlog from '../../assets/profile/invest.png';
import fetchApi from '../../utils/fetchApi';
import './Invest.scss';
import { useStateValue } from '../../context';


const Invest = () =>{

    const [
        { user, authenticated, translate, cases, socket },
        dispatch,
      ] = useStateValue();

      const [amount, setAmount] = useState('');

      const handeleChange = val => {
        if (val.match(/^[0-9]+$/)) {
          setAmount(val);
        }
      };
    

    const invest = () => e => {
        if (amount !== ''){
            if(user.balance >= amount){
            fetchApi('/setbenefit', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
          })
            }
        }
    }
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
              <button onClick={storeData()} type="submit">
                Пополнить
              </button>
            </form>
          </div>
          <div className="info">
            Средства приходят моментально, но могут быть задержки до 5-10 минут.
          </div>
        </div>
      </Modal>
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
                    <form>
                        <div><input type="text" value={amount} onChange={e => handeleChange(e.target.value)} /></div>
                        <div className="btnholder"><button onClick={invest()}>Вкладивать</button></div>
                    </form>
                    </div>
                    <div className="tbleheader">
                        <h3>Вклады</h3>
                    </div>
                    <div className="addtable">
                {user.benefitHistory && (
                    <table className="table" id="tbl">
                    {user.benefitHistory.reverse().map((item, index) => (
                        <tr className="item" key={index}>
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

export default Invest;