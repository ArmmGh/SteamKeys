/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { FaUser, FaUsers, FaRegFolderOpen } from 'react-icons/fa';
import fetchApi from '../../utils/fetchApi';
import './Livedrop.scss';
import { useStateValue } from '../../context';

const Livedrop = () => {
  const [{ socket, translate }] = useStateValue();
  const [livedrop, setLivedrop] = useState([]);
  const [totalUsers, setTotalusers] = useState(0);
  const [openCases, setOpencases] = useState(0);
  const [onlineUsers, setOnlineusers] = useState(0);

  // setLivedrop([...livedrop, {}]);
  function importAll(r) {
    const images = {};
    // eslint-disable-next-line array-callback-return
    r.keys().map(item => {
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
        if (document.getElementById('helper')) {
          document.getElementById('helper').remove();
        }
        const elems = document.querySelectorAll('ul#list li');
        let lastElem;
        if (window.innerWidth >= 1616) {
          lastElem = elems[9];
        } else if (window.innerWidth >= 1456) {
          lastElem = elems[8];
        } else if (window.innerWidth >= 1296) {
          lastElem = elems[7];
        } else if (window.innerWidth >= 1136) {
          lastElem = elems[6];
        } else if (window.innerWidth >= 976) {
          lastElem = elems[5];
        } else if (window.innerWidth >= 816) {
          lastElem = elems[4];
        } else if (window.innerWidth >= 656) {
          lastElem = elems[3];
        } else if (window.innerWidth >= 486) {
          lastElem = elems[2];
        } else if (window.innerWidth >= 326) {
          lastElem = elems[1];
        } else {
          lastElem = elems[0];
        }
        const firstElem = elems[0];
        const newElem = document.createElement('div');
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