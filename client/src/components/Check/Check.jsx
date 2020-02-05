import React, { useState } from 'react';
import Modal from 'react-modal';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import Menu from '../Menu';
import fetchApi from '../../utils/fetchApi';
import { useStateValue } from '../../context';
import './Check.scss';


const Check = () => {
    const [
        { user, authenticated, translate, cases, socket },
        dispatch,
      ] = useStateValue();
      const [amount, setAmount] = useState(100);
      const [id, setId] = useState('');
      const [infoId, setInfoid] = useState('');
      const [disableButton, disableButtons] = useState(false);
      const [invoice, setInvoice] = useState(Math.floor(Math.random() * 1000));
      const [modalIsOpen, setModal] = useState(false);

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
            alert("Поле не может быть пустым")
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
      const handeleChanger = val => {
        if (val.match(/^[0-9]*$/)) {
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
      <Menu />
            <div className="checkmain">
                <div className="checkall">
                    <div className="checkhead">
                        <div className="head"><Link to="/check" href="/check">ПОПОЛНЕНИЯ</Link></div>
                        <div className="br"></div>
                        <div className="head"><Link to="/pay" href="/pay">ВЫПЛАТА</Link></div>
                        <div className="br"></div>
                        <div className="head"><Link to="/in" href="/in">ВКЛАД</Link></div>
                    </div>
                    <div className="checktabl">
                    {user.inHistory && (
                  <table className="table" id="table">
                  <tr className="tablehead"> 
                    <th>Сумма</th>
                    <th>Статус</th>
                    <th>Дата</th>
                  </tr>
                  {user.inHistory.map((item, index) => (
                      <tr className="items" key={index}>
                  <td>{item.amount}</td>
                  <td>{item.action === 'waiting' ? (
                    <button onClick={hisopenModal(item)}>Подтвердить</button>
                  ) : item.action === 'sent' ? (
                    <span>Перечислен</span>
                  ) : (
                    ''
                  )
                  }</td>
                  <td><Moment format="YYYY-MM-DD/HH:mm:ss" date={item.date} /></td>
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


export default Check;