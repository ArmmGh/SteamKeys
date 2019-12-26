import React from 'react';
import Menu from '../Menu/index';
import invest from '../../assets/profile/invest.png';
import './Invest.scss';


const Invest = () =>{
    return(
        <React.Fragment>
            <Menu />
            <div className="investcontainer">
                <div className="investall">
                    <div className="investlog">
                        <img src={invest} alt="invest" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Invest;