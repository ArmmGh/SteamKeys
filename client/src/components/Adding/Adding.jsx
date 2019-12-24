import React from 'react';
import Menu from '../Menu/index';
import log from '../../assets/profile/payeer-logo.png';
import des from '../../assets/profile/money.png'
import './Adding.scss';


const Adding = () =>{
    return(
        <React.Fragment>
        <div className="addcontainer">
            <div className="alladd">
                <Menu />
                <div className="design">
                    <img src={des} alt="money"/>
                </div>
        <div className="paymethod">
        <p>вибирите метод попалнении</p>
        <div className="imgholder">
            <img src={log} alt="payeer" />
        </div>
        </div>
            </div>
                </div>
        </React.Fragment>
    )
}

export default Adding;