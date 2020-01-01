import React, { useState } from 'react';
import { useStateValue } from '../../context';
import queryString from 'query-string';
import axios from 'axios';
import fetchApi from '../../utils/fetchApi';
import { MdPerson, MdInput, MdClose } from "react-icons/md";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { Link } from 'react-router-dom';
import './Menu.scss';

const Menu = () =>{
    const [{ user, translate }, dispatch] = useStateValue();


    axios.post(`https://oauth.mail.ru/token?client_id=3c4c8430046f410d9aa30a07bac55bad&client_secret=157d036e926043f3bed67151aaadbf71&code=cef91c1f5f75708baad4aa1074544718bf5e336e37363830&redirect_uri=https://keyforu.net/callback&grant_type=authorization_code`).then(res => {
        console.log(res);
        console.log(res.data);
      })
      // let params = queryString.parse(this.props.location.search)

    const exp = window.location.search.split("=")[1];
    const exp2 = window.location.search.split("=");

    const lngth = exp.length;

    const result = exp.slice(0, 48);

    console.log(lngth);
    console.log(exp2);
    console.log(result);
    // console.log(params);
  
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
                  <Link onClick={logout()}>
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