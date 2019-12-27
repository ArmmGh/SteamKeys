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
                        Mail:<input type="text" />
                        New Password:<input type="text" />
                        Confirm Password:<input type="text" />
                    </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default Cabinet;