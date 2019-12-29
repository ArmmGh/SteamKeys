import React, { useReducerm, useState } from 'react';
import Menu from '../Menu/index';
import Table from '../Table/index';
import investlog from '../../assets/profile/invest.png';
import fetchApi from '../../utils/fetchApi';
import './Invest.scss';
import { useStateValue } from '../../context';


const Invest = () =>{

    const [
        { user, authenticated, translate, cases, socket },
        dispatch,
      ] = useStateValue();

      const [amount, setAmount] = useState('');

    const invest = () => {
        fetchApi('/setbenefit', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
          })
    }
    return(
        <React.Fragment>
            <Menu />
            <div className="investcontainer">
                <div className="investall">
                    <div className="investlog">
                        <img src={investlog} alt="invest" />
                    </div>
                    <div className="txt">
                        <p>Укажите сумму, которую хотите вкладивать</p>
                        <span>Максимум: {user.balance}</span>
                    </div>
                    <div className="sumbit">
                    <form>
                        <div><input type="text" defaultValue={user.balance} onChange={e => setAmount(e.target.value)} /></div>
                        <div className="btnholder"><button onClick={invest()}>Вкладивать</button></div>
                    </form>
                    </div>
                    <div className="tbleheader">
                        <h3>Вклады</h3>
                    </div>
                    <Table />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Invest;