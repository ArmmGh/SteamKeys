import React, { useState } from 'react';
import Menu from '../Menu/index';
import set from '../../assets/profile/settings.png';
import p from '../../assets/profile/p.png';
import q from '../../assets/profile/q.png';
import fetchApi from '../../utils/fetchApi';
import { useStateValue } from '../../context';
import './Cabinet.scss';


const Cabinet = () =>{
    const [disabled, setDisabled] = useState(false);
    const [{ user, socket }, dispatch] = useStateValue();
    const [walletp, setWalletp] = useState(user.walletp);

    const handeleChange = val => {
        if (val.match(/^[0-9]+$/)) {
          setWalletp(val);
        }
      };

    const dis = () => e => {
        if(user.walletp !== ''){
            setDisabled(true);
        }else{
            setDisabled(false)
        }
    }

    const info = () => e =>{
        fetchApi('/setwallet', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletp }),
          })
    }

        return (
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
                    <form>
                    <div className="infs">
                        <div className="payeer">
                            <div className="center"><img src={p} alt="payeer" /></div>
                            <div className="metr"><input type="text" value={walletp} onChange={e => handeleChange(e.target.value)} onClick={dis()} disabled={disabled}  /></div>
                        </div>
                        <div className="qiwi">
                            <div className="center"><img src={q} alt="qiwi" /></div>
                            <div className="metr"><input type="text" value={user.walletq} /></div>
                        </div>
                    </div>
                    <div className="save">
                        <button onClick={info()}>Сохранить</button>
                    </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}


export default Cabinet;