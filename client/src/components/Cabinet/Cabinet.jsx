import React, { useState } from 'react';
import Menu from '../Menu/index';
import { ToastContainer, toast } from 'react-toastify';
import set from '../../assets/profile/settings.png';
import p from '../../assets/profile/p.png';
import q from '../../assets/profile/q.png';
import fetchApi from '../../utils/fetchApi';
import { useStateValue } from '../../context';
import '../toast/toast.scss';
import './Cabinet.scss';


const Cabinet = () =>{
    const [disabled, setDisabled] = useState(false);
    const [disabledq, setDisabledq] = useState(false);
    const [{ user, socket }, dispatch] = useStateValue();
    const [walletp, setWalletp] = useState(user.walletp);
    const [walletq, setWalletq] = useState(user.walletq);

    const handeleChange = val => {
        if (val.match(/^([P][0-9]*)*$/)) {
          setWalletp(val);
        }
      };

      const handeleChanger = val => {
        if (val.match(/^([+][0-9]*)*$/)) {
          setWalletq(val);
        }
      };


    const dis = () => e => {
        if(user.walletp !== '' && user.walletp !== null){
            setDisabled(true);
            toast("Данные нельзя поменять")
        }else{
            setDisabled(false)
        }
    }

    const disq = () => e => {
        if(user.walletq !== '' && user.walletq !== null){
            setDisabledq(true);
            toast("Данные нельзя поменять")
        }else{
            setDisabledq(false)
        }
    }

    const info = () => e =>{
        fetchApi('/setwallet', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletp, walletq }),
          })
    }

        return (
        <React.Fragment>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
            />
            <ToastContainer />
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
                            <div className="metr"><input type="text" value={walletq} onChange={e => handeleChanger(e.target.value)} onClick={disq()} disabled={disabledq} /></div>
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