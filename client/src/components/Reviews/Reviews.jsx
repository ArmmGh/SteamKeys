import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../context';
import './Reviews.scss';
import fetchApi from '../../utils/fetchApi';

const Header = () => {
  const [text, setText] = useState('');
  const [
    { user, authenticated, translate, cases, socket },
    dispatch,
  ] = useStateValue();
  
  const stayRev = () => e =>{
    fetchApi('/revs', {
      method: 'POST',
      credentials: 'include',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: user.username, text: text }),
      }).then(data => {
          dispatch({ type: 'updateUser', payload: { ...data } });
      })
  }

  return(
    <React.Fragment>
      <div className="revcontainer">
        <div className="revall">
          <div className="revhead">
            <h1>Отзывы</h1>
          </div>
          <div className="revs">
          {rev && 
          (
            <div className="revis">
              {rev.map((item, index) => (
                <div className="allrev">
                <div className="namehead">
                  <div className="name">{item.name}</div>
                  <div className="date">{item.time}</div>
                </div>
              <div className="texthead">{item.text}</div>
              </div>
              ))}
          </div>
          )}
          </div>
          <div className="addrev">
            <textarea value={text} cols="500" rows="10"></textarea>
            <button onClick={stayRev()}>Оставить отзыв</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default Header;
