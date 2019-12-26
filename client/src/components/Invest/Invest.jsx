import React, { useReducer } from 'react';
import Menu from '../Menu/index';
import invest from '../../assets/profile/invest.png';
import './Invest.scss';
import { useStateValue } from '../../context';


const Invest = () =>{
    const [{ user }] = useStateValue();
    return(
        <React.Fragment>
            <Menu />
            <div className="investcontainer">
                <div className="investall">
                    <div className="investlog">
                        <img src={invest} alt="invest" />
                    </div>
                    <div className="txt">
                        <p>Укажите сумму, которую хотите вкладивать</p>
                        <span>Максимум: {user.balance}</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Invest;