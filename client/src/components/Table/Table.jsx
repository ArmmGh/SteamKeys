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
    socket.on('update benefitlive', payload => {
      if (payload.type !== 'xujan' && benefit.length >= 16) {
        if (document.getElementById('helper')) {
          document.getElementById('helper').remove();
        }
        const elems = document.querySelectorAll('table#tbl tr');
        let lastElem;
        if (window.innerWidth >= 1616) {
          lastElem = elems[15];
        } else if (window.innerWidth >= 1456) {
          lastElem = elems[14];
        } else if (window.innerWidth >= 1296) {
          lastElem = elems[13];
        } else if (window.innerWidth >= 1136) {
          lastElem = elems[12];
        } else if (window.innerWidth >= 976) {
          lastElem = elems[11];
        } else if (window.innerWidth >= 816) {
          lastElem = elems[10];
        } else if (window.innerWidth >= 656) {
          lastElem = elems[9];
        } else if (window.innerWidth >= 486) {
          lastElem = elems[8];
        } else if (window.innerWidth >= 326) {
          lastElem = elems[7];
        } else {
          lastElem = elems[0];
        }
        const firstElem = elems[0];
        const newElem = document.createElement('tr');
        window.addEventListener('resize', () => {
          newElem.remove();
        });
        newElem.setAttribute('id', 'helper');
        newElem.classList.add('animated', 'helper');
        lastElem.classList.add('animated', 'fadeOutDown', 'hideElem');
        if (window.innerWidth < 1616) {
          lastElem.after(newElem);
        }
        lastElem.addEventListener('animationend', () => {
          firstElem.classList.add('animated', 'flipInX', 'showElem');
          newElem.classList.add('mainWidth', 'animated', 'widthDown');
          firstElem.addEventListener('animationend', () => {
            firstElem.classList.remove('animated', 'flipInX', 'showElem');
            newElem.remove();
          });
          lastElem.classList.remove('animated', 'fadeOutDown', 'hideElem');
          benefit.pop();
          setBenefit([payload, ...benefit]);
        });
      }
    });

    return () => {};
  }, [benefit]);

  useEffect(() => {}, []);

  return (
    <div className="cases_holder">
      <div className="main-width">
        <div className="addtable">
        {benefit && (
            <table className="table" id="tbl">
              {benefit.map((item, index) => (
                <tr className="item" key={index}>
              <td>{item.name}</td>
              <td>{item.rub}</td>
              <td>{item.wallet}</td>
              <td><Moment format="YYYY-MM-DD  HH:mm:ss" date={item.time} /></td>
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
