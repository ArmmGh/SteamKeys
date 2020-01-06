import React from 'react';
import Menu from '../Menu/index';
import set from '../../assets/profile/settings.png';
import p from '../../assets/profile/p.png';
import q from '../../assets/profile/q.png';
import './Cabinet.scss';


const Cabinet = () =>{
    return(
        <React.Fragment>
            <Menu />
            <div className="cabinetcontainer">
                <div className="cabinetall">
                    <div className="backfone">
                        <img src={set} alt="settings" />
                    </div>
                    <div className="heading">
                        <h1>Платежные данные</h1>
                    </div>
                    <div className="infs">
                        <div className="payeer">
                            <div className="center"><img src={p} alt="payeer" /></div>
                            <div className="metr"><input type="text" value="hello" /></div>
                        </div>
                        <div className="qiwi">
                            <div className="center"><img src={q} alt="payeer" /></div>
                            <div className="metr"><input type="text" value="hello" /></div>
                        </div>
                    </div>
                    <div className="save">
                        <button>Сохранить</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default Cabinet;