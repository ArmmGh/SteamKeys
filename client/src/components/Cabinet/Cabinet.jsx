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
                    <div className="inputes">
                    <h3>Данные аккаунта</h3>
                    <div className="names">
                        <div className="column">Mail:</div>
                        <div className="column">New Password:</div>
                        <div className="column">Confrim Password:</div>
                    </div>
                    <form>
                       <input type="text" id="hello" />
                       <input type="text" />
                       <input type="text" />
                    </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default Cabinet;