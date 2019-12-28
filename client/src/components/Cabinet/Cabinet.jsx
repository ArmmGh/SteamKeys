import React from 'react';
import Menu from '../Menu/index';
import { MdMailOutline } from "react-icons/md";
import { FaLock, FaUnlock } from "react-icons/fa";
import './Cabinet.scss';


const Cabinet = () =>{
    return(
        <React.Fragment>
            <Menu />
            <div className="cabinetcontainer">
                <div className="cabinetall">
                    <div className="head">
                        <h1>Личний Кабинет</h1>
                    </div>
                        <div className="formhead">
                        <h3>Данные аккаунта</h3>
                        </div>
                    <div className="inputes">
                    <div className="names">
                        <div className="column"><MdMailOutline />Mail:</div>
                        <div className="column"><FaLock />New Password:</div>
                        <div className="column"><FaLock />Confrim Password:</div>
                        <div className="column"><FaUnlock />Old Password:</div>
                    </div>
                    <div className="field">
                    <form>
                       <div><input type="text" /></div>
                       <div><input type="text" /></div>
                       <div><input type="text" /></div>
                       <div><input type="text" /></div>
                    </form>
                    </div>
                    </div>
                    <div className="headp">
                        <h3>Платежние Данные</h3>
                    </div>
                    <div className="inputesp">
                        <div className="namesp">
                            <div className="columnp">Payeer</div>
                            <div className="columnp">Qiwi</div>
                        </div>
                        <div className="fieldp">
                            <div><input type="text" /></div>
                            <div><input type="text" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default Cabinet;