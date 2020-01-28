import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { useStateValue } from '../../context';
import './Table.scss';

const Cases = ({ history }) => {
  const [{ user, translate, games, cases }, dispatch] = useStateValue();
  const [count, setCount] = useState(15);
  const [{ socket }] = useStateValue();
  const [benefit, setBenefit] = useState([]);
  const [showMore, setShowmore] = useState(false);
  const [hideAlert, toggleAlert] = useState(
    window.localStorage.getItem('closeAlert'),
  );


  const onShowMore = () => e => {
    if (showMore) {
      setCount(15);
      setShowmore(false);
    } else {
      setCount(cases.length);
      setShowmore(true);
    }
  };

  useEffect(() => {
    socket.emit('emit getbenefit');
    socket.on('get benefit', payload => {
      setBenefit([...payload]);
    });

    return () => {};
  }, []);

  useEffect(() => {
    socket.on('update benefit', payload => {
      setBenefit([payload, ...benefit]);
  });

    return () => {};
  }, [benefit]);

  useEffect(() => {}, []);

  return (
    <div className="cases_holder">
      <div className="main-width">
        <div className="tableheader">
          <h1>Последних 20 вкладов</h1>
        </div>
        <div className="adddtable">
        {benefit && (
            <table className="table" id="tbl">
              <tr className="thd">
                <th>Кошелек</th>
                <th>Сумма</th>
                <th>Дата</th>
              </tr>
              {benefit.map((item, index) => (
                <tr className="item" key={index}>
              <td>{item.wallet}</td>
              <td>{item.rub}</td>
              <td><Moment format="HH:mm" date={item.time} /></td>
                </tr>
              ))}
            </table>
          )}
        </div>
            </div>
        </div>
  );
};

export default withRouter(Cases);
