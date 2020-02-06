import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../context';
import './Rev.scss';
import fetchApi from '../../utils/fetchApi';

const Rev  = () =>  {
  const [text, setText] = useState('');
  const [rev, setRev] = useState([]);
  const [
    { user, authenticated, translate, cases, socket },
    dispatch,
  ] = useStateValue();
  
  console.log(text);
  console.log(user.username);

  const stayRev = () => res => {
    fetchApi('/reves', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: user.username , txt: text }),
    }).then(data => {
      console.log(text)
      console.log(user.username)
      dispatch({ type: 'updateUser', payload: { ...data } });
      res.name = user.username;
      res.txt = text;
      res.time = new Date();
      socket.emit('done rev',{
       profil: res,
      });
    })   
  }

  const handeleChangea = val => {
    if (val.match(/^[A-Za-z0-9]+$/)) {
      setText(val);
    }
  };

  useEffect(() => {
    socket.on('update rev', payload => {
          setRev([payload, ...rev]);
    });

    return () => {};
  }, [rev]);

  useEffect(() => {
    socket.emit('emit getrev');
    socket.on('get brev', payload => {
      setRev([...payload]);
    });

    return () => {};
  }, []);

  useEffect(() => {}, []);

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
            <textarea value={text} cols="500" rows="10" onChange={e => handeleChangea(e.target.value)}></textarea>
            <button onClick={stayRev()}>Оставить отзыв</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default Rev;