import React from 'react';
import Menu from '../Menu/index';
import set from '../../assets/profile/settings.png';
import p from '../../assets/profile/p.png';
import q from '../../assets/profile/q.png';
import { useStateValue } from '../../context';
import './Cabinet.scss';


const Cabinet = () =>{
    const [disabled, setDisabled] = useState(false);
    const [{ user, socket }, dispatch] = useStateValue();

    const dis = () => {
        if(user.walletp !== ''){
            setDisabled(true);
        }
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
                    <div className="infs">
                        <div className="payeer">
                            <div className="center"><img src={p} alt="payeer" /></div>
                            <div className="metr"><input type="text" value={user.walletp} disabled={disabled} /></div>
                        </div>
                        <div className="qiwi">
                            <div className="center"><img src={q} alt="qiwi" /></div>
                            <div className="metr"><input type="text" value={user.walletq} /></div>
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