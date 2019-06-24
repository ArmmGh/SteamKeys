/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { FaUser, FaUsers, FaRegFolderOpen } from 'react-icons/fa';
import fetchApi from '../../utils/fetchApi';
import './Livedrop.scss';
import { useStateValue } from '../../context';

const Livedrop = () => {
  const [{ socket, translate }, dispatch] = useStateValue();
  const [livedrop, setLivedrop] = useState([]);
  const [totalUsers, setTotalusers] = useState(0);
  const [openCases, setOpencases] = useState(0);
  const [onlineUsers, setOnlineusers] = useState(0);

  // setLivedrop([...livedrop, {}]);
  function importAll(r) {
    const images = {};
    // eslint-disable-next-line array-callback-return
    r.keys().map((item, index) => {
      images[item.replace('./', '').replace('.png', '')] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context('../../assets/profile', false, /\.(png|jpe?g|svg)$/),
  );

  useEffect(() => {
    socket.emit('emit getlive');
    socket.on('get live', payload => {
      setLivedrop([...payload]);
    });

    fetchApi('/liveinfo').then(res => {
      setTotalusers(res.users);
      setOpencases(res.cases);
    });

    return () => {};
  }, []);

  useEffect(() => {
    socket.on('update live', payload => {
      if (livedrop.length >= 10) {
        const list = document.querySelectorAll('ul#list')[0];
        const elems = document.querySelectorAll('ul#list li');
        const lastElem = elems[elems.length - 1];
        const firstElem = elems[0];
        lastElem.classList.add('animated', 'fadeOutDown', 'hideElem');
        lastElem.addEventListener('animationend', () => {
          // list.classList.add('to_right');
          firstElem.classList.add('animated', 'flipInX', 'showElem');
          firstElem.addEventListener('animationend', () => {
            firstElem.classList.remove('animated', 'flipInX', 'showElem');
          });
          lastElem.classList.remove('animated', 'fadeOutDown', 'hideElem');
          livedrop.pop();
          setLivedrop([payload, ...livedrop]);
        });
      }
    });

    return () => {};
  }, [livedrop]);

  useEffect(() => {
    socket.on('userCount', data => {
      setOnlineusers(data.userCount);
    });
    return () => {};
  }, [onlineUsers]);

  return (
    <React.Fragment>
      <div className="livedrop_holder">
        <div className="livedrop">
          <h1>{translate('live')}</h1>
          {livedrop && (
            <ul className="list" id="list">
              {livedrop.map((item, index) => (
                <li className="item" key={index}>
                  <img src={images[item.img]} alt={item.img} />
                  <p className="fullname">{item.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="liveUsers">
        <div className="main-width">
          <div className="itemsHolder">
            <div className="item">
              <div className="icon">
                <FaUsers />
              </div>
              <div className="text">
                {translate('totalUsers')}: <span>{totalUsers}</span>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <FaRegFolderOpen />
              </div>
              <div className="text">
                {translate('openCase')}: <span>{openCases}</span>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <FaUser />
              </div>
              <div className="text">
                {translate('onlineUsers')}: <span>{onlineUsers}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Livedrop;
