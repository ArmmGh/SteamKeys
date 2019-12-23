import React from 'react';
import log from '../../assets/profile/payeer-logo.png'
import './Adding.scss';


const Adding = () =>{
    return(
        <React.Fragment>
        <div className="addcontainer">
            <div className="alladd">
        <div className="heading">
            <h3>Пополнение баланса</h3>
        </div>
        <div className="paymethod">
        <h5>вибирите метод попалнении</h5>
        <img src={log} alt="payeer" />
        </div>
            </div>
                </div>
        </React.Fragment>
    )
}

export default Adding;