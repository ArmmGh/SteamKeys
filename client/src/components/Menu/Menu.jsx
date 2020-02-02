import React, { useState } from 'react';
import { useStateValue } from '../../context';
import queryString from 'query-string';
import axios from 'axios';
import fetchApi from '../../utils/fetchApi';
import { FaMoneyBill } from "react-icons/fa";
import { MdPerson, MdInput, MdClose } from "react-icons/md";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { Link } from 'react-router-dom';
import './Menu.scss';

const Menu = () =>{
    const [{ user, translate }, dispatch] = useStateValue();
    const logout = () => e => {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');
        fetchApi('/logout', { method: 'GET', credentials: 'include' }).then(res => {
          if (!res.isLogged) {
            window.open(`${window.location.origin}/`, '_self');
          }
        });
      };
    return(
        <React.Fragment>
            <div className="menu">
              <div className="menub">
                <button><Link to="/adding" href="/adding">Пополнение баланса</Link></button>
                <button><Link to="/invest" href="/invest">Вклады</Link></button>
                <button><Link to="/output" href="/output">Выплата с баланса</Link></button>
                <button className="izbrbut" onClick={logout()}>Выход</button>
              </div>
            </div>
        </React.Fragment>
    )
}

export default Menu;