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
                    <form>
                       <div>Mail:<input type="text" /></div>
                       <div>New Password:<input type="text" /></div>
                       <div>Confirm Password:<input type="text" /></div>
                    </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default Cabinet;