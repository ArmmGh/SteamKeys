import React, { useReducerm, useState } from 'react';
import Menu from '../Menu/index';
import Moment from 'react-moment';
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

      const handeleChange = val => {
        if (val.match(/^[0-9]+$/)) {
          setAmount(val);
        }
      };
    

    const invest = () => e => {
        if (amount !== ''){
            if(user.balance >= amount){
            fetchApi('/setbenefit', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
          })
            }
        }
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
                        <div><input type="text" value={amount} onChange={e => handeleChange(e.target.value)} /></div>
                        <div className="btnholder"><button onClick={invest()}>Вкладивать</button></div>
                    </form>
                    </div>
                    <div className="tbleheader">
                        <h3>Вклады</h3>
                    </div>
                    <div className="addtable">
                {user.benefitHistory && (
                    <table className="table" id="tbl">
                    {user.benefitHistory.reverse().map((item, index) => (
                        <tr className="item" key={index}>
                    <td>{item.amount}</td>
                    <td>{item.wallet}</td>
                    <td><Moment format="YYYY-MM-DD  HH:mm:ss" date={item.date} /></td>
                        </tr>
                    ))}
                    </table>
                )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Invest;