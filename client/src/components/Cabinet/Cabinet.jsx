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
                </div>
            </div>
        </React.Fragment>
    )
}


export default Cabinet;