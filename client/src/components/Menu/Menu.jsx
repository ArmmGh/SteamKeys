import React, { useState } from 'react';
import { useStateValue } from '../../context';
import { MdPerson, MdInput, MdClose } from "react-icons/md";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { Link } from 'react-router-dom';
import './Menu.scss';

const Menu = () =>{
    const [{ user, translate }, dispatch] = useStateValue();
    return(
        <React.Fragment>
            <div className="menuall">
        <h1 className="name">{user.username}</h1>
            <div className="avatar">
              <img src={user.imgurl} alt="" />
            </div>
        <div className="actions">
            <ul>
              <div className="profitem"><li>
                  <div className="ico"><GiPayMoney /></div>
                  <div className="infm">
                  <Link
                    to="/adding" href="adding">
                  пополнить
                   </Link>
                  </div>
                  </li></div>
               <div className="profitem"><li>
                   <div className="ico"><GiReceiveMoney /></div>
                   <div className="infm">
                   <Link to="/output" href="/output">
                   ввывести
                   </Link>
                   </div>
                   </li></div>
               <div className="profitem"><li>
                   <div className="ico"><GiTakeMyMoney /></div>
                   <div className="infm">
                   <Link to="/invest" href="/invest">
                 вкладивать
                   </Link>
                   </div>
                   </li></div>
               <div className="profitem"><li>
                   <div className="ico">
                       <MdPerson />
                   </div>
                   <div className="infm">
                   <Link to="/cabinet" href="/cabinet">
                   кабинет
                   </Link>
                   </div>
                   </li></div>
               <div className="profitem"><li>
                  <div className="ico">
                      <MdInput />
                   </div>
                  <div className="infm">
                  <Link to="/logout" href="/logout">
                  выход
                   </Link>
                 </div>
                 </li></div>
           </ul>
            </div> 
            </div>
        </React.Fragment>
    )
}

export default Menu;