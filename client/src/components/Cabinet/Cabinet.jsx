import React from 'react';
import Menu from '../Menu/index';
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
                        <div className="column">Mail:</div>
                        <div className="column">New Password:</div>
                        <div className="column">Confrim Password:</div>
                        <div className="column">Old Password:</div>
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